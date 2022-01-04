import React from 'react';
import moment from 'moment';
import determineColorCode from './determineColorCode';
const labelText = {
  NO_SESSION: 'No Session',
  REPLENISHER_LESS_20: 'Replenisher < 20 mins',
  REPLENISHER_LESS_40: 'Replenisher < 40 mins',
  REPLENISHER_GREATER_40: 'Replenisher > 40 mins',
  PURCHASE_LESS_5: 'Purchase < 5 mins',
  PURCHASE_GREATER_5: 'Purchase > 5 mins',
};
const getSpan = function(text, color) {
  const style = { color };
  return <span style={style}>{text}</span>;
};
const CellSessionStatus = ({ doorStatus, session }) => {
  let text = labelText.NO_SESSION;
  const color = determineColorCode(doorStatus, session);
  if (!session || !session._id) {
    return getSpan(text, color);
  }
  const now = moment(new Date());
  const created = moment(session.created);
  const duration = Math.floor(moment.duration(now.diff(created)).asMinutes());
  if (session.type === 'refill') {
    if (duration < 20) {
      text = labelText.REPLENISHER_LESS_20;
    } else if (duration < 40) {
      text = labelText.REPLENISHER_LESS_40;
    } else {
      text = labelText.REPLENISHER_GREATER_40;
    }
  } else if (
    session.type === 'purchase' ||
    session.type === 'member_purchase' ||
    session.type === 'terminal_purchase' ||
    session.type === 'app_purchase'
  ) {
    if (duration < 5) {
      text = labelText.PURCHASE_LESS_5;
    } else {
      text = labelText.PURCHASE_GREATER_5;
    }
  }
  return getSpan(text, color);
};

export default CellSessionStatus;
