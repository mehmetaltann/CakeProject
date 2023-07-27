import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import trLocale from "@fullcalendar/core/locales/tr";


const HomeCalendar = ({ orders }) => {
  const eventData = orders?.map((item) => {
    return {
      id: item.id,
      title:
        `${item.customerName} ${item.customerSurname}` +
        " - " +
        `${item.type} - ${item.price.toFixed(2)} TL`,
      start: item.date,
      description: `${item.type} ${item.price}`,
      allDay: "true",
    };
  });

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "dayGridMonth,dayGridWeek,dayGridYear",
      }}
      contentHeight="auto"
      locales={trLocale}
      locale="tr"
      events={eventData}
      firstDay="1"
      eventColor="secondary"
    />
  );
};

export default HomeCalendar;
