// components/CustomCalendar.jsx
"use client"; // Important pour Next.js 13+

import React, { useState } from "react";
import styles from "../styles/AdminCalendar.module.css";

const DAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export default function AdminCalendar({ initialSelectedDates = [], onChange }) {
  const today = new Date();
  const [selectedDates, setSelectedDates] = useState(
    initialSelectedDates.map((d) => new Date(d).toDateString())
  );

  const monthsToShow = 6; // mois courant + 5 suivants

  const toggleDate = (date) => {
    const dateStr = date.toDateString();
    let newSelected;
    if (selectedDates.includes(dateStr)) {
      newSelected = selectedDates.filter((d) => d !== dateStr);
    } else {
      newSelected = [...selectedDates, dateStr];
    }
    setSelectedDates(newSelected);
    onChange?.(newSelected); // callback pour envoyer les dates sélectionnées
  };

  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weeks = [];
    let week = new Array(7).fill(null);

    // Remplissage des premiers jours
    for (let i = 0; i < firstDay; i++) week[i] = null;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      week[dayOfWeek] = date;

      if (dayOfWeek === 6 || day === daysInMonth) {
        weeks.push(week);
        week = new Array(7).fill(null);
      }
    }

    return weeks;
  };

  const getMonths = () => {
    const months = [];
    for (let i = 0; i < monthsToShow; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      months.push({ month: date.getMonth(), year: date.getFullYear() });
    }
    return months;
  };

  return (
    <div className={styles.calendarContainer}>
      {getMonths().map(({ month, year }) => (
        <div key={`${month}-${year}`} className={styles.monthContainer}>
          <h4>{new Date(year, month).toLocaleString("fr-FR", { month: "long", year: "numeric" })}</h4>
          <div className={styles.weekDays}>
            {DAYS.map((d) => (
              <div key={d} className={styles.dayName}>{d}</div>
            ))}
          </div>
          {generateCalendar(year, month).map((week, i) => (
            <div key={i} className={styles.week}>
              {week.map((date, j) => {
                const isToday = date && date.toDateString() === today.toDateString();
                const isSelected = date && selectedDates.includes(date.toDateString());
                return (
                  <div
                    key={j}
                    className={`${styles.day} ${isToday ? styles.today : ""} ${isSelected ? styles.selected : ""}`}
                    onClick={() => date && toggleDate(date)}
                  >
                    {date ? date.getDate() : ""}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
