import { useRef, type ReactNode } from 'react'
import { PaperclipIcon, UploadIcon, XIcon } from 'lucide-react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { checklistCopy as copy } from '@/content/checklists/copy'
import type {
  ChecklistQuestion,
  ConfirmQuestion,
  DateQuestion,
  FileQuestion,
  MultiChoiceQuestion,
  SingleChoiceQuestion,
  TextQuestion,
} from '@/content/checklists/types'
import type { FileMeta } from '@/lib/checklist'
import {
  acceptAttribute,
  fileRuleLines,
  formatBytes,
  linkKey,
  specifyChosen,
  specifyKey,
  type ChecklistValues,
} from '@/lib/checklists/answers'
import { cn } from '@/lib/utils'

interface QuestionProps<Q extends ChecklistQuestion> {
  question: Q
  /** Prefix for element ids (unique per form instance). */
  idPrefix: string
  /** Called after the answer changes, so the form can clear answers that no longer apply. */
  onAnswered: (questionId: string) => void
}

/** Renders one question from the form data with the control that fits its type. */
export function ChecklistQuestionField(props: QuestionProps<ChecklistQuestion>) {
  const { question } = props
  switch (question.type) {
    case 'short':
    case 'paragraph':
      return <TextField {...props} question={question} />
    case 'date':
      return <DateField {...props} question={question} />
    case 'single':
      return <SingleChoiceField {...props} question={question} />
    case 'multi':
      return <MultiChoiceField {...props} question={question} />
    case 'confirm':
      return <ConfirmField {...props} question={question} />
    case 'file':
      return <FileField {...props} question={question} />
  }
}

// ── Shared bits ─────────────────────────────────────────────────────────────

const inputClass = 'h-12 bg-brand-surface text-base md:text-base'
const labelClass = 'text-base leading-snug font-medium text-brand-heading'
// Radios and checkboxes: a slate outline (the default brand line is too faint for 3:1).
const controlClass = 'size-5 border-muted-foreground/80'

function ids(idPrefix: string, key: string) {
  const base = `${idPrefix}-${key}`
  return { control: base, hint: `${base}-hint`, error: `${base}-error`, legend: `${base}-legend` }
}

function describedBy(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ') || undefined
}

function RequiredMark({ required, inGroup }: { required?: boolean; inGroup?: boolean }) {
  if (!required) return null
  return (
    <>
      <span aria-hidden="true">*</span>
      {/* Groups (radios, checkboxes) can't carry aria-required on every control, so say it. */}
      {inGroup && <span className="sr-only">(required)</span>}
    </>
  )
}

/** Inline error, linked by id. Not role="alert": the form announces one summary instead. */
function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <FieldError id={id} role={undefined}>
      {message}
    </FieldError>
  )
}

function Hint({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null
  return (
    <FieldDescription id={id} className="text-brand-text">
      {children}
    </FieldDescription>
  )
}

// ── Text ────────────────────────────────────────────────────────────────────

function inputPropsFor(question: TextQuestion) {
  switch (question.format) {
    case 'email':
      return { type: 'email', inputMode: 'email', spellCheck: false } as const
    case 'emails':
      return { type: 'text', inputMode: 'email', spellCheck: false } as const
    case 'phone':
      return { type: 'tel', inputMode: 'tel' } as const
    case 'url':
      return { type: 'url', inputMode: 'url', spellCheck: false } as const
    default:
      return question.autoComplete === 'tel'
        ? ({ type: 'text', inputMode: 'tel' } as const)
        : ({ type: 'text' } as const)
  }
}

function TextField({ question, idPrefix }: QuestionProps<TextQuestion>) {
  const { control } = useFormContext<ChecklistValues>()
  const id = ids(idPrefix, question.id)

  return (
    <Controller
      name={question.id}
      control={control}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        const shared = {
          id: id.control,
          name: field.name,
          value: typeof field.value === 'string' ? field.value : '',
          onChange: field.onChange,
          onBlur: field.onBlur,
          'data-focus-key': question.id,
          'aria-invalid': error ? true : undefined,
          'aria-required': question.required || undefined,
          'aria-describedby': describedBy(question.hint && id.hint, error && id.error),
          autoComplete: question.autoComplete ?? 'off',
        }
        return (
          <Field data-invalid={error ? true : undefined}>
            <FieldLabel htmlFor={id.control} className={labelClass}>
              {question.label} <RequiredMark required={question.required} />
            </FieldLabel>
            <Hint id={id.hint}>{question.hint}</Hint>
            {question.type === 'paragraph' ? (
              <Textarea
                {...shared}
                ref={field.ref}
                rows={4}
                className="min-h-32 bg-brand-surface text-base md:text-base"
              />
            ) : (
              <Input
                {...shared}
                {...inputPropsFor(question)}
                ref={field.ref}
                className={inputClass}
              />
            )}
            <ErrorText id={id.error} message={error} />
          </Field>
        )
      }}
    />
  )
}

