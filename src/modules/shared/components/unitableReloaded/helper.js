import { cond, always, equals, map } from 'ramda';

const createValueCond = condition => [
  equals(condition[0]),
  always(condition[1]),
];

export const conditionalValue = conditions =>
  cond(map(createValueCond, conditions));

export const valueEquals = compareWith => equals(compareWith);
