import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './Calendar.css'

function CustomCalendar() {
    const [date, setDate] = useState(new Date())

    const onChange = (newDate) => {
        setDate(newDate)
    }

    return (
        <div className="calendar-container">
            <Calendar
                onChange={onChange}
                value={date}
                className="custom-calendar"
                tileClassName="calendar-tile"
            />
            {/* Calendar styles */}
        </div>
    )
}

export default CustomCalendar