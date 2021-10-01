import { getAppointments } from "./index.js"
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
const requestEdit = async (e) => {
    const id = e.target.getAttribute("data-id")
    const response = await fetch(`/appointments?id=${id}`, {method: "GET"} )
    const appointmentData = await response.json()
    const {name, email, date, startTime} = appointmentData
    console.log(appointmentData)

    //fill modal update form with appointment data
    const updateFormInputs = [...document.querySelectorAll("#updateAppointmentForm input")]
    updateFormInputs[0].value = appointmentData.name
    updateFormInputs[1].value = appointmentData.email
    updateFormInputs[2].value = appointmentData.date

    //fill select options with available hours for a day
    const appointments = await getAppointments()
    const appointmentsForSelectedDate = scheduledAppointmentsByDate(appointments, date)
    const availableHours = availableHoursByDate(appointmentsForSelectedDate) //todo: wrap this in a function
    const updatehourSelect = document.querySelector("#updateAppointmentForm select")
    updatehourSelect.innerHTML = ""
    console.log(availableHours)
    availableHours.forEach(h => {
        updatehourSelect.innerHTML += `<option value="${h}">${h}</option>`
    })

    //set the modal form property that will make the put request
    document.querySelector("#updateAppointmentForm").addEventListener("submit", async (e) => {
        console.log(id)
        e.preventDefault()
        const formData = new FormData(e.target)
        const body = Object.fromEntries(formData)
        body.id = id
        const response = await fetch(`/appointments?id=${id}`, {
            method: "PUT", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if (response.status == 200){
            Swal.fire({
                icon: 'success',
                title: 'Update',
                text: 'Appointment updated succesfully.',
                showCancelButton: false,
                confirmButtonText: 'Ok',
              })
              .then(() => {window.location.reload()})
            }
        });

    //trigger modal
    const $updateFormModal = $("#updateFormModal")
    $updateFormModal.modal()

}

const requestDelete = (e) => {
    const id = e.target.getAttribute("data-id")
    Swal.fire({
        icon: 'warning',
        title: 'Confirmation',
        text: '¿Are you sure you want to delete this appointment?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
      }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await fetch(`/appointments?id=${id})`, {method: "DELETE"})
            if (response.status == 200) {
                Swal.fire('Deleted succesfully!', '', 'success').then(() => {
                    window.location.reload()
                })
            }
        }
        })
    }

      


//find scheduled appointments for a given day from all the appointments
export const scheduledAppointmentsByDate = (appointments, date) => {
    const dailyUnsortedAppointments = appointments.filter(a => a.date == date)
    const dailySortedAppointments = dailyUnsortedAppointments.sort((a, b) => {
        if (a.startTime > b.startTime){
            return 1
        }
        else{
            return -1
        }
    })
    console.log(dailySortedAppointments)
    return dailySortedAppointments
}

//return available hours for a given day as an array
export const availableHoursByDate = (scheduledAppointmentsForADay) => {
    const scheduledHours = scheduledAppointmentsForADay.map(e => e.startTime)
    const availableHours = officeHours.filter(h => !(scheduledHours.includes(h)))
    return availableHours
}

export const renderTable = (dailyAppointments) => {
    const tableBody = document.querySelector("#scheduledHoursTable tbody")
    tableBody.innerHTML = ""
    tableBody.innerHTML += `
    <thead>
    <tr>
      <th>Time</th>
      <th>Name</th>
      <th>Email</th>
      <th></th>
      <th></th>
    </tr>
    </thead>
    `
    dailyAppointments.forEach(({startTime, endTime, name, email, id}) => {
        tableBody.innerHTML += `
        <tr class="align-items-center">
          <th scope="row">${startTime} - ${endTime}</th>
          <td>${name}</td>
          <td>${email}</td>
          <td><button class="btn btn-warning" data-id="${id}">Edit</button></td>
          <td><button class="btn btn-danger" data-id="${id}">Delete</button></td>
        </tr>
        `
    });

    [...document.querySelectorAll(".btn-warning")].forEach(b => {
        b.addEventListener("click", requestEdit)
    });
    [...document.querySelectorAll(".btn-danger")].forEach(b => {
        b.addEventListener("click", requestDelete)
    })
}


// module.exports = {scheduledAppointmentsByDate, availableHoursByDate, renderTable}