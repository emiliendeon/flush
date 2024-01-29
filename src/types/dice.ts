export const DiceValues = [0, 1, 2, 3, 4, 5] as const;
export type DiceValue = (typeof DiceValues)[number];

export type DiceHand = DiceValue[];
