import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function CalendrierDispo({ availability, setAvailability }) {
  // availability est un tableau de dates (strings ISO) sélectionnées

  // On convertit les strings en objets Date pour DayPicker
  const selectedDays = availability.map(dateStr => new Date(dateStr));

  // Quand on clique sur un jour, on l’ajoute ou retire de la liste
  const handleDayClick = (day) => {
    const dayStr = day.toISOString().split("T")[0]; // format 'YYYY-MM-DD'

    if (availability.includes(dayStr)) {
      // retire le jour si déjà sélectionné
      setAvailability(availability.filter(d => d !== dayStr));
    } else {
      // ajoute le jour
      setAvailability([...availability, dayStr]);
    }
  };

  return (
    <div>
      <p>Sélectionnez les jours disponibles :</p>
      <DayPicker
        mode="multiple"
        selected={selectedDays}
        onSelect={(days) => {
          // days est un tableau de Date ou undefined
          if (!days) return;
          // transforme en string ISO sans heure
          const dayStrs = days.map(d => d.toISOString().split("T")[0]);
          setAvailability(dayStrs);
        }}
        onDayClick={handleDayClick}
      />
    </div>
  );
}
