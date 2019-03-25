import { cond, always, equals, map } from 'ramda';

const createIconCond = condition => [
  equals(condition[0]),
  always(condition[1]),
];

export const conditionalIcon = conditions =>
  cond(map(createIconCond, conditions));

export const valueEquals = compareWith => equals(compareWith);
