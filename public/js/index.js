import { scheduledAppointmentsByDate, availableHoursByDate, renderTable } from "./utils.js"

//fetch all appointments from API
export const getAppointments = async () => {
    const response = await fetch("/appointments", {method: "GET"})
    const appointments = await response.json()
    return appointments
}
//render scheduled appointments with date selector
const dateSelector = document.querySelector("#dateSelector")
dateSelector.addEventListener("change", async (e) => {
    const selectedDate = dateSelector.value
    const appointments = await getAppointments()
    const appointmentsForSelectedDate = scheduledAppointmentsByDate(appointments, selectedDate)
    tableHeader.innerHTML = selectedDate
    renderTable(appointmentsForSelectedDate)
})

//initialize calendar and table header with current date
const tableHeader = document.querySelector("#selectedDateHeader");
(async () => {
    const currentDate = new Date().toISOString().slice(0,10)
    dateSelector.value = currentDate
    const appointments = await getAppointments()
    const appointmentsForCurrentDate = scheduledAppointmentsByDate(appointments, currentDate)
    renderTable(appointmentsForCurrentDate)
    tableHeader.innerHTML = new Date(currentDate).toUTCString().slice(0,16)
})();



//populate new appointment form with current date and available hours
const btnNewAppointment = document.querySelector("#btnNewAppointment")
const dateModalForm = document.querySelector("#date")
const availableHoursInput = document.querySelector("#startTime")
btnNewAppointment.addEventListener("click", async () => {
    const selectedDate = dateSelector.value
    dateModalForm.value = selectedDate
    const appointments = await getAppointments()
    const appointmentsForSelectedDate = scheduledAppointmentsByDate(appointments, selectedDate)

    const availableHours = availableHoursByDate(appointmentsForSelectedDate)
    availableHoursInput.innerHTML = ``
    availableHours.forEach(h => {
        availableHoursInput.innerHTML += `<option value="${h}">${h}</option>`
    })
})

const endTimeInput = document.querySelector("endTime")

availableHoursInput.addEventListener("change", (e) => {
    const startTime = e.target.value
    const startTimeDate = new Date(startTime)
    console.log(startTime)

})

//send new appointment data to server as POST request
const newAppointmentForm = document.querySelector("#newAppointmentForm")
newAppointmentForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const body = Object.fromEntries(formData)
    const response = await fetch("/appointments", {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if (response.status == 200){
        Swal.fire({
            icon: 'success',
            title: 'Created',
            text: 'Appointment created succesfully.',
            showCancelButton: false,
            confirmButtonText: 'Ok',
          }).then(() => {
              $("#createFormModal").modal()
              window.location.reload()
          })
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something has gone wrong. Please try again.',
            showCancelButton: false,
            confirmButtonText: 'Ok',
          }).then(() => {
          })
    }
})

// const editAppointment = (e) => {
//     const id = e.target.getAttribute("data-id")
//     // const body = datos del formulario
//     console.log(id)
//     // const response = await fetch(`/appointments?id=${id}`, {method: "PUT", body: body} )

// }




