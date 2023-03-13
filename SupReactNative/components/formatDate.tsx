export function formatDate(dateString: string) {
    const year = parseInt(dateString.substring(0, 4));
    const month = parseInt(dateString.substring(5, 7));
    const day = parseInt(dateString.substring(8, 10));
    const hour = parseInt(dateString.substring(11, 13));
    const minute = parseInt(dateString.substring(14, 16));
  
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute));
  
    const formattedDate = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  
    return formattedDate;
}