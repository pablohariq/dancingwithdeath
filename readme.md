# Dancing With Death
Rest API with client app for scheduling hours to have a dance with Death.

## deployed version
A deployed version of this app is available [here](https://pablohariq-dancing-with-death.herokuapp.com/)

## local installation
1. Download package and install dependencies
```yarn install```

2. Run in terminal:
```yarn start```

## usage
*Select a date using the calendar on the left side
*Create new appointment using the bottom on top of the screen
*When creating a new appointment, only available hours will be shown in the hour selector.
*Appointments can only be made during business days (from monday to friday) and from 9:00 to 18:00 (this is because Death is very picky with their agenda). The app will display an error message if an appointment is tried to be made in fridays or sundays.
*When a date is selected, the appointments scheduled for that date will show on a table in the right side of the screen.
*Scheduled appointments can be edited or deleted using the buttons associated to each one in the table.
