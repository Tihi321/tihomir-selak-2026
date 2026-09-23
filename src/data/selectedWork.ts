export const selectedWork = [
  {
    id: 'delivery',
    theme: 'Leadership and delivery',
    title: 'Delivery leadership across a connected product suite',
    summary:
      'I own incoming work, triage, complex debugging, technical direction, code review, and delivery health across frontend, desktop, services, networking, packaging, testing, and CI/CD.',
    detail:
      'I lead two engineers today and have supported up to five engineers, with formal performance responsibility and regular one-to-ones. I keep decisions close to the work and make space for engineers to shape how it is done.',
    route: ['Intake', 'Decisions', 'Delivery'],
  },
  {
    id: 'foundations',
    theme: 'Shared foundations',
    title: 'A steadier foundation for frontend teams',
    summary:
      'I started and stewarded a reusable React and TypeScript component library, and introduced selector-based state patterns across frontend work.',
    detail:
      'Shared building blocks support maintainability and consistency, making it easier to reason about interfaces and evolve a connected product suite.',
    route: ['Patterns', 'Components', 'Consistency'],
  },
  {
    id: 'systems',
    theme: 'Tools for real-time systems',
    title: 'Making distributed tools easier to understand',
    summary:
      'My systems work spans Rust services and Tauri tools, Python services, automated documentation, device simulators, and a ZeroMQ Explorer.',
    detail:
      'Across diagnostics, service orchestration, network discovery, testing, and packaging, the aim is to make complex systems understandable when people are working under time pressure.',
    route: ['Signals', 'Services', 'Diagnostics'],
  },
] as const;
