// Date formatter
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
};

// Currency formatter
export const formatCurrency = (amount) => {
  if (!amount) return '';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};