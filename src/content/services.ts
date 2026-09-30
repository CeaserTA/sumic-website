/** "What We Do" services. Source: https://sumicitsolutions.com/ home page. */

export interface Service {
  title: string
  /** Compact label for footers and menus, when the title is long. */
  shortTitle?: string
  summary: string
}

export const services: readonly Service[] = [
  {
    title: 'Mobile Application Development',
    summary:
      'Build sleek, secure, and scalable mobile apps for Android and iOS that elevate user experience and drive business growth.',
  },
  {
    title: 'Software Development',
    summary:
      'Custom software solutions built to solve real business problems and streamline operations.',
  },
  {
    title: 'AI Model Development',
    summary:
      'Empowering your business with intelligent, data-driven AI solutions customized for your industry.',
  },
  {
    title: 'Data Analysis',
    summary:
      'Unlock insights from your data to make smarter, faster, and evidence-based business decisions.',
  },
  {
    title: 'ITES & BPO (Information Technology Enabled Services & Business Process Outsourcing)',
    shortTitle: 'ITES & BPO',
    summary:
      'Reliable ITES & BPO solutions that cut costs, boost productivity, and enhance customer experiences.',
  },
  {
    title: 'Digital Marketing',
    summary:
      'Grow your brand online through data-driven digital marketing strategies that deliver results.',
  },
]
