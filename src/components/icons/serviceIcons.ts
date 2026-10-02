import {
  BrainCircuitIcon,
  ChartNoAxesCombinedIcon,
  CodeXmlIcon,
  HeadsetIcon,
  MegaphoneIcon,
  SmartphoneIcon,
  type LucideIcon,
} from 'lucide-react'

import type { ServiceId } from '@/content/services'

/** One icon per service (home service cards, the Services page and its nav). */
export const serviceIcons: Record<ServiceId, LucideIcon> = {
  'mobile-apps': SmartphoneIcon,
  software: CodeXmlIcon,
  'ai-models': BrainCircuitIcon,
  'data-analysis': ChartNoAxesCombinedIcon,
  'ites-bpo': HeadsetIcon,
  'digital-marketing': MegaphoneIcon,
}
