import React, { createContext, useState, useContext } from "react";

const TicketsFilterContext = createContext();

export const TicketsFilterProvider = ({ children }) => {
  const [ticketFilter, setTicketFilter] = useState("open"); // open, pending, closed, search
  const [ticketSubFilter, setTicketSubFilter] = useState("open"); // open, pending (sub-filtro dentro de "open")
  const [searchParam, setSearchParam] = useState("");

  return (
    <TicketsFilterContext.Provider
      value={{
        ticketFilter,
        setTicketFilter,
        ticketSubFilter,
        setTicketSubFilter,
        searchParam,
        setSearchParam,
      }}
    >
      {children}
    </TicketsFilterContext.Provider>
  );
};

export const useTicketsFilter = () => {
  const context = useContext(TicketsFilterContext);
  if (!context) {
    throw new Error("useTicketsFilter must be used within a TicketsFilterProvider");
  }
  return context;
};

export default TicketsFilterContext;
