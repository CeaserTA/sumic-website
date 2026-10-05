/** Builds a mailto: link; values are percent-encoded (spaces as %20, which mail clients expect). */
export function mailtoHref({
  to,
  cc,
  subject,
  body,
}: {
  to: string
  cc?: string
  subject?: string
  body?: string
}): string {
  const params = [
    cc && `cc=${encodeURIComponent(cc)}`,
    subject && `subject=${encodeURIComponent(subject)}`,
    body && `body=${encodeURIComponent(body)}`,
  ].filter(Boolean)
  return `mailto:${to}${params.length > 0 ? `?${params.join('&')}` : ''}`
}
