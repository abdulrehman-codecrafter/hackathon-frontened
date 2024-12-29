

export function formatDate(isoDateString,detailed) {
    // Convert the string to a JavaScript Date object
    const date = new Date(isoDateString);

    // Define an array of day names
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Define an array of month names
    const monthsOfYear = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    // Extract the day of the week (0-6) and the date
    const dayOfWeek = daysOfWeek[date.getUTCDay()];  // Get day of the week (UTC)
    const day = date.getUTCDate(); // Get the day of the month (UTC)
    const month = monthsOfYear[date.getUTCMonth()]; // Get the full month name
    const year = date.getUTCFullYear(); // Get the full year
    if(detailed==='day'){
    
        return `${dayOfWeek}`;
    }
    if(detailed==='detailed'){
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        return `${day} ${month}, ${year}`;
    }

    // Format the result as "Day, Date Month Year"
    return `${dayOfWeek}, ${day} ${month} ${year}`;
}
