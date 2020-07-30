export const formatData = (res, time, kioskId, weekFormat) => {
  const result = {
    weekly: [
      { date: 'Monday' },
      { date: 'Tuesday' },
      { date: 'Wednesday' },
      { date: 'Thursday' },
      { date: 'Friday' },
      { date: 'Saturday' },
      { date: 'Sunday' },
    ],
    daily: [
      { date: '01' },
      { date: '02' },
      { date: '03' },
      { date: '04' },
      { date: '05' },
      { date: '06' },
      { date: '07' },
      { date: '08' },
      { date: '09' },
      { date: '10' },
      { date: '11' },
      { date: '12' },
      { date: '13' },
      { date: '14' },
      { date: '15' },
      { date: '16' },
      { date: '17' },
      { date: '18' },
      { date: '19' },
      { date: '20' },
      { date: '21' },
      { date: '22' },
      { date: '23' },
      { date: '00' },
    ],
  };
  let dataArray = result[time];
  if (time === 'weekly') {
    dataArray = weekFormat;
  }
  res.forEach(elem => {
    const dist = dataArray.find(date => elem.name === date.date);
    if (kioskId) {
      if (!dist.amount) dist.amount = 0;
      dist.amount += elem[kioskId];
    } else {
      Object.keys(elem).forEach(key => {
        if (key !== 'name') dist[key] = elem[key];
      });
    }
  });
  if (time === 'daily') {
    /* eslint-disable */
    dataArray.forEach(elem => elem.date = `${Number(elem.date)}:00`);
    /* eslint-enable */
  }
  return dataArray;
};

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
