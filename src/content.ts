/**
 * Everything the restaurant would edit lives here.
 *
 * Deliberately no prices or stock: those belong to the SOBOS menu, which the
 * ordering page loads live. Copying them here would drift the first time the
 * menu changes. Placeholder details (phone, address) are marked TODO.
 */

export const restaurant = {
  name: 'Malli Tiffin House',
  /** The name as painted on the signboard, one entry per line. */
  signboard: ['Malli', 'Tiffin House'],
  area: 'Basavanagudi, Bengaluru',
  since: 1987,
  intro:
    'Idli, dose and filter coffee from 6:30 in the morning. Full meals on a banana leaf at lunch. Same family, same grinder, same corner.',
  // TODO: real address and phone before this goes live.
  address: ['14, DVG Road', 'Basavanagudi', 'Bengaluru 560004'],
  phoneDisplay: '+91 80 0000 0000',
  phoneHref: 'tel:+918000000000',
} as const;

export const dishes: ReadonlyArray<{ name: string; note: string }> = [
  { name: 'Thatte idli', note: 'Plate-sized, steamed on cloth, with coconut chutney and sambar.' },
  { name: 'Benne masala dose', note: 'Crisp outside, red chutney inside, a spoon of white butter on top.' },
  { name: 'Kesari bath', note: 'Semolina, ghee and saffron. Most people order it with khara bath.' },
  { name: 'Bisi bele bath', note: 'Rice, lentils and our own spice powder, served hot with boondi.' },
  { name: 'Meals on a leaf', note: 'Lunch only. Rice, sambar, rasam, two palyas, curd and payasa.' },
  { name: 'Filter coffee', note: 'Decoction brewed through the morning, served in a steel tumbler and dabara.' },
];

export const hours: ReadonlyArray<{ label: string; time: string }> = [
  { label: 'Tiffin', time: '6:30 am to 11:00 am' },
  { label: 'Meals', time: '12:00 pm to 3:30 pm' },
  { label: 'Evening tiffin', time: '5:00 pm to 9:30 pm' },
];

export const hoursNote = 'Open every day except Tuesday.';
