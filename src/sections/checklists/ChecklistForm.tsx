import { useCallback, useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CircleCheckIcon,
  HistoryIcon,
  Loader2Icon,
  RotateCcwIcon,
  SendIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { FormProvider, useForm, useWatch, type FieldErrors } from 'react-hook-form'

import { AppLink } from '@/components/layout/AppLink'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { Progress } from '@/components/ui/progress'
import { checklistCopy as copy } from '@/content/checklists/copy'
import type { ChecklistFormDefinition, ChecklistSection } from '@/content/checklists/types'
import { pageById } from '@/content/pages'
import { submitChecklist } from '@/lib/checklist'
import {
  buildAnswers,
  buildChecklistSchema,
  defaultValues,
  emptyEntries,
  staleEntries,
  visibleQuestions,
  visibleSections,
  type ChecklistValues,
} from '@/lib/checklists/answers'
import { clearDraft, loadDraft, saveDraft } from '@/lib/checklists/draft'
import { ChecklistQuestionField } from '@/sections/checklists/ChecklistQuestionField'
import { ChecklistReview } from '@/sections/checklists/ChecklistReview'
import { cn } from '@/lib/utils'

const REVIEW = 'review'
const HONEYPOT = 'fax_number'
type Status = 'idle' | 'submitting' | 'success' | 'error'

/** Every key a section's visible questions own, in screen order (for validation and focus). */
function sectionKeys(section: ChecklistSection, values: ChecklistValues): string[] {
  return visibleQuestions(section, values).flatMap((question) =>
    emptyEntries(question).map(([key]) => key),
  )
}

function focusKey(container: HTMLElement | null, key: string) {
  const element = container?.querySelector<HTMLElement>(`[data-focus-key="${CSS.escape(key)}"]`)
  element?.focus()
  element?.scrollIntoView({ block: 'center' })
}

/**
 * Multi-step checklist form rendered entirely from its data (src/content/checklists/).
 * One step per section, then a review step. Each step is validated on Next (zod schema generated
 * from the data); errors are inline and linked, focus moves to the first one, and one polite live
 * region announces the summary, step changes and the result. Answers autosave to localStorage.
 */
export function ChecklistForm({ form }: { form: ChecklistFormDefinition }) {
  const idPrefix = useId()
  const schema = useMemo(() => buildChecklistSchema(form), [form])
  const defaults = useMemo(() => defaultValues(form), [form])
  const methods = useForm<ChecklistValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: false,
  })
  const { control, trigger, getValues, setValue, clearErrors, reset } = methods

  // Only the answers that decide which questions and steps show.
  const conditionKeys = useMemo(
    () => [
      ...new Set(
        form.sections.flatMap((section) =>
          [section.showIf, ...section.questions.map((question) => question.showIf)].flatMap(
            (condition) => (condition ? [condition.questionId] : []),
          ),
        ),
      ),
    ],
    [form],
  )
  const watched = useWatch({ control, name: conditionKeys })
  const conditionValues: ChecklistValues = Object.fromEntries(
    conditionKeys.map((key, index) => [key, watched[index] ?? null]),
  )
  const sections = visibleSections(form, conditionValues)
  const firstStep = sections[0]?.id ?? REVIEW

  const [stepId, setStepId] = useState(firstStep)
  const [returnToReview, setReturnToReview] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [announcement, setAnnouncement] = useState('')
  const [restored, setRestored] = useState<{ hadFiles: boolean } | null>(null)
  // Bumped by "Start over" to remount the fields (file inputs hold DOM state).
  const [formKey, setFormKey] = useState(0)
  // Steps animate in only after the visitor moves, not on first paint.
  const [moved, setMoved] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)
  const pendingFocus = useRef<{ kind: 'heading' } | { kind: 'field'; key: string } | null>(null)
  const draftReady = useRef(false)
  const stepRef = useRef(stepId)

  const isReview = stepId === REVIEW
  const stepIndex = isReview ? sections.length : sections.findIndex((s) => s.id === stepId)
  const section = isReview ? undefined : sections[stepIndex]
  const total = sections.length + 1
  const stepLabel = copy.step(stepIndex + 1, total)
  const home = pageById('home')
  const services = pageById('services')

  // Restore a saved draft once, after hydration (storage is never read during render).
  useEffect(() => {
    const draft = loadDraft(form)
    draftReady.current = true
    if (!draft) return
    reset(draft.values)
    const steps = visibleSections(form, draft.values)
    const step =
      draft.step === REVIEW || steps.some((item) => item.id === draft.step)
        ? draft.step
        : (steps[0]?.id ?? REVIEW)
    stepRef.current = step
    // A one-off restore after the prerendered HTML hydrates (storage isn't readable on the server).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStepId(step)
    setRestored({ hadFiles: draft.hadFiles })
  }, [form, reset])

  // Autosave shortly after edits. Step changes save in goTo (an effect would also run on mount
  // and overwrite the restored step).
  useEffect(() => {
    if (status === 'success') return
    let timer: number | undefined
    const unsubscribe = methods.subscribe({
      formState: { values: true },
      callback: () => {
        window.clearTimeout(timer)
        timer = window.setTimeout(() => {
          if (draftReady.current) saveDraft(form, getValues(), stepRef.current)
        }, 400)
      },
    })
    return () => {
      unsubscribe()
      window.clearTimeout(timer)
    }
  }, [form, methods, getValues, status])

  // Move focus once the new step (or the success panel) has rendered.
  useEffect(() => {
    const target = pendingFocus.current
    if (!target) return
    pendingFocus.current = null
    if (status === 'success') {
      containerRef.current?.scrollIntoView({ block: 'start' })
      successRef.current?.focus({ preventScroll: true })
      return
    }
    if (target.kind === 'heading') {
      containerRef.current?.scrollIntoView({ block: 'start' })
      headingRef.current?.focus({ preventScroll: true })
    } else {
      focusKey(containerRef.current, target.key)
    }
  }, [stepId, status, formKey])

  function goTo(id: string, focus: { kind: 'heading' } | { kind: 'field'; key: string }) {
    pendingFocus.current = focus
    stepRef.current = id
    if (draftReady.current) saveDraft(form, getValues(), id)
    setMoved(true)
    // The "Draft restored" notice (and its Start over) belongs to the step it was shown on.
    setRestored(null)
    setStepId(id)
    const index = id === REVIEW ? sections.length : sections.findIndex((s) => s.id === id)
    const title = id === REVIEW ? copy.reviewTitle : sections[index]?.title
    setAnnouncement(`${copy.step(index + 1, total)}: ${title}`)
  }

  /** Validate the current step; on errors focus the first and announce the count. */
  async function validateStep(): Promise<boolean> {
    if (!section) return true
    const keys = sectionKeys(section, getValues())
    if (await trigger(keys)) return true
    const invalid = keys.filter((key) => methods.getFieldState(key).error)
    setAnnouncement(copy.errors.stepSummary(invalid.length))
    const first = invalid[0]
    if (first) requestAnimationFrame(() => focusKey(containerRef.current, first))
    return false
  }

  async function goNext() {
    if (!(await validateStep())) return
    if (returnToReview) {
      setReturnToReview(false)
      goTo(REVIEW, { kind: 'heading' })
      return
    }
    goTo(sections[stepIndex + 1]?.id ?? REVIEW, { kind: 'heading' })
  }

  function goBack() {
    const previous = sections[stepIndex - 1]
    if (previous) goTo(previous.id, { kind: 'heading' })
  }

  function editSection(id: string) {
    setReturnToReview(true)
    goTo(id, { kind: 'heading' })
  }

  /** Clear answers that no longer apply (hidden questions, unpicked "Other"). */
  const handleAnswered = useCallback(
    (questionId: string) => {
      for (const [key, empty] of staleEntries(form, questionId, getValues())) {
        setValue(key, empty)
        clearErrors(key)
      }
    },
    [form, getValues, setValue, clearErrors],
  )

  function startOver() {
    clearDraft(form.id)
    reset(defaults)
    setRestored(null)
    setReturnToReview(false)
    setStatus('idle')
    setFormKey((key) => key + 1)
    pendingFocus.current = { kind: 'heading' }
    stepRef.current = firstStep
    setStepId(firstStep)
    setAnnouncement(copy.draft.cleared)
  }

  async function submitValid(values: ChecklistValues) {
    setStatus('submitting')
    setAnnouncement(copy.submitting)
    // Bots fill the hidden field: show success without sending anything.
    const trapped = Boolean(honeypotRef.current?.value)
    const result = trapped
      ? { ok: true as const }
      : await submitChecklist(form.id, buildAnswers(form, values))
    if (result.ok) {
      clearDraft(form.id)
      draftReady.current = false
      pendingFocus.current = { kind: 'heading' }
      setStatus('success')
      setAnnouncement(copy.success.title)
    } else {
      setStatus('error')
      setAnnouncement(copy.failure)
    }
  }

  /** Something was invalid at submit (e.g. an edited draft): go to the first problem. */
  function submitInvalid(errors: FieldErrors<ChecklistValues>) {
    const values = getValues()
    for (const item of visibleSections(form, values)) {
      const key = sectionKeys(item, values).find((candidate) => errors[candidate])
      if (key) {
        setReturnToReview(true)
        goTo(item.id, { kind: 'field', key })
        setAnnouncement(copy.errors.reviewSummary)
        return
      }
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return
    // Enter in a text field on an earlier step moves on instead of submitting.
    if (!isReview) {
      void goNext()
      return
    }
    void methods.handleSubmit(submitValid, submitInvalid)()
  }

  const liveRegion = (
    <p role="status" aria-live="polite" className="sr-only">
      {announcement}
    </p>
  )

  if (status === 'success') {
    return (
      <div
        ref={containerRef}
        className="scroll-mt-24 rounded-3xl bg-brand-surface p-6 ring-1 ring-brand-line sm:p-8 lg:p-10"
      >
        {liveRegion}
        <div className="flex flex-col items-start gap-4 py-4">
          <CircleCheckIcon aria-hidden="true" className="size-10 text-brand-accent-ink" />
          <h2 ref={successRef} tabIndex={-1} className="text-3xl outline-none sm:text-4xl">
            {copy.success.title}
          </h2>
          <p className="max-w-prose text-lg text-pretty">{copy.success.text}</p>
          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild variant="accent" size="lg" className="h-12 px-5 text-base">
              <AppLink href={home.path}>{copy.success.home}</AppLink>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-5 text-base">
              <AppLink href={services.path}>{copy.success.services}</AppLink>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <div
      ref={containerRef}
      className="scroll-mt-24 rounded-3xl bg-brand-surface ring-1 ring-brand-line"
    >
      {liveRegion}

      <div className="flex flex-col gap-3 border-b border-brand-line p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="text-sm font-medium whitespace-nowrap text-brand-heading">{stepLabel}</p>
          <p className="text-sm text-brand-text">{copy.requiredNote}</p>
        </div>
        <Progress
          value={((stepIndex + 1) / total) * 100}
          getValueLabel={() => stepLabel}
          aria-label={stepLabel}
          className="h-1.5 bg-brand-surface-muted *:data-[slot=progress-indicator]:bg-brand-accent-ink"
        />
      </div>

      {restored && (
        <div className="px-6 pt-6 sm:px-8">
          <Alert role="status" className="border-brand-line bg-brand-surface-muted p-4">
            <HistoryIcon aria-hidden="true" />
            <AlertTitle className="text-base text-brand-heading">{copy.draft.restored}</AlertTitle>
            <AlertDescription className="flex flex-col items-start gap-3 text-brand-text">
              <p>
                {copy.draft.restoredText} {restored.hadFiles && copy.draft.restoredFiles}
              </p>
              <Button type="button" variant="outline" className="h-11 px-4" onClick={startOver}>
                <RotateCcwIcon data-icon="inline-start" aria-hidden="true" />
                {copy.draft.startOver}
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit} aria-labelledby={`${idPrefix}-step-title`}>
          <div
            key={`${formKey}-${stepId}`}
            className={cn('flex flex-col gap-8 p-6 sm:p-8', moved && 'animate-step-in')}
          >
            <h2
              ref={headingRef}
              id={`${idPrefix}-step-title`}
              tabIndex={-1}
              className="text-2xl outline-none sm:text-3xl"
            >
              {section ? section.title : copy.reviewTitle}
            </h2>

            {section ? (
              <FieldGroup className="gap-8">
                {visibleQuestions(section, conditionValues).map((question) => (
                  <ChecklistQuestionField
                    key={question.id}
                    question={question}
                    idPrefix={idPrefix}
                    onAnswered={handleAnswered}
                  />
                ))}
              </FieldGroup>
            ) : (
              <>
                <p className="-mt-4 text-pretty">{copy.reviewIntro}</p>
                <ChecklistReview form={form} values={getValues()} onEdit={editSection} />
              </>
            )}

            {status === 'error' && (
              <Alert variant="destructive" className="bg-destructive/10 p-4">
                <TriangleAlertIcon aria-hidden="true" />
                <AlertDescription className="text-brand-heading">{copy.failure}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
          <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
            <label htmlFor={`${idPrefix}-${HONEYPOT}`}>{copy.honeypotLabel}</label>
            <input
              ref={honeypotRef}
              id={`${idPrefix}-${HONEYPOT}`}
              name={HONEYPOT}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          {/* Sticky on phones so Back/Next are always in reach; inline from sm up. */}
          <div
            data-checklist-actions=""
            className="sticky bottom-0 z-20 flex gap-3 rounded-b-3xl border-t border-brand-line bg-brand-surface px-6 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_20px_-12px_color-mix(in_oklab,var(--brand-primary)_25%,transparent)] sm:static sm:justify-between sm:px-8 sm:py-6 sm:shadow-none"
          >
            {stepIndex > 0 ? (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={goBack}
                className="h-12 flex-1 px-5 text-base sm:flex-none"
              >
                <ArrowLeftIcon data-icon="inline-start" aria-hidden="true" />
                {copy.back}
              </Button>
            ) : (
              <span className="hidden sm:block" />
            )}

            {isReview ? (
              <Button
                type="submit"
                variant="accent"
                size="lg"
                // aria-disabled, not disabled: a disabled button drops keyboard focus to <body>.
                aria-disabled={submitting}
                className="h-12 flex-1 px-6 text-base aria-disabled:cursor-wait aria-disabled:opacity-80 sm:flex-none"
              >
                {submitting ? (
                  <Loader2Icon
                    data-icon="inline-start"
                    aria-hidden="true"
                    className="animate-spin"
                  />
                ) : (
                  <SendIcon data-icon="inline-start" aria-hidden="true" />
                )}
                {submitting ? copy.submitting : copy.submit}
              </Button>
            ) : (
              <Button type="submit" size="lg" className="h-12 flex-1 px-6 text-base sm:flex-none">
                {returnToReview
                  ? copy.backToReview
                  : stepIndex === sections.length - 1
                    ? copy.toReview
                    : copy.next}
                <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
