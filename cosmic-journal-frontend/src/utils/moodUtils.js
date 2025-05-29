export const moodOptions = [
  { value: 'reflective', label: 'Reflective' },
  { value: 'joyful', label: 'Joyful' },
  { value: 'calm', label: 'Calm' },
  { value: 'excited', label: 'Excited' },
];

export function getMoodLabel(value) {
  const mood = moodOptions.find((m) => m.value === value);
  return mood ? mood.label : 'Unknown';
}