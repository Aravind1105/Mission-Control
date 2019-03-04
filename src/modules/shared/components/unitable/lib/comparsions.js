import { equals, gt, lte } from 'ramda';

export const compare = operation => val1 => {
  if (operation === 'contain') {
    return val2 => val2.includes(val1);
  }
  if (operation === 'equal') {
    return equals(val1);
  }
  if (operation === 'greater') {
    return lte(val1);
  }
  if (operation === 'lower') {
    return gt(val1);
  }
};
