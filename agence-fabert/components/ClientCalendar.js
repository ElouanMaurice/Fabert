import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function ClientCalendar({ unavailableDates = [] }) {
  const disabledDays = unavailableDates.map(date => new Date(date));

  return (
    <DayPicker
      mode="single"
      disabled={disabledDays}
      selected={null}
    />
  );
}
