import { PencilIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { checklistCopy as copy } from '@/content/checklists/copy'
import type { ChecklistFormDefinition, ChecklistQuestion } from '@/content/checklists/types'
import type { ChecklistAnswer } from '@/lib/checklist'
import {
  allQuestions,
  buildAnswers,
  formatBytes,
  type ChecklistValues,
} from '@/lib/checklists/answers'

// Fixed locale and UTC: the date the visitor picked, written out the same way everywhere.
const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatAnswer(question: ChecklistQuestion | undefined, answer: ChecklistAnswer): string {
  const { answer: value, specify, link } = answer
  let text = ''
  if (typeof value === 'string')
    text = question?.type === 'date' ? dateFormat.format(new Date(`${value}T00:00:00Z`)) : value
  else if (value === true) text = copy.confirmed
  else if (value && typeof value === 'object')
    text = 'name' in value ? `${value.name} (${formatBytes(value.size)})` : value.join(', ')
  if (specify) text = `${text} (${specify})`
  if (link) text = text ? `${text}\n${link}` : link
  return text
}

interface ChecklistReviewProps {
  form: ChecklistFormDefinition
  values: ChecklistValues
  onEdit: (sectionId: string) => void
}

/** Final step: every visible answer by section, each section with an Edit button. */
export function ChecklistReview({ form, values, onEdit }: ChecklistReviewProps) {
  const questions = new Map(allQuestions(form).map((question) => [question.id, question]))
  const answers = buildAnswers(form, values)
  const sections = form.sections
    .map((section) => ({
      section,
      answers: answers.filter((answer) => answer.section === section.title),
    }))
    .filter((group) => group.answers.length > 0)

  return (
    <div className="flex flex-col gap-6">
      {sections.map(({ section, answers: sectionAnswers }) => (
        <section
          key={section.id}
          aria-labelledby={`review-${section.id}`}
          className="rounded-2xl bg-brand-surface-muted p-5 sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 id={`review-${section.id}`} className="text-lg sm:text-xl">
              {section.title}
            </h3>
            <Button
              type="button"
              variant="outline"
              className="h-11 shrink-0 px-4 text-sm"
              onClick={() => onEdit(section.id)}
            >
              <PencilIcon data-icon="inline-start" aria-hidden="true" />
              {copy.edit}
              <span className="sr-only"> {section.title}</span>
            </Button>
          </div>
          <dl className="mt-4 flex flex-col gap-4">
            {sectionAnswers.map((answer) => {
              const text = formatAnswer(questions.get(answer.id), answer)
              return (
                <div key={answer.id} className="flex flex-col gap-1">
                  <dt className="text-sm font-medium text-brand-heading">{answer.question}</dt>
                  <dd
                    className={
                      text
                        ? 'text-base wrap-anywhere whitespace-pre-line text-brand-text'
                        : 'text-base text-brand-text italic'
                    }
                  >
                    {text || copy.notAnswered}
                  </dd>
                </div>
              )
            })}
          </dl>
        </section>
      ))}
    </div>
  )
}
