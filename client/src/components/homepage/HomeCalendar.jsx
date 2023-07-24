import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import PageConnectionWait from "../UI/PageConnectionWait";
import trLocale from "@fullcalendar/core/locales/tr";
import { useGetOrdersQuery } from "../../redux/apis/orderApi";

const HomeCalendar = () => {
  const { data: orders, isLoading, isFetching } = useGetOrdersQuery();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!orders)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const eventData = orders?.map((item) => {
    return {
      id: item.id,
      title:
        `${item.customerName} ${item.customerSurname}` +
        " - " +
        `${item.type} - ${item.price.toFixed(2)} TL`,
      start: item.date,
      backgroundColor: "#ba68c8",
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
    />
  );
};

export default HomeCalendar;
