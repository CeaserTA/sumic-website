// zod/mini: the same validation with a much smaller bundle (tree-shakable functions).
import { z } from 'zod/mini'

import { checklistCopy } from '@/content/checklists/copy'
import type {
  ChecklistFormDefinition,
  ChecklistQuestion,
  ChecklistSection,
  FileQuestion,
  FileRule,
  ShowIf,
} from '@/content/checklists/types'
import type { ChecklistAnswer, FileMeta } from '@/lib/checklist'

export type AnswerValue = string | string[] | boolean | FileMeta | null
/** Form state: one entry per question id, plus the "specify" and "link" extras. */
export type ChecklistValues = Record<string, AnswerValue>

const errors = checklistCopy.errors

/** Key of the text field shown after choosing an "Other" option. */
export const specifyKey = (questionId: string) => `${questionId}__specify`
/** Key of a file question's optional link field. */
export const linkKey = (questionId: string) => `${questionId}__link`

export function hasSpecify(question: ChecklistQuestion): boolean {
  return (
    (question.type === 'single' || question.type === 'multi') &&
    question.options.some((option) => option.specify)
  )
}

// ── Visibility ──────────────────────────────────────────────────────────────

function matches(condition: ShowIf | undefined, values: ChecklistValues): boolean {
  return !condition || values[condition.questionId] === condition.equals
}

export function visibleSections(form: ChecklistFormDefinition, values: ChecklistValues) {
  return form.sections.filter((section) => matches(section.showIf, values))
}

export function visibleQuestions(section: ChecklistSection, values: ChecklistValues) {
  return section.questions.filter((question) => matches(question.showIf, values))
}

/** Is a "specify" option currently chosen for this question? */
export function specifyChosen(question: ChecklistQuestion, values: ChecklistValues): boolean {
  if (question.type !== 'single' && question.type !== 'multi') return false
  const value = values[question.id]
  return question.options.some(
    (option) =>
      option.specify &&
      (Array.isArray(value) ? value.includes(option.label) : value === option.label),
  )
}

// ── Defaults ────────────────────────────────────────────────────────────────

function emptyValue(question: ChecklistQuestion): AnswerValue {
  switch (question.type) {
    case 'multi':
      return []
    case 'confirm':
      return false
    case 'file':
      return null
    default:
      return ''
  }
}

/** Every key a question owns, with its empty value. */
export function emptyEntries(question: ChecklistQuestion): [string, AnswerValue][] {
  const entries: [string, AnswerValue][] = [[question.id, emptyValue(question)]]
  if (hasSpecify(question)) entries.push([specifyKey(question.id), ''])
  if (question.type === 'file' && question.link) entries.push([linkKey(question.id), ''])
  return entries
}

export function allQuestions(form: ChecklistFormDefinition): ChecklistQuestion[] {
  return form.sections.flatMap((section) => section.questions)
}

export function defaultValues(form: ChecklistFormDefinition): ChecklistValues {
  return Object.fromEntries(allQuestions(form).flatMap(emptyEntries))
}

/**
 * After `changedId` changes: the keys that must be emptied because the questions they belong to
 * are now hidden, or an "Other" option was unpicked. Hidden answers are never submitted.
 */
export function staleEntries(
  form: ChecklistFormDefinition,
  changedId: string,
  values: ChecklistValues,
): [string, AnswerValue][] {
  const stale: [string, AnswerValue][] = []
  for (const section of form.sections) {
    const sectionHidden =
      section.showIf?.questionId === changedId && !matches(section.showIf, values)
    for (const question of section.questions) {
      const hidden =
        sectionHidden ||
        (question.showIf?.questionId === changedId && !matches(question.showIf, values))
      if (hidden) stale.push(...emptyEntries(question))
      else if (
        question.id === changedId &&
        hasSpecify(question) &&
        !specifyChosen(question, values)
      )
        stale.push([specifyKey(question.id), ''])
    }
  }
  return stale
}

// ── Files ───────────────────────────────────────────────────────────────────

const MB = 1024 * 1024

function extensionOf(name: string): string {
  const dot = name.lastIndexOf('.')
  return dot === -1 ? '' : name.slice(dot).toLowerCase()
}

export function ruleFor(question: FileQuestion, fileName: string): FileRule | undefined {
  const extension = extensionOf(fileName)
  return question.rules.find((rule) => rule.extensions.includes(extension))
}

function typeNames(rule: FileRule): string[] {
  const names = rule.extensions
    .filter((extension) => !(extension === '.jpeg' && rule.extensions.includes('.jpg')))
    .map((extension) => (extension === '.webp' ? 'WebP' : extension.slice(1).toUpperCase()))
  return names
}

