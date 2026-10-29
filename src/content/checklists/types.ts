/**
 * Data model for the client checklist forms. Each form (website.ts, mobile-app.ts) is plain data:
 * sections become steps, questions become fields. The renderer (sections/checklists) and the zod
 * schema (lib/checklists/schema.ts) are generated from it, so changing a question means editing
 * data only.
 */

export type ChecklistFormId = 'website' | 'mobile-app'

/** Show a question (or a whole step) only while another single-choice question has this answer. */
export interface ShowIf {
  questionId: string
  equals: string
}

interface QuestionBase {
  /** Stable key for answers, drafts and the payload. Never shown. */
  id: string
  /** Question text as shown. */
  label: string
  /** Helper text under the label. */
  hint?: string
  required?: boolean
  showIf?: ShowIf
}

export type TextFormat = 'email' | 'emails' | 'phone' | 'url'

export interface TextQuestion extends QuestionBase {
  type: 'short' | 'paragraph'
  /** Format check (and the matching input type / keyboard). */
  format?: TextFormat
  autoComplete?: string
}

export interface DateQuestion extends QuestionBase {
  type: 'date'
}

export interface ChoiceOption {
  /** Shown text, also the stored value. */
  label: string
  /** Picking this option reveals an optional text field. */
  specify?: boolean
}

export interface SingleChoiceQuestion extends QuestionBase {
  type: 'single'
  options: readonly ChoiceOption[]
}

export interface MultiChoiceQuestion extends QuestionBase {
  type: 'multi'
  options: readonly ChoiceOption[]
}

/** One checkbox whose label is the statement being confirmed. */
export interface ConfirmQuestion extends QuestionBase {
  type: 'confirm'
}

/** A group of accepted file types with its own size limit. */
export interface FileRule {
  /** Shown in the hint, e.g. "Images". Omit when the field has a single rule. */
  name?: string
  /** Lowercase extensions with the dot. Their upper-case names make up the hint. */
  extensions: readonly string[]
  maxMb: number
}

export interface FileQuestion extends QuestionBase {
  type: 'file'
  rules: readonly FileRule[]
  /** An optional "or paste a link" text field under the upload. */
  link?: { label: string; placeholder: string }
}

export type ChecklistQuestion =
  | TextQuestion
  | DateQuestion
  | SingleChoiceQuestion
  | MultiChoiceQuestion
  | ConfirmQuestion
  | FileQuestion

export interface ChecklistSection {
  id: string
  title: string
  showIf?: ShowIf
  questions: readonly ChecklistQuestion[]
}

export interface ChecklistIntro {
  paragraphs: readonly string[]
  list?: { lead: string; items: readonly string[] }
  /** Paragraph after the list. */
  closing?: string
  note: string
  estimatedTime?: string
  help: string
  signOff: string
}

export interface ChecklistFormDefinition {
  id: ChecklistFormId
  title: string
  intro: ChecklistIntro
  sections: readonly ChecklistSection[]
}
