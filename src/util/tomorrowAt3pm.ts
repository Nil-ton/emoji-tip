export function tomorrowAt3pm() {
    const brazilTimezoneOffset = -3;
    const tomorrow = new Date();
    tomorrow.setUTCDate(tomorrow.getDate());
    tomorrow.setUTCHours(15 - brazilTimezoneOffset, 0, 0, 0);
    return tomorrow;
}