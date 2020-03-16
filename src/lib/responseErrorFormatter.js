import get from 'lodash/get';

export default respData => {
  const arr = get(respData, 'message.message', []);
  if (!Array.isArray(arr)) return null;
  return arr.reduce((prev, curr) => {
    const msg = Object.keys(curr.constraints).map(key => curr.constraints[key]);
    return prev
      ? Object.assign(prev, { [curr.property]: msg.join(', ') })
      : { [curr.property]: msg.join(', ') };
  }, null);
};
