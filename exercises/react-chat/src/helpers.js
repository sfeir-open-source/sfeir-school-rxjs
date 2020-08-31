const hourTimeFormat = new Intl.DateTimeFormat('default', {hour24: true, hour: "numeric", minute: "numeric"});
export const getHourTime = () => {
 return hourTimeFormat.format(new Date())
}