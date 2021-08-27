import React from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
export default function AllSales() {
    return (
        <div className="all-sales">
            <FullCalendar
                plugins = {[ dayGridPlugin,interactionPlugin]}
                initialView = "dayGridMonth"
                events = {[
                    { title: 'event 1', date: '2019-04-01' },
                    { title: 'event 2', date: '2019-04-02' }
                  ]}
            />
        </div>
    )
}