// ── Date ────────────────────────────────────────────────────────────────────

function DateField({ question, idPrefix }: QuestionProps<DateQuestion>) {
  const { control } = useFormContext<ChecklistValues>()
  const id = ids(idPrefix, question.id)

  return (
    <Controller
      name={question.id}
      control={control}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        return (
          <Field data-invalid={error ? true : undefined}>
            <FieldLabel htmlFor={id.control} className={labelClass}>
              {question.label} <RequiredMark required={question.required} />
            </FieldLabel>
            <Input
              ref={field.ref}
              id={id.control}
              name={field.name}
              type="date"
              value={typeof field.value === 'string' ? field.value : ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              data-focus-key={question.id}
              aria-invalid={error ? true : undefined}
              aria-required={question.required || undefined}
              aria-describedby={describedBy(error && id.error)}
              className={cn(inputClass, 'sm:w-64')}
            />
            <ErrorText id={id.error} message={error} />
          </Field>
        )
      }}
    />
  )
}

// ── Choices ─────────────────────────────────────────────────────────────────

/** A whole-row tap target: the label wraps the control and its text (shadcn choice card). */
function ChoiceRow({
  htmlFor,
  control,
  label,
}: {
  htmlFor: string
  control: ReactNode
  label: string
}) {
  return (
    <FieldLabel
      htmlFor={htmlFor}
      className="w-full bg-brand-surface text-base font-normal text-brand-heading transition-colors active:bg-muted *:data-[slot=field]:min-h-12 *:data-[slot=field]:px-4 *:data-[slot=field]:py-3"
    >
      <Field orientation="horizontal" className="items-center gap-3">
        {control}
        <span id={`${htmlFor}-label`} className="leading-snug">
          {label}
        </span>
      </Field>
    </FieldLabel>
  )
}

/** Optional text field revealed by an "Other" option. */
function SpecifyField({
  question,
  idPrefix,
}: {
  question: SingleChoiceQuestion | MultiChoiceQuestion
  idPrefix: string
}) {
  const { control } = useFormContext<ChecklistValues>()
  const values = useWatch({ control, name: question.id })
  if (!specifyChosen(question, { [question.id]: values })) return null
  const option = question.options.find((item) => item.specify)
  const key = specifyKey(question.id)
  const id = ids(idPrefix, key)

  return (
    <Controller
      name={key}
      control={control}
      render={({ field }) => (
        <Field className="mt-1 pl-4 sm:pl-11">
          <FieldLabel htmlFor={id.control} className="text-sm font-medium text-brand-heading">
            {copy.specifyLabel}
            <span className="sr-only">: {option?.label}</span>
          </FieldLabel>
          <Input
            ref={field.ref}
            id={id.control}
            name={field.name}
            value={typeof field.value === 'string' ? field.value : ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            autoComplete="off"
            className={inputClass}
          />
        </Field>
      )}
    />
  )
}

function SingleChoiceField({
  question,
  idPrefix,
  onAnswered,
}: QuestionProps<SingleChoiceQuestion>) {
  const { control } = useFormContext<ChecklistValues>()
  const id = ids(idPrefix, question.id)

  return (
    <Controller
      name={question.id}
      control={control}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        return (
          <FieldSet data-invalid={error ? true : undefined} className="gap-3">
            <FieldLegend id={id.legend} className={labelClass}>
              {question.label} <RequiredMark required={question.required} inGroup />
            </FieldLegend>
            <RadioGroup
              name={field.name}
              value={typeof field.value === 'string' ? field.value : ''}
              onValueChange={(value) => {
                field.onChange(value)
                onAnswered(question.id)
              }}
              aria-labelledby={id.legend}
              aria-required={question.required || undefined}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy(error && id.error)}
              className="gap-2"
            >
              {question.options.map((option, index) => {
                const optionId = `${id.control}-${index}`
                return (
                  <ChoiceRow
                    key={option.label}
                    htmlFor={optionId}
                    label={option.label}
                    control={
                      <RadioGroupItem
                        ref={index === 0 ? field.ref : undefined}
                        id={optionId}
                        // Explicit name: <label for> isn't counted for role="radio"/"checkbox" buttons.
                        aria-labelledby={`${optionId}-label`}
                        value={option.label}
                        onBlur={field.onBlur}
                        data-focus-key={index === 0 ? question.id : undefined}
                        aria-invalid={error ? true : undefined}
                        className={controlClass}
                      />
                    }
                  />
                )
              })}
            </RadioGroup>
            <SpecifyField question={question} idPrefix={idPrefix} />
            <ErrorText id={id.error} message={error} />
          </FieldSet>
        )
      }}
    />
  )
}

function MultiChoiceField({ question, idPrefix, onAnswered }: QuestionProps<MultiChoiceQuestion>) {
  const { control } = useFormContext<ChecklistValues>()
  const id = ids(idPrefix, question.id)

  return (
    <Controller
      name={question.id}
      control={control}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        const chosen = Array.isArray(field.value) ? field.value : []
        return (
          <FieldSet
            data-invalid={error ? true : undefined}
            aria-describedby={describedBy(error && id.error)}
            className="gap-3"
          >
            <FieldLegend className={labelClass}>
              {question.label} <RequiredMark required={question.required} inGroup />
            </FieldLegend>
            <div data-slot="checkbox-group" className="flex flex-col gap-2">
              {question.options.map((option, index) => {
                const optionId = `${id.control}-${index}`
                return (
                  <ChoiceRow
                    key={option.label}
                    htmlFor={optionId}
                    label={option.label}
                    control={
                      <Checkbox
                        ref={index === 0 ? field.ref : undefined}
                        id={optionId}
                        // Explicit name: <label for> isn't counted for role="radio"/"checkbox" buttons.
                        aria-labelledby={`${optionId}-label`}
                        name={field.name}
                        value={option.label}
                        checked={chosen.includes(option.label)}
                        onCheckedChange={(checked) => {
                          // Keep the options' order, whatever the click order.
                          const next = question.options
                            .map((item) => item.label)
                            .filter((label) =>
                              label === option.label ? checked === true : chosen.includes(label),
                            )
                          field.onChange(next)
                          onAnswered(question.id)
                        }}
                        onBlur={field.onBlur}
                        data-focus-key={index === 0 ? question.id : undefined}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={describedBy(error && id.error)}
                        className={controlClass}
                      />
                    }
                  />
                )
              })}
            </div>
            <SpecifyField question={question} idPrefix={idPrefix} />
            <ErrorText id={id.error} message={error} />
          </FieldSet>
        )
      }}
    />
  )
}

function ConfirmField({ question, idPrefix }: QuestionProps<ConfirmQuestion>) {
  const { control } = useFormContext<ChecklistValues>()
  const id = ids(idPrefix, question.id)

  return (
    <Controller
      name={question.id}
      control={control}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        return (
          <Field data-invalid={error ? true : undefined} className="gap-2">
            <FieldLabel
              htmlFor={id.control}
              className="w-full bg-brand-surface text-base font-medium text-brand-heading *:data-[slot=field]:min-h-12 *:data-[slot=field]:px-4 *:data-[slot=field]:py-3"
            >
              <Field orientation="horizontal" className="items-start gap-3">
                <Checkbox
                  ref={field.ref}
                  id={id.control}
                  name={field.name}
                  checked={field.value === true}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                  onBlur={field.onBlur}
                  data-focus-key={question.id}
                  aria-labelledby={`${id.control}-label`}
                  aria-required={question.required || undefined}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy(error && id.error)}
                  className={cn(controlClass, 'mt-0.5')}
                />
                <span id={`${id.control}-label`} className="leading-snug">
                  {question.label} <RequiredMark required={question.required} />
                </span>
              </Field>
            </FieldLabel>
            <ErrorText id={id.error} message={error} />
          </Field>
        )
      }}
    />
  )
}

// ── File ────────────────────────────────────────────────────────────────────

function isFileMeta(value: unknown): value is FileMeta {
  return typeof value === 'object' && value !== null && 'name' in value && 'size' in value
}

