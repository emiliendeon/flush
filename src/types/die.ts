export const DieValues = [0, 1, 2, 3, 4, 5] as const;
export type DieValue = (typeof DieValues)[number];

export type DiceHand = DieValue[];