function joinOr(items: string[]): string {
  return items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} or ${items.at(-1)}`
}

/** "PNG, SVG or PDF, up to 100 MB" for each rule, e.g. for the hint under an upload field. */
export function fileRuleLines(question: FileQuestion): string[] {
  return question.rules.map((rule) => {
    const types = `${joinOr(typeNames(rule))}, ${checklistCopy.file.upTo(rule.maxMb)}`
    return rule.name ? `${rule.name}: ${types}` : types
  })
}

export function acceptAttribute(question: FileQuestion): string {
  return question.rules.flatMap((rule) => rule.extensions).join(',')
}

export function fileError(question: FileQuestion, file: FileMeta): string | undefined {
  const rule = ruleFor(question, file.name)
  if (!rule) return errors.fileType(joinOr(question.rules.flatMap(typeNames)))
  if (file.size > rule.maxMb * MB) return errors.fileSize(rule.maxMb)
  return undefined
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < MB) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / MB).toFixed(1)} MB`
}

// ── Validation (zod schema generated from the form data) ────────────────────

const EMAIL = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]{2,}$/
const PHONE = /^\+?[\d\s()-]{7,20}$/
const URL = /^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+(\/\S*)?$/i
const DATE = /^\d{4}-\d{2}-\d{2}$/
const MAX_LENGTH = { short: 300, paragraph: 5000 } as const

const fileMetaSchema = z.object({ name: z.string(), size: z.number(), type: z.string() })

function baseSchema(question: ChecklistQuestion): z.ZodMiniType<AnswerValue, AnswerValue> {
  switch (question.type) {
    case 'multi':
      return z.array(z.string())
    case 'confirm':
      return z.boolean()
    case 'file':
      return z.nullable(fileMetaSchema)
    default:
      return z.string()
  }
}

/** The error for one visible question, if any. */
function questionError(question: ChecklistQuestion, values: ChecklistValues): string | undefined {
  const value = values[question.id]
  switch (question.type) {
    case 'short':
    case 'paragraph': {
      const text = typeof value === 'string' ? value.trim() : ''
      if (!text) return question.required ? errors.required : undefined
      if (text.length > MAX_LENGTH[question.type]) return errors.tooLong(MAX_LENGTH[question.type])
      if (question.format === 'email' && !EMAIL.test(text)) return errors.email
      if (
        question.format === 'emails' &&
        !text
          .split(/[\s,;]+/)
          .filter(Boolean)
          .every((part) => EMAIL.test(part))
      )
        return errors.emails
      if (question.format === 'phone' && !PHONE.test(text)) return errors.phone
      if (question.format === 'url' && !URL.test(text)) return errors.url
      return undefined
    }
    case 'date': {
      const text = typeof value === 'string' ? value : ''
      if (!text) return question.required ? errors.required : undefined
      return DATE.test(text) && !Number.isNaN(Date.parse(text)) ? undefined : errors.date
    }
    case 'single': {
      const chosen = question.options.some((option) => option.label === value)
      return question.required && !chosen ? errors.requiredChoice : undefined
    }
    case 'multi':
      return question.required && (!Array.isArray(value) || value.length === 0)
        ? errors.requiredMulti
        : undefined
    case 'confirm':
      return question.required && value !== true ? errors.requiredConfirm : undefined
    case 'file': {
      if (value === null || typeof value !== 'object' || Array.isArray(value))
        return question.required ? errors.required : undefined
      return fileError(question, value)
    }
  }
}

export function buildChecklistSchema(form: ChecklistFormDefinition) {
  const shape: Record<string, z.ZodMiniType<AnswerValue, AnswerValue>> = {}
  for (const question of allQuestions(form)) {
    shape[question.id] = baseSchema(question)
    if (hasSpecify(question)) shape[specifyKey(question.id)] = z.string()
    if (question.type === 'file' && question.link) shape[linkKey(question.id)] = z.string()
  }

  return z.object(shape).check(
    z.superRefine((values, context) => {
      for (const section of visibleSections(form, values)) {
        for (const question of visibleQuestions(section, values)) {
          const message = questionError(question, values)
          if (message) context.addIssue({ code: 'custom', path: [question.id], message })
          if (question.type === 'file' && question.link) {
            const link = values[linkKey(question.id)]
            if (typeof link === 'string' && link.trim() && !URL.test(link.trim()))
              context.addIssue({
                code: 'custom',
                path: [linkKey(question.id)],
                message: errors.url,
              })
          }
        }
      }
    }),
  )
}

// ── Payload ─────────────────────────────────────────────────────────────────

function cleanAnswer(question: ChecklistQuestion, value: AnswerValue): ChecklistAnswer['answer'] {
  if (typeof value === 'string') return value.trim() || null
  if (Array.isArray(value)) return value.length ? value : null
  if (question.type === 'confirm') return value === true
  return value
}

/** The visible questions, in order, with their labels: what submitChecklist receives. */
export function buildAnswers(
  form: ChecklistFormDefinition,
  values: ChecklistValues,
): ChecklistAnswer[] {
  return visibleSections(form, values).flatMap((section) =>
    visibleQuestions(section, values).map((question) => {
      const answer: ChecklistAnswer = {
        id: question.id,
        section: section.title,
        question: question.label,
        answer: cleanAnswer(question, values[question.id] ?? null),
      }
      const specify = values[specifyKey(question.id)]
      if (specifyChosen(question, values) && typeof specify === 'string' && specify.trim())
        answer.specify = specify.trim()
      const link = values[linkKey(question.id)]
      if (typeof link === 'string' && link.trim()) answer.link = link.trim()
      return answer
    }),
  )
}
