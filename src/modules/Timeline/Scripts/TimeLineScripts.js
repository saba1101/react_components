export const CommonTimeline = {
    _GenerateWeekAndTimes : () => {
        const days = [];
        const currentTime = new Date();
        const startTime = new Date(currentTime);
        startTime.setHours(0, 0, 0, 0);
        
        const endTime = new Date(currentTime);
        endTime.setDate(endTime.getDate() + 7);
        endTime.setHours(23, 59, 59, 999);
        
        while (startTime <= endTime) {
          const dayObject = {
            weekday: startTime.toLocaleDateString([], { weekday: 'long' }),
            date: startTime.toLocaleDateString(),
            today: startTime.toDateString() === currentTime.toDateString(),
            times: []
          };
        
          const dayEndTime = new Date(startTime);
          dayEndTime.setHours(23, 59, 59, 999);
        
          let currentTimeSlot = new Date(startTime);
          while (currentTimeSlot <= dayEndTime) {
            const formattedTime = currentTimeSlot.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });
        
            dayObject.times.push({
              time: formattedTime,
              timestamp: currentTimeSlot.getTime()
            });
        
            currentTimeSlot.setHours(currentTimeSlot.getHours() + 1);
          }
        
          days.push(dayObject);
        
          startTime.setDate(startTime.getDate() + 1);
        }
        
        const firstDay = days[0];
        const lastDay = days[days.length - 1];
        if (firstDay && lastDay && firstDay.weekday === lastDay.weekday) {
          days.pop();
        }
        
        return days;        
    },

    _CountTimeGap : (arr, startTime, endTime) => {
        let count = 0;
        let objectsBetween = []
        let foundStart = false;
        
        for (let obj of arr) {
            if (obj.time === startTime) {
            foundStart = true;
            }
            if (foundStart) {
            count++;
                if(obj.time !== startTime) objectsBetween.push(obj)
            }
            if (obj.time === endTime) {
            break;
            }
        }
        return {count:count,objectsBetween:objectsBetween};
    }
}