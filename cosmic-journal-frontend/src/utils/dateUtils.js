export function formatDateForInput(date) {
  return new Date(date).toISOString().split('T')[0];
}

export function formatDateForDisplay(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}