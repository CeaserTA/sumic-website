/**
 * Checklist form submission. The forms call only `submitChecklist()`, so connecting a backend
 * means replacing this function's body (same pattern as submitContactForm in lib/contact.ts).
 */
import type { ChecklistFormId } from '@/content/checklists/types'

/** What an upload field sends until a backend accepts the files themselves. */
export interface FileMeta {
  name: string
  /** Bytes. */
  size: number
  /** MIME type as reported by the browser (may be empty, e.g. for .ai files). */
  type: string
}

/** One answered (or skipped) question, labelled so the payload reads on its own. */
export interface ChecklistAnswer {
  id: string
  section: string
  question: string
  /** Text, date (YYYY-MM-DD), chosen option(s), confirmation, or file metadata; null if skipped. */
  answer: string | readonly string[] | boolean | FileMeta | null
  /** Text typed after choosing an "Other" option. */
  specify?: string
  /** Link given instead of (or as well as) an upload. */
  link?: string
}

export type ChecklistResult = { ok: true } | { ok: false; error: 'network' | 'server' }

/**
 * TODO(backend): send the answers (and the files, once uploads are supported) to the chosen
 * endpoint and map its response to ChecklistResult. Until then this stub only waits briefly and
 * reports success; nothing is sent anywhere. In development it logs what it received.
 */
export async function submitChecklist(
  formId: ChecklistFormId,
  answers: readonly ChecklistAnswer[],
): Promise<ChecklistResult> {
  if (import.meta.env.DEV) console.info('[submitChecklist]', JSON.stringify({ formId, answers }))
  await new Promise((resolve) => setTimeout(resolve, 900))
  return { ok: true }
}
