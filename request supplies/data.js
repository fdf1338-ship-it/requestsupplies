export function formatDate(date) {

    if (!date) return "";
  
    try {
  
      const d =
        date.toDate
          ? date.toDate()
          : new Date(date);
  
      return d.toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      );
  
    } catch {
  
      return "";
  
    }
  
  }
  
  export function formatDateTime(date) {
  
    if (!date) return "";
  
    try {
  
      const d =
        date.toDate
          ? date.toDate()
          : new Date(date);
  
      return d.toLocaleString();
  
    } catch {
  
      return "";
  
    }
  
  }
  
  export function today() {
  
    return new Date()
      .toISOString()
      .split("T")[0];
  
  }
  
  export function isPast(date) {
  
    return new Date(date) < new Date();
  
  }
  
  export function daysUntil(date) {
  
    const diff =
      new Date(date) - new Date();
  
    return Math.ceil(
      diff / (1000 * 60 * 60 * 24)
    );
  
  }