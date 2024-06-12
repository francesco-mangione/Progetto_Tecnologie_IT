export function generateTimes() {
    const startHour = 9;
    const startMinute = 0;
    const times = [];
    const endHour = 20; 
  
    for (let i = 0; i < 30; i++) {
      // Calcola l'ora e il minuto
      let hour = startHour + Math.floor((startMinute + (i * 40)) / 60);
      let minute = (startMinute + (i * 40)) % 60;
  
      // Interrompi la generazione degli orari se si supera l'orario di fine
      if (hour >= endHour) {
          break;
        }
  
      // Salta gli orari specifici all'interno dell'intervallo
      if (!((hour === 13 && minute === 40) || (hour === 14 && minute === 20))) {
        // Formatta l'ora e il minuto aggiungendo lo zero davanti se necessario
        const formattedHour = hour < 10 ? `0${hour}` : hour;
        const formattedMinute = minute < 10 ? `0${minute}` : minute;
  
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
  
    return times;
  }
  