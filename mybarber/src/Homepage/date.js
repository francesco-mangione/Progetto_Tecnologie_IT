export function generateDates() {
    // Ottieni la data corrente
    const currentDate = new Date();
  
    // Inizializza un array per memorizzare le date successive
    const dates = [];
  
    for (let i = 0; i < 20; i++) {
      // Aggiungi un giorno alla data corrente
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      
      // Formatta la data nel formato desiderato (ddd DD MMM)
      const formattedDate = `${formatDay(nextDate.getDay())} ${nextDate.getDate()} ${formatMonth(nextDate.getMonth())}`;
      
      dates.push(formattedDate);
    }
  
    return dates;
  }
  
  // Funzione per il giorno della settimana
  function formatDay(day) {
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    return daysOfWeek[day];
  }
  
  // Funzione per il mese
  function formatMonth(month) {
    const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
    return months[month];
  }
  