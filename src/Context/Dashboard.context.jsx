import { createContext, useContext, useState, useEffect } from "react";
import {
  getMostPurchasedSuppliesRequest,
  getMostSoldProductsRequest,
  getTotalProfitAndExpensesRequest,
  getOrganizeByDayRequest,
  getOrganizeByWeekRequest,
  getOrganizeByMonthRequest,
  getTotalProfitAndExpensesByPaymentMethodRequest,
  getTotalUnitsPurchasedBySupplyRequest,
  getTotalUnitsSoldByProductRequest,
  getAverageUnitsPerPurchaseRequest,
  getAverageUnitsPerSaleRequest,
  getNetIncomeByProductRequest,
  getNetIncomeBySupplyRequest,
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
  const [mostPurchasedSupplies, setMostPurchasedSupplies] = useState([]);
  const [mostSoldProducts, setMostSoldProducts] = useState([]);
  const [totalProfitAndExpenses, setTotalProfitAndExpenses] = useState({});
  const [organizeByDay, setOrganizeByDay] = useState([]);
  const [organizeByWeek, setOrganizeByWeek] = useState([]);
  const [organizeByMonth, setOrganizeByMonth] = useState([]);
  const [totalProfitAndExpensesByPaymentMethod, setTotalProfitAndExpensesByPaymentMethod] = useState([]);
  const [totalUnitsPurchasedBySupply, setTotalUnitsPurchasedBySupply] = useState([]);
  const [totalUnitsSoldByProduct, setTotalUnitsSoldByProduct] = useState([]);
  const [averageUnitsPerPurchase, setAverageUnitsPerPurchase] = useState([]);
  const [averageUnitsPerSale, setAverageUnitsPerSale] = useState([]);
  const [netIncomeByProduct, setNetIncomeByProduct] = useState([]);
  const [netIncomeBySupply, setNetIncomeBySupply] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const mostPurchased = await getMostPurchasedSuppliesRequest();
      const mostSold = await getMostSoldProductsRequest();
      const totalProfitAndExpensesData = await getTotalProfitAndExpensesRequest();
      const organizeByDayData = await getOrganizeByDayRequest();
      const organizeByWeekData = await getOrganizeByWeekRequest();
      const organizeByMonthData = await getOrganizeByMonthRequest();
      const totalProfitAndExpensesByPaymentMethodData = await getTotalProfitAndExpensesByPaymentMethodRequest();
      const totalUnitsPurchasedBySupplyData = await getTotalUnitsPurchasedBySupplyRequest();
      const totalUnitsSoldByProductData = await getTotalUnitsSoldByProductRequest();
      const averageUnitsPerPurchaseData = await getAverageUnitsPerPurchaseRequest();
      const averageUnitsPerSaleData = await getAverageUnitsPerSaleRequest();
      const netIncomeByProductData = await getNetIncomeByProductRequest();
      const netIncomeBySupplyData = await getNetIncomeBySupplyRequest();

      setMostPurchasedSupplies(mostPurchased.data);
      setMostSoldProducts(mostSold.data);
      setTotalProfitAndExpenses(totalProfitAndExpensesData.data);
      setOrganizeByDay(organizeByDayData.data);
      setOrganizeByWeek(organizeByWeekData.data);
      setOrganizeByMonth(organizeByMonthData.data);
      setTotalProfitAndExpensesByPaymentMethod(totalProfitAndExpensesByPaymentMethodData.data);
      setTotalUnitsPurchasedBySupply(totalUnitsPurchasedBySupplyData.data);
      setTotalUnitsSoldByProduct(totalUnitsSoldByProductData.data);
      setAverageUnitsPerPurchase(averageUnitsPerPurchaseData.data);
      setAverageUnitsPerSale(averageUnitsPerSaleData.data);
      setNetIncomeByProduct(netIncomeByProductData.data);
      setNetIncomeBySupply(netIncomeBySupplyData.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMostPurchasedSupplies = () => mostPurchasedSupplies;
  const getMostSoldProducts = () => mostSoldProducts;
  const getTotalProfitAndExpenses = () => totalProfitAndExpenses;
  const getOrganizeByDay = () => organizeByDay;
  const getOrganizeByWeek = () => organizeByWeek;
  const getOrganizeByMonth = () => organizeByMonth;
  const getTotalProfitAndExpensesByPaymentMethod = () => totalProfitAndExpensesByPaymentMethod;
  const getTotalUnitsPurchasedBySupply = () => totalUnitsPurchasedBySupply;
  const getTotalUnitsSoldByProduct = () => totalUnitsSoldByProduct;
  const getAverageUnitsPerPurchase = () => averageUnitsPerPurchase;
  const getAverageUnitsPerSale = () => averageUnitsPerSale;
  const getNetIncomeByProduct = () => netIncomeByProduct;
  const getNetIncomeBySupply = () => netIncomeBySupply;

  return (
    <DashboardContext.Provider
      value={{
        getMostPurchasedSupplies,
        getMostSoldProducts,
        getTotalProfitAndExpenses,
        getOrganizeByDay,
        getOrganizeByWeek,
        getOrganizeByMonth,
        getTotalProfitAndExpensesByPaymentMethod,
        getTotalUnitsPurchasedBySupply,
        getTotalUnitsSoldByProduct,
        getAverageUnitsPerPurchase,
        getAverageUnitsPerSale,
        getNetIncomeByProduct,
        getNetIncomeBySupply,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
