export const services = [
  {
    slug: 'process-map',
    tag: 'Start here',
    name: 'Workflow map\u00a0+\u00a0build',
    short: 'One workflow your team runs every day, mapped and built into your CRM and sequencing tools.',
    problem: 'A demo request comes in, and the next step depends on someone remembering to act. Decide who acts, then build it so it happens every time.',
    outcomes: [
      'A process map with decision rules and a person responsible for each step',
      'The workflow built in your CRM and sequencing tools, with rules for when a rep reviews the work',
      'Failure handling that names who fixes a problem and where work resumes',
      'Acceptance tests and a walkthrough with whoever owns it next',
    ],
    how: 'Built from time watching your reps work. Scoped and priced after the first call.',
  },
  {
    slug: 'automation-build',
    tag: 'Then',
    name: 'AI workflow build',
    short: 'For teams that switched on an AI SDR or research agent and are still waiting on meetings.',
    problem: 'Your AI SDR is live, and reps have gone back to their own habits. Write down the steps it should run, then decide where software acts and where a rep approves.',
    outcomes: [
      'Every step marked automate, assist, or human, based on what a mistake would cost',
      'AI research and first drafts with clear rules for rep review',
      'Custom tools, like Chrome extensions, when nothing on the market fits',
      'Written docs and an owner on your team for every build',
    ],
    how: 'One workflow at a time, so each one works before the next starts.',
  },
  {
    slug: 'outbound-system',
    tag: 'Or',
    name: 'Outbound build',
    short: 'For teams hiring their first SDRs, or rebuilding a motion that stopped booking meetings.',
    problem: 'Your first SDRs are about to start, and the playbook is whatever the founder remembers.',
    outcomes: [
      'Territories and sequences each rep can actually work',
      'Clear rules for passing qualified conversations to an AE',
      'One weekly report that shows which number to fix',
      'The playbook, live in your tools before your reps ramp',
    ],
    how: 'Built with your team in short sprints.',
  },
  {
    slug: 'sales-coaching',
    tag: 'Ongoing',
    name: 'Sales leadership coaching',
    short: 'For a first-time sales leader carrying a team and a number.',
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
