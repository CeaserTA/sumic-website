import type { FileRule } from '@/content/checklists/types'
import { site } from '@/content/site'

/**
 * File types behind the Google Forms upload labels ("PDF", "document", "presentation", "image",
 * "drawing", "video"). Google Drawings can't be uploaded from a device, so "drawing" adds nothing.
 */
export const fileTypes = {
  pdf: ['.pdf'],
  document: ['.doc', '.docx', '.odt', '.rtf', '.txt'],
  presentation: ['.ppt', '.pptx', '.odp', '.key'],
  image: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'],
  video: ['.mp4', '.mov', '.webm'],
} as const

/** One rule covering several Google categories (a single size limit). */
export function anyOf(maxMb: number, ...groups: (keyof typeof fileTypes)[]): FileRule[] {
  return [{ extensions: groups.flatMap((group) => fileTypes[group]), maxMb }]
}

/** Live: "If you need assistance while filling out this form, feel free to reach out to us via
 *  info@sumicitsolutions.com or +256 200 930793." Email switched to the company address. */
export const helpLine = `If you need assistance while filling out this form, feel free to reach out to us via ${site.contact.email} or ${site.contact.phone.display}.`

export const confidentialityNote =
  'Note: All information submitted will be treated with strict confidentiality and used solely for project assessment and communication purposes.'

export const signOff = 'Sumic | Digital Transformation Solutions Provider, Since 2019'
