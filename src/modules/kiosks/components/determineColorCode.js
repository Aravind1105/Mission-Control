import moment from "moment";
const labelColor = {
  BLACK: '#333333',
  RED: '#EB5757',
  GREEN: '#7DB040',
};
const determineColorCode = function(doorStatus, session) {
  let color = labelColor.BLACK;
  if (!session || !session._id) {
    if (doorStatus === 'closed') {
      color = labelColor.GREEN;
    } else if (doorStatus === 'open') {
      color = labelColor.RED;
    }
    return color;
  }
  const now = moment(new Date())
  const created = moment(session.created)
  const duration = Math.floor(moment.duration(now.diff(created)).asMinutes())
  if (session.type === 'refill') {
    if (duration < 40 && doorStatus === 'open') {
      color = labelColor.GREEN;
    } else {
      color = labelColor.RED;
    }
  } else if (session.type === 'purchase' || session.type === 'terminal_purchase') {
    if (duration < 5 && doorStatus === 'open') {
      color = labelColor.GREEN;
    } else {
      color = labelColor.RED;
    }
  }
  return color;
};

export default determineColorCode;
