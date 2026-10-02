/**
 * Partners shown in the "Our Partners" carousel on https://sumicitsolutions.com/ (order preserved).
 * Logos were pulled from the live site and trimmed; replace with brand-kit/partner originals later.
 * Names were read from each logo, since the live site's alt text is only file names.
 */

export interface Partner {
  name: string
  logo: { src: string; width: number; height: number }
}

// Logos are trimmed to their visible content (originals in brand-originals/partners/),
// so width/height differ per file.
const logo = (file: string, width: number, height: number) => ({
  src: `/brand/partners/${file}.webp`,
  width,
  height,
})

export const partners: readonly Partner[] = [
  {
    name: 'Ministry of ICT and National Guidance',
    logo: logo('ministry-of-ict-and-national-guidance', 279, 64),
  },
  { name: 'National ICT Innovation Hub', logo: logo('national-ict-innovation-hub', 212, 83) },
  { name: 'JICA', logo: logo('jica', 143, 118) },
  { name: 'Private Sector Foundation Uganda (PSFU)', logo: logo('psfu', 162, 112) },
  { name: 'International Trade Centre', logo: logo('international-trade-centre', 238, 106) },
  { name: 'Hostinger', logo: logo('hostinger', 269, 64) },
  { name: 'SoftCraft', logo: logo('softcraft', 259, 59) },
  { name: 'CBM', logo: logo('cbm', 233, 91) },
  { name: 'Equator Posts', logo: logo('equator-posts', 277, 75) },
  // Logo is an illustration with no wordmark; the live site only labels it "CS P05".
  { name: 'TODO: partner name (logo file cs-p05)', logo: logo('cs-p05', 100, 119) },
  { name: 'Campaignity Technologies', logo: logo('campaignity-technologies', 300, 88) },
  { name: 'neexa', logo: logo('neexa', 113, 111) },
  { name: 'FELS', logo: logo('fels', 83, 114) },
  { name: 'eftax', logo: logo('eftax', 142, 95) },
  { name: 'FVITAL', logo: logo('fvital', 102, 103) },
  { name: 'Japan AI Consulting', logo: logo('japan-ai-consulting', 240, 58) },
  { name: 'Darajapan', logo: logo('darajapan', 106, 103) },
  { name: 'KPMG', logo: logo('kpmg', 170, 75) },
]

/** Partners safe to render: excludes any entry whose name is still a TODO placeholder. */
export const confirmedPartners: readonly Partner[] = partners.filter(
  (partner) => !partner.name.startsWith('TODO'),
)
