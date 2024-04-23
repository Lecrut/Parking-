export function mapDate(time: Date) {
  return time
    ? `${time.getHours()}:${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()} ${(time.getDate()) > 9 ? '' : '0'}${time.getDate()}.${(time.getMonth() + 1) > 9 ? '' : '0'}${time.getMonth() + 1}.${time.getFullYear()}`
    : ' '
}
