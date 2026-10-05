import { useId, useRef, useState, type FormEvent } from 'react'
import { CircleCheckIcon, Loader2Icon, SendIcon, TriangleAlertIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Textarea } from '@/components/ui/textarea'
import { contactPage, type ContactField } from '@/content/contact'
import {
  contactSubjects,
  submitContactForm,
  type ContactFormData,
  type ContactSubject,
} from '@/lib/contact'

type Errors = Partial<Record<ContactField, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

const copy = contactPage.form
// Order of the fields on screen: the first invalid one gets focus.
const fieldOrder: readonly ContactField[] = ['name', 'email', 'phone', 'subject', 'message']
const HONEYPOT = 'website'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/

function isField(value: string | null): value is ContactField {
  return (fieldOrder as readonly (string | null)[]).includes(value)
}

function isSubject(value: string): value is ContactSubject {
  return (contactSubjects as readonly string[]).includes(value)
}

function readForm(form: HTMLFormElement): { data: ContactFormData; trap: string } {
  const values = new FormData(form)
  const text = (name: string) => {
    const value = values.get(name)
    return typeof value === 'string' ? value.trim() : ''
  }
  const subject = text('subject')
  return {
    data: {
      name: text('name'),
      email: text('email'),
      phone: text('phone'),
      subject: isSubject(subject) ? subject : 'General',
      message: text('message'),
    },
    trap: text(HONEYPOT),
  }
}

function validate(data: ContactFormData): Errors {
  const errors: Errors = {}
  if (!data.name) errors.name = copy.errors.nameRequired
  if (!data.email) errors.email = copy.errors.emailRequired
  else if (!EMAIL_PATTERN.test(data.email)) errors.email = copy.errors.emailInvalid
  if (data.phone && !PHONE_PATTERN.test(data.phone)) errors.phone = copy.errors.phoneInvalid
  if (!data.message) errors.message = copy.errors.messageRequired
  else if (data.message.length < 10) errors.message = copy.errors.messageShort
  return errors
}

