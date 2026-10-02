// React Bits "BlurText" (https://reactbits.dev), adapted:
// - CSS keyframes (`animate-blur-in` in index.css) with the original's default curve
//   (blur 10px → 5px → 0, opacity 0 → .5 → 1, y -50 → 5 → 0), so the animation starts on
//   first paint of the prerendered HTML instead of waiting for JS; reduced motion is handled
//   by the global CSS safety net
// - renders <span>s so it can sit inside a heading (the original renders a <p>)
// - aria-hidden: the parent must carry the full text for assistive tech (e.g. an sr-only copy)
// - named export; inline style only for the dynamic per-segment delay
import { cn } from '@/lib/utils'

interface BlurTextProps {
  text: string
  /** Delay between segments, in ms. */
  delay?: number
  animateBy?: 'words' | 'letters'
  className?: string
}

export function BlurText({ text, delay = 200, animateBy = 'words', className }: BlurTextProps) {
  const segments = animateBy === 'words' ? text.split(' ') : text.split('')

  return (
    <span aria-hidden="true" className={cn('flex flex-wrap', className)}>
      {segments.map((segment, index) => (
        <span
          key={index}
          // Dynamic value: each segment starts a little after the previous one.
          style={{ animationDelay: `${index * delay}ms` }}
          className="inline-block animate-blur-in"
        >
          {segment === ' ' ? ' ' : segment}
          {animateBy === 'words' && index < segments.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}
