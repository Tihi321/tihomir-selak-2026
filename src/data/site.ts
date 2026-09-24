export const site = {
  name: 'Tihomir Selak',
  title: 'Engineering leadership for software that has to work live',
  description:
    'Tihomir Selak is a Development Team Lead and Senior Software Engineer building software for real-time augmented reality and virtual production.',
  url: 'https://tihomir-selak.from.hr',
  email: 'tihomir.selak@outlook.com',
  location: 'Augsburg, Germany · Greater Munich area',
  linkedin: 'https://www.linkedin.com/in/selaktihomir/',
  github: 'https://github.com/Tihi321',
} as const;

export const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: 'Development Team Lead and Senior Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'TrackMen GmbH',
  },
  sameAs: [site.linkedin, site.github],
};
