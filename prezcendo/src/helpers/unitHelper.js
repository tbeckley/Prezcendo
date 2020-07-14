export const toTimeNotation = t => `${String(Math.floor(t/60)).padStart(2, '0')}:${String(Math.floor(t%60)).padStart(2, '0')}`;
