export const site = {
  name: 'Tihomir Selak',
  title: 'Development Team Lead and software engineer',
  role: 'Development Team Lead and software engineer. I build real-time systems, developer tools, and the teams that ship them.',
  description:
    'Tihomir Selak is a Development Team Lead and software engineer building real-time systems, developer tools and the teams that ship them.',
  now: 'Development Team Lead at Pixotope, employed by TrackMen GmbH',
  based: 'Augsburg, Germany',
  url: 'https://tihomir-selak.from.hr',
  blog: 'https://blog.tihomir-selak.from.hr',
  email: 'tihomir.selak@outlook.com',
  location: 'Augsburg, Germany',
  linkedin: 'https://www.linkedin.com/in/selaktihomir/',
  github: 'https://github.com/Tihi321',
} as const;

export const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: 'Development Team Lead',
  worksFor: {
    '@type': 'Organization',
    name: 'TrackMen GmbH',
  },
  sameAs: [site.linkedin, site.github, site.blog],
};
