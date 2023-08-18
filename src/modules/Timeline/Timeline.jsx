import { useEffect, useState } from "react";
import { CommonTimeline } from "./Scripts/TimeLineScripts.js";
import Card from "antd/es/card/Card.js";
import style from './Styles/Timeline.module.scss'
import MainButton from '@/components/Button/MainButton.jsx'
const TimeLine = () => {
  const [WeekDays, setWeekDays] = useState([]);
  const [Times, setTimes] = useState([]);
  const [TimelineRendered, setTimelineRendered] = useState(true);
  const [ProtoTimeline, setProtoTimeline] = useState([
    {
        weekday: "Sunday",
        from: "01:00 PM",
        to: "08:00 PM",
    },
    {
        weekday: "Friday",
        from: "12:00 AM",
        to: "06:00 PM",
    },
    {
        weekday: "Wednesday",
        from: "05:00 AM",
        to: "10:00 PM",
    },
    {
        weekday: "Thursday",
        from: "01:00 AM",
        to: "03:00 PM",
    },
    {
        weekday: "Thursday",
        from: "04:00 AM",
        to: "02:00 PM",
    },
    {
        weekday: "Saturday",
        from: "03:00 AM",
        to: "12:00 PM",
    },
    {
        weekday: "Monday",
        from: "04:00 AM",
        to: "02:00 PM",
    },

  ]);

  const SetRowCells = (TimesArray, Weekday, From, To) => {
    const TimeGap = CommonTimeline._CountTimeGap(TimesArray, From, To).count;
    const ObjectsBetween = CommonTimeline._CountTimeGap(TimesArray, From, To)
      .objectsBetween;
    const TimeStartElement = document.querySelector(
      `td[data-time='${From}'][data-weekday='${Weekday}']`
    );
    ObjectsBetween.forEach((el) => {
      const GapTimes = document.querySelector(
        `td[data-time='${el.time}'][data-weekday='${Weekday}']`
      );
      GapTimes?.remove(); 
    });

    TimeStartElement?.setAttribute("colSpan", TimeGap);
    TimeStartElement && (TimeStartElement.style.background = "lime");

  };

  const ResetCells = () => {
    const cells = document.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.removeAttribute("colSpan");
      cell.style.background = "initial";
    });
  }

  useEffect(() => {
    setWeekDays(CommonTimeline._GenerateWeekAndTimes());
    setTimes(CommonTimeline._GenerateWeekAndTimes()[0].times);
  }, []);


  useEffect(() => {
    setTimeout(() => {
      ProtoTimeline.forEach((t) => {
        SetRowCells(Times, t.weekday, t.from, t.to);
      });
    }, 0);
  }, [Times, WeekDays, ProtoTimeline]); // Include ProtoTimeline in the dependency array

  return (
    <>
      {TimelineRendered && (
        <table className={style.timeline}>
          <thead>
            <tr>
              <th></th>
              {Times &&
                Times.map((t, index) => (
                  <th key={index}>{t.time}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {WeekDays &&
              WeekDays.map((w, index) => (
                <tr key={index}>
                  <td className={style.weekDays}>{w.weekday}</td>
                  {w.times &&
                    w.times.map((t, ind) => (
                      <td
                        key={ind}
                        data-time={t.time}
                        data-timestamp={t.timestamp}
                        data-weekday={w.weekday}
                      >
                        <div className="template">{t.time}</div>
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TimeLine;
