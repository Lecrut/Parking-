export function mapDate(time: Date) {
    return time
        ? time.getHours() + ':' + (time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes()) + ' ' +  ((time.getDate() + 1) > 9 ? '' : '0') + (time.getDate() + 1) + '.'+ ((time.getMonth() + 1) > 9 ? '' : '0') + (time.getMonth() + 1) + '.' + time.getFullYear()
        : ' '
}