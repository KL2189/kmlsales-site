export const services = [
  {
    slug: 'process-map',
    tag: 'Start here',
    name: 'GTM workflow map + build plan',
    short: 'A written map of how work moves across marketing and sales, plus a ranked list of what to automate first.',
    problem: 'A form gets filled out, but the next step depends on someone remembering to act. Define what happens and who is responsible.',
    outcomes: [
      'A process map with decision rules and a person responsible for each step',
      'Build specifications with required data and rules for human review',
      'Failure handling that names who resolves the issue and where work resumes',
      'Acceptance checks and an implementation walkthrough with your builder',
    ],
    how: 'Built from interviews and time watching your marketing and sales teams work. Scoped and priced after the first call.',
  },
  {
    slug: 'automation-build',
    tag: 'Separately scoped',
    name: 'Automation build',
    short: 'The map, built into HubSpot or the CRM and marketing tools your team already uses.',
    problem: 'Your team still copies campaign and contact details between tools. Automate the repeatable steps and define what needs human review.',
    outcomes: [
      'Form routing and CRM updates based on agreed rules',
      'AI-assisted research and drafts with clear review requirements',
      'Custom tools, like Chrome extensions, when nothing on the market fits',
      'Written docs and an owner on your team for every build',
    ],
    how: 'Implementation is scoped separately, one workflow at a time.',
  },
  {
    slug: 'outbound-system',
    tag: 'Or',
    name: 'Outbound build',
    short: 'For teams starting outbound from scratch, or rebuilding a motion that stopped booking meetings.',
    problem: 'Your reps stay busy, and meetings stay flat.',
    outcomes: [
      'Territories and sequences each rep can actually work',
      'Clear rules for passing qualified conversations to sales',
      'One weekly report that shows which number to fix',
      'The playbook, live in your tools when we hand it over',
    ],
    how: 'Built with your team in short sprints.',
  },
  {
    slug: 'sales-coaching',
    tag: 'Ongoing',
    name: 'Sales leadership coaching',
    short: 'For sales managers carrying a team and a number.',
    problem: 'You got promoted for hitting quota, and now you own a team’s number.',
    outcomes: [
      'Hiring scorecards and a ramp plan for new reps',
      'Weekly call and email reviews against your team’s numbers',
      'A written standard for performance conversations',
      'A sounding board with hands-on sales leadership experience',
    ],
    how: 'Recurring 1:1s plus async review of calls and dashboards.',
  },
];

export const alternatives = [
  { name: 'Buy another automation tool', why: 'It runs whatever steps you give it, including the wrong ones. Reps work around it, and it gets cut at renewal.' },
  { name: 'Hire a consultancy', why: 'You get a slide deck. Your team still has to build everything in it.' },
];
