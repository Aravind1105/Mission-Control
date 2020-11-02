import { chain, find as lsFind } from 'lodash';
import { getDay, getDate, getHours, subHours } from 'date-fns';

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const determineKey = (time, date) => {
  if (time === 'last7Days' || time === 'weekDays') {
    return days[getDay(new Date(date))];
  } else if (time === 'monthly' || time === 'last30Days') {
    return getDate(new Date(date));
  } else {
    return date;
  }
}

export const computeAndFormatData = (time, data, kioskId) => {
  let formattedData = [];
  const kioskNames = [];
  if (data) {
    let filteredData = data;
    if (kioskId) {
      filteredData = data.filter(ele => ele._id.kiosk._id === kioskId);
    }
    filteredData.forEach(ele => {
      if (!kioskNames.includes(ele._id.kiosk.name)) {
        kioskNames.push(ele._id.kiosk.name);
      }
    });
    if (time === 'last7Days' || time === 'weekDays' || time === 'monthly' || time === 'last30Days') {
      const groupedByDate = chain(filteredData).groupBy("_id.date").value();
      const sortedDates = Object.keys(groupedByDate)
        .sort((firstDate, secondDate) => new Date(firstDate) - new Date(secondDate));
      formattedData = sortedDates.map(dateEle => {
        const obj = groupedByDate[dateEle].reduce((prev, statsEle) => {
          return {
            ...prev,
            [statsEle._id.kiosk.name]: statsEle.amount.toFixed(2),
          };
        }, {});
        return {
          date: determineKey(time, dateEle),
          ...obj,
        }
      });
    } else if (time === 'hourly' || time === 'last24Hours') {
      filteredData = filteredData.map(ele => {
        return {
          ...ele,
          hour: getHours(new Date(ele._id.date))
        }
      });
      const groupedByHour = chain(filteredData).groupBy("hour").value();
      formattedData = Object.keys(groupedByHour).map(dateEle => {
        const obj = groupedByHour[dateEle].reduce((prev, statsEle) => {
          return {
            ...prev,
            [statsEle._id.kiosk.name]: statsEle.amount.toFixed(2),
          };
        }, {});
        return {
          date: determineKey(time, dateEle),
          ...obj,
        }
      });
      if (time === 'hourly') {
        const hourlyData = [];
        for (let hrs = 0; hrs <= getHours(new Date()); hrs++) {
          let hourObj = { date: ('0' + hrs).slice(-2) };
          const foundElements = lsFind(formattedData, ele => ele.date === hrs.toString());
          if (foundElements) {
            hourObj = { ...foundElements, ...hourObj };
          }
          hourlyData.push(hourObj);
        }
        formattedData = hourlyData;
      } else if (time === 'last24Hours') {
        const hourlyData = [];
        let count = 0;
        for (let hrs = getHours(subHours(new Date(), 24)); ; hrs--) {
          if (count === 24) break;
          const hour = Math.abs(hrs);
          let hourObj = { date: ('0' + hour).slice(-2) };
          const foundElements = lsFind(formattedData, ele => ele.date === hour.toString());
          if (foundElements) {
            hourObj = { ...foundElements, ...hourObj };
          }
          hourlyData.push(hourObj);
          count++;
        }
        formattedData = hourlyData.reverse();
      }
    }
  }
  console.log(formattedData);
  return {
    kioskNames,
    formattedData,
  };
};
