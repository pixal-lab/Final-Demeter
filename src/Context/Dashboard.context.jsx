import { createContext, useContext, useState, useEffect } from "react";
import {
  getSaleByTimepc,
  getSaleByuserpc

} from "../Api/Dashboard.request";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "Ha ocurrido un error con el uso del contexto del dashboard"
    );
  }

  return context;
};

export function DashboardProvider({ children }) {
  const [salesChart, setsalesChart] = useState([]);
  const [salesuserChart, setsalesuserChart] = useState([]);


  

  const fetchSales= async () => {
    try {
      const res = await getSaleByTimepc();
      setsalesChart(res.data)
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSalesusers= async () => {
    try {
      const res = await getSaleByuserpc();
      setsalesuserChart(res.data)
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <DashboardContext.Provider
      value={{
        salesChart,
        fetchSales,
        fetchSalesusers,
        salesuserChart

      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