/**
 * Contact form (frontend only; submission goes through submitContactForm in src/lib/contact.ts).
 * Validates on submit, then re-checks a field as it is edited once it has shown an error. Errors are
 * linked to their fields (aria-invalid + aria-describedby); focus moves to the first invalid
 * field and one polite live region announces the summary, progress and result.
 */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const baseId = useId()
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [announcement, setAnnouncement] = useState('')

  const idFor = (field: ContactField | typeof HONEYPOT) => `${baseId}-${field}`
  const errorIdFor = (field: ContactField) => `${baseId}-${field}-error`

  function focusField(field: ContactField) {
    const element = formRef.current?.elements.namedItem(field)
    if (element instanceof HTMLElement) element.focus()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return
    const { data, trap } = readForm(event.currentTarget)
    const found = validate(data)
    setErrors(found)

    const invalid = fieldOrder.filter((field) => found[field])
    const first = invalid[0]
    if (first) {
      setAnnouncement(copy.errors.summary(invalid.length))
      focusField(first)
      return
    }

    setStatus('submitting')
    setAnnouncement(copy.submitting)
    // Bots fill the hidden field: show success without sending anything.
    const result = trap ? { ok: true as const } : await submitContactForm(data)
    if (result.ok) {
      formRef.current?.reset()
      setStatus('success')
      setAnnouncement(copy.success.title)
      requestAnimationFrame(() => successRef.current?.focus())
    } else {
      setStatus('error')
      setAnnouncement(copy.failure)
    }
  }

  // After an error has been shown, re-check that field as the visitor edits it, so it clears as
  // soon as it's fixed. Not on blur: clearing an error on blur shifts the layout under the
  // pointer and the submit click can miss. (React's onChange bubbles to the form, so one handler covers every field.)
  function handleInput(event: FormEvent<HTMLFormElement>) {
    if (!(event.target instanceof Element)) return
    const field = event.target.getAttribute('name')
    if (!isField(field) || !errors[field]) return
    const next = validate(readForm(event.currentTarget).data)[field]
    setErrors((current) => ({ ...current, [field]: next }))
  }

  function fieldProps(field: ContactField) {
    const error = errors[field]
    return {
      id: idFor(field),
      name: field,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? errorIdFor(field) : undefined,
    }
  }

  function errorFor(field: ContactField) {
    const error = errors[field]
    if (!error) return null
    // Not role="alert": the live region announces one summary instead of every error at once.
    return (
      <FieldError id={errorIdFor(field)} role={undefined}>
        {error}
      </FieldError>
    )
  }

  const inputClass = 'h-11 bg-brand-surface text-base md:text-base'

  return (
    <div className="rounded-3xl bg-brand-surface p-6 ring-1 ring-brand-line sm:p-8 lg:p-10">
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {status === 'success' ? (
        <div className="flex flex-col items-start gap-4 py-6">
          <CircleCheckIcon aria-hidden="true" className="size-10 text-brand-accent-ink" />
          <h2 ref={successRef} tabIndex={-1} className="text-3xl outline-none">
            {copy.success.title}
          </h2>
          <p className="text-lg text-pretty">{copy.success.text}</p>
          <Button
            variant="outline"
            size="lg"
            className="mt-2 h-11 px-5"
            onClick={() => {
              setStatus('idle')
              setAnnouncement('')
            }}
          >
            {copy.success.again}
          </Button>
        </div>
      ) : (
        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          onChange={handleInput}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl sm:text-4xl">{copy.title}</h2>
            <p className="text-pretty">{copy.intro}</p>
            <p className="text-sm">{copy.requiredNote}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor={idFor('name')}>
                {copy.labels.name} <span aria-hidden="true">*</span>
              </FieldLabel>
              <Input
                {...fieldProps('name')}
                type="text"
                autoComplete="name"
                required
                placeholder={copy.placeholders.name}
                className={inputClass}
              />
              {errorFor('name')}
            </Field>

            <Field>
              <FieldLabel htmlFor={idFor('email')}>
                {copy.labels.email} <span aria-hidden="true">*</span>
              </FieldLabel>
              <Input
                {...fieldProps('email')}
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                required
                placeholder={copy.placeholders.email}
                className={inputClass}
              />
              {errorFor('email')}
            </Field>

            <Field>
              <FieldLabel htmlFor={idFor('phone')}>{copy.labels.phone}</FieldLabel>
              <Input
                {...fieldProps('phone')}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={copy.placeholders.phone}
                className={inputClass}
              />
              {errorFor('phone')}
            </Field>

            <Field>
              <FieldLabel htmlFor={idFor('subject')}>{copy.labels.subject}</FieldLabel>
              <NativeSelect
                {...fieldProps('subject')}
                defaultValue="General"
                className="w-full [&_select]:h-11 [&_select]:bg-brand-surface [&_select]:text-base"
              >
                {contactSubjects.map((subject) => (
                  <NativeSelectOption key={subject} value={subject}>
                    {copy.subjectLabels[subject]}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor={idFor('message')}>
                {copy.labels.message} <span aria-hidden="true">*</span>
              </FieldLabel>
              <Textarea
                {...fieldProps('message')}
                required
                rows={6}
                placeholder={copy.placeholders.message}
                className="min-h-36 bg-brand-surface text-base md:text-base"
              />
              {errorFor('message')}
            </Field>
          </div>

          {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
          <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
            <label htmlFor={idFor(HONEYPOT)}>{copy.honeypotLabel}</label>
            <input
              id={idFor(HONEYPOT)}
              name={HONEYPOT}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          {status === 'error' && (
            <p className="flex gap-3 rounded-xl bg-destructive/10 p-4 text-sm text-brand-heading">
              <TriangleAlertIcon aria-hidden="true" className="size-5 shrink-0 text-destructive" />
              {copy.failure}
            </p>
          )}

          <Button
            type="submit"
            variant="accent"
            size="lg"
            // aria-disabled, not disabled: a disabled button drops keyboard focus to <body>.
            aria-disabled={status === 'submitting'}
            className="h-12 w-full px-6 text-base aria-disabled:cursor-wait aria-disabled:opacity-80 sm:w-fit"
          >
            {status === 'submitting' ? (
              <Loader2Icon data-icon="inline-start" aria-hidden="true" className="animate-spin" />
            ) : (
              <SendIcon data-icon="inline-start" aria-hidden="true" />
            )}
            {status === 'submitting' ? copy.submitting : copy.submit}
          </Button>
        </form>
      )}
    </div>
  )
}
