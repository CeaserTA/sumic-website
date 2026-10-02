import type { OrgNode } from '@/content/company'

/** Nested-list text version of an organisation chart (accessible alternative to the image). */
export function OrgTree({ nodes }: { nodes: readonly OrgNode[] }) {
  return (
    <ul className="flex flex-col gap-1.5 [&_ul]:mt-1.5 [&_ul]:ml-3 [&_ul]:border-l [&_ul]:border-brand-line [&_ul]:pl-4">
      {nodes.map((node) => (
        <li key={node.label}>
          <span className="font-medium text-brand-heading">{node.label}</span>
          {node.children && <OrgTree nodes={node.children} />}
        </li>
      ))}
    </ul>
  )
}
