export const getHeureMinutes = () => {
  const date = new Date()
  const hour = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hour}h${minutes}`
}