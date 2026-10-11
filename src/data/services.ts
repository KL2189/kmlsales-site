export const services = [
  {
    slug: 'process-map',
    tag: 'Start here',
    name: 'Sales process map',
    short: 'A written map of how your team works a lead, plus a ranked list of what to automate first.',
    problem: 'Before you buy another AI tool, write down how your reps actually work a lead.',
    outcomes: [
      'Every routing and qualification rule written as a decision tree',
      'A ranked build list that starts with tools you already pay for',
      'A decision on each step about whether software or a rep owns it',
      'Documents your team keeps, whether or not we build anything together',
    ],
    how: 'Built from interviews and time shadowing your reps. Scoped and priced after the first call.',
  },
  {
    slug: 'automation-build',
    tag: 'Then',
    name: 'Automation build',
    short: 'The map, built into the CRM and sequencer your reps already use.',
    problem: 'Your reps still copy account details between tabs. That work belongs to software.',
    outcomes: [
      'Research and activity logging that happen without a rep touching them',
      'AI drafts a rep reviews only where a mistake would cost a deal',
      'Custom tools, like Chrome extensions, when nothing on the market fits',
      'Written docs and an owner on your team for every build',
    ],
    how: 'Scoped one workflow at a time.',
  },
  {
    slug: 'outbound-system',
    tag: 'Or',
    name: 'Outbound build',
    short: 'For teams starting SDR from scratch, or rebuilding one that stopped booking meetings.',
    problem: 'Your reps stay busy, and meetings stay flat.',
    outcomes: [
      'Territories and sequences each rep can actually work',
      'Clear rules for when an SDR passes a meeting to an AE',
      'One weekly report that shows which number to fix',
      'The playbook, live in your tools when we hand it over',
    ],
    how: 'Built with your team in short sprints.',
  },
  {
    slug: 'sdr-coaching',
    tag: 'Ongoing',
    name: 'SDR leader coaching',
    short: 'For new SDR managers carrying a team and a number.',
    problem: 'You got promoted for hitting quota, and now you own a team’s number.',
    outcomes: [
      'Hiring scorecards and a ramp plan for new reps',
      'Weekly call and email reviews against your team’s numbers',
      'A written standard for performance conversations',
      'A sounding board who runs the same job today',
    ],
    how: 'Recurring 1:1s plus async review of calls and dashboards.',
  },
];

export const alternatives = [
  { name: 'Buy an AI SDR tool', why: 'It runs whatever steps you give it, including the wrong ones. Reps work around it, and it gets cut at renewal.' },
  { name: 'Hire a consultancy', why: 'You get a slide deck. Your team still has to build everything in it.' },
];
