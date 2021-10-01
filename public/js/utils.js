const officeHours = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00"
]

//find scheduled appointments for a given day from all the appointments
export const scheduledAppointmentsByDate = (appointments, date) => {
    return appointments.filter(a => a.date == date)
}

//return available hours for a given day as an array
export const availableHoursByDate = (scheduledAppointmentsForADay) => {
    const scheduledHours = scheduledAppointmentsForADay.map(e => e.startTime)
    const availableHours = officeHours.filter(h => !(scheduledHours.includes(h)))
    return availableHours
}

// module.exports = {scheduledAppointmentsByDate, availableHoursByDate}