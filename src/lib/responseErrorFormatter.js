import get from 'lodash/get';

export default respData =>
  get(respData, 'message.message', []).reduce((prev, curr) => {
    const msg = Object.keys(curr.constraints).map(key => curr.constraints[key]);
    return prev
      ? Object.assign(prev, { [curr.property]: msg.join(', ') })
      : { [curr.property]: msg.join(', ') };
  }, null);
