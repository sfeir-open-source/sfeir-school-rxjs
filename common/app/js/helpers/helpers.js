const hourTimeFormat = new Intl.DateTimeFormat('default', {
  hour12: false,
  hour: 'numeric',
  minute: 'numeric'
});

// Export time to format hh:mm
export const getHourTime = () => {
  return hourTimeFormat.format(new Date());
};
