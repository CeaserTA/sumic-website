/**
 * Partners shown in the "Our Partners" carousel on https://sumicitsolutions.com/ (order preserved).
 * Logos were pulled from the live site (300px wide); replace with brand-kit/partner originals later.
 * Names were read from each logo, since the live site's alt text is only file names.
 */

export interface Partner {
  name: string
  logo: { src: string; width: number; height: number }
}

const logo = (file: string, height = 125) => ({
  src: `/brand/partners/${file}.webp`,
  width: 300,
  height,
})

export const partners: readonly Partner[] = [
  {
    name: 'Ministry of ICT and National Guidance',
    logo: logo('ministry-of-ict-and-national-guidance', 150),
  },
  { name: 'National ICT Innovation Hub', logo: logo('national-ict-innovation-hub') },
  { name: 'JICA', logo: logo('jica') },
  { name: 'Private Sector Foundation Uganda (PSFU)', logo: logo('psfu') },
  { name: 'International Trade Centre', logo: logo('international-trade-centre', 150) },
  { name: 'Hostinger', logo: logo('hostinger') },
  { name: 'SoftCraft', logo: logo('softcraft') },
  { name: 'CBM', logo: logo('cbm') },
  { name: 'Equator Posts', logo: logo('equator-posts') },
  // Logo is an illustration with no wordmark; the live site only labels it "CS P05".
  { name: 'TODO: partner name (logo file cs-p05)', logo: logo('cs-p05') },
  { name: 'Campaignity Technologies', logo: logo('campaignity-technologies') },
  { name: 'neexa', logo: logo('neexa') },
  { name: 'FELS', logo: logo('fels') },
  { name: 'eftax', logo: logo('eftax') },
  { name: 'FVITAL', logo: logo('fvital') },
  { name: 'Japan AI Consulting', logo: logo('japan-ai-consulting') },
  { name: 'Darajapan', logo: logo('darajapan') },
  { name: 'KPMG', logo: logo('kpmg') },
]

/** Partners safe to render: excludes any entry whose name is still a TODO placeholder. */
export const confirmedPartners: readonly Partner[] = partners.filter(
  (partner) => !partner.name.startsWith('TODO'),
)