function FileField({ question, idPrefix }: QuestionProps<FileQuestion>) {
  const { control, trigger } = useFormContext<ChecklistValues>()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const id = ids(idPrefix, question.id)
  const rulesId = `${id.control}-rules`
  const fileId = `${id.control}-file`
  const link = question.link
  const linkIds = ids(idPrefix, linkKey(question.id))

  return (
    <div className="flex flex-col gap-4">
      <Controller
        name={question.id}
        control={control}
        render={({ field, fieldState }) => {
          const error = fieldState.error?.message
          const file = isFileMeta(field.value) ? field.value : null
          return (
            <Field data-invalid={error ? true : undefined}>
              <FieldLabel htmlFor={id.control} className={labelClass}>
                {question.label} <RequiredMark required={question.required} />
              </FieldLabel>
              <Hint id={id.hint}>{question.hint}</Hint>
              <FieldDescription id={rulesId} className="text-brand-text">
                <span className="font-medium text-brand-heading">{copy.file.accepted}</span>{' '}
                {fileRuleLines(question).map((line, index) => (
                  <span key={line}>
                    {index > 0 && <span aria-hidden="true"> · </span>}
                    {index > 0 && <span className="sr-only">; </span>}
                    {line}
                  </span>
                ))}
              </FieldDescription>

              {/* The native input does the work (keyboard, file picker); the label below is its
                  visible face. Its file name comes from the form state, so it survives steps. */}
              <div className="flex flex-wrap items-center gap-3">
                <input
                  ref={(element) => {
                    inputRef.current = element
                    field.ref(element)
                  }}
                  id={id.control}
                  name={field.name}
                  type="file"
                  accept={acceptAttribute(question)}
                  data-focus-key={question.id}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy(
                    question.hint && id.hint,
                    rulesId,
                    file && fileId,
                    error && id.error,
                  )}
                  onChange={(event) => {
                    const picked = event.target.files?.[0]
                    field.onChange(
                      picked ? { name: picked.name, size: picked.size, type: picked.type } : null,
                    )
                    void trigger(question.id)
                  }}
                  onBlur={field.onBlur}
                  className="peer sr-only"
                />
                <label
                  htmlFor={id.control}
                  aria-hidden="true"
                  className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-lg border border-border bg-brand-surface px-4 text-base font-medium text-brand-heading transition-colors peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring hover:bg-muted active:bg-muted"
                >
                  <UploadIcon aria-hidden="true" className="size-4" />
                  {copy.file.choose}
                </label>
                {file && (
                  <p
                    id={fileId}
                    className="flex min-w-0 items-center gap-2 text-sm text-brand-heading"
                  >
                    <PaperclipIcon aria-hidden="true" className="size-4 shrink-0" />
                    <span className="sr-only">{copy.file.selected}</span>
                    <span className="min-w-0 truncate">{file.name}</span>
                    <span className="shrink-0 text-brand-text">({formatBytes(file.size)})</span>
                  </p>
                )}
                {file && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-11 px-3 text-sm"
                    onClick={() => {
                      if (inputRef.current) inputRef.current.value = ''
                      field.onChange(null)
                      void trigger(question.id)
                      inputRef.current?.focus()
                    }}
                  >
                    <XIcon data-icon="inline-start" aria-hidden="true" />
                    {copy.file.remove}
                    <span className="sr-only">: {file.name}</span>
                  </Button>
                )}
              </div>
              <ErrorText id={id.error} message={error} />
            </Field>
          )
        }}
      />

      {link && (
        <Controller
          name={linkKey(question.id)}
          control={control}
          render={({ field, fieldState }) => {
            const error = fieldState.error?.message
            return (
              <Field data-invalid={error ? true : undefined}>
                <FieldLabel
                  htmlFor={linkIds.control}
                  className="text-sm font-medium text-brand-heading"
                >
                  {link.label}
                </FieldLabel>
                <Input
                  ref={field.ref}
                  id={linkIds.control}
                  name={field.name}
                  type="url"
                  inputMode="url"
                  spellCheck={false}
                  autoComplete="off"
                  placeholder={link.placeholder}
                  value={typeof field.value === 'string' ? field.value : ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  data-focus-key={linkKey(question.id)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy(error && linkIds.error)}
                  className={inputClass}
                />
                <ErrorText id={linkIds.error} message={error} />
              </Field>
            )
          }}
        />
      )}
    </div>
  )
}
