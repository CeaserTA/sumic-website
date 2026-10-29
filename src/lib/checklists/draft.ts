import type { ChecklistFormDefinition, ChecklistFormId } from '@/content/checklists/types'
import { allQuestions, defaultValues, type ChecklistValues } from '@/lib/checklists/answers'

/**
 * Drafts live in localStorage, one per form. Storage can be missing or throw (private mode,
 * blocked site data), so every access is wrapped and the form works without it. Files can't be
 * stored, so file answers are left out of drafts.
 */
const VERSION = 1
const keyFor = (formId: ChecklistFormId) => `sumic:checklist-draft:${formId}`

/** Where the visitor was: a section id, or the review step. */
export type DraftStep = string

export interface ChecklistDraft {
  values: ChecklistValues
  step: DraftStep
  /** A file was attached when the draft was saved (it has to be added again). */
  hadFiles: boolean
}

export function saveDraft(form: ChecklistFormDefinition, values: ChecklistValues, step: DraftStep) {
  const fileIds = new Set(
    allQuestions(form)
      .filter((q) => q.type === 'file')
      .map((q) => q.id),
  )
  const stored = Object.fromEntries(Object.entries(values).filter(([key]) => !fileIds.has(key)))
  const hadFiles = [...fileIds].some((id) => values[id] != null)
  try {
    window.localStorage.setItem(
      keyFor(form.id),
      JSON.stringify({ v: VERSION, step, hadFiles, values: stored }),
    )
  } catch {
    // Storage unavailable: drafts are a convenience only.
  }
}

export function clearDraft(formId: ChecklistFormId) {
  try {
    window.localStorage.removeItem(keyFor(formId))
  } catch {
    // Nothing to clear.
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** The saved draft, keeping only keys this form knows with values of the expected kind. */
export function loadDraft(form: ChecklistFormDefinition): ChecklistDraft | null {
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(keyFor(form.id))
  } catch {
    return null
  }
  if (!raw) return null

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }
  if (!isRecord(parsed) || parsed.v !== VERSION || !isRecord(parsed.values)) return null

  const defaults = defaultValues(form)
  const values: ChecklistValues = { ...defaults }
  let answered = false
  for (const [key, fallback] of Object.entries(defaults)) {
    const saved = parsed.values[key]
    if (typeof fallback === 'string' && typeof saved === 'string') values[key] = saved
    else if (typeof fallback === 'boolean' && typeof saved === 'boolean') values[key] = saved
    else if (Array.isArray(fallback) && Array.isArray(saved))
      values[key] = saved.filter((item): item is string => typeof item === 'string')
    else continue
    if (saved !== '' && saved !== false && !(Array.isArray(saved) && saved.length === 0))
      answered = true
  }
  if (!answered) return null

  return {
    values,
    step: typeof parsed.step === 'string' ? parsed.step : '',
    hadFiles: parsed.hadFiles === true,
  }
}
