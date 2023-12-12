import React, { useEffect } from 'react';
import { useDashboard } from '../Context/Dashboard.context';
import { useUser } from '../Context/User.context.jsx';
import { useProduct } from '../Context/Product.context.jsx';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { user, getUsers, toggleUserStatus, deleteUser } = useUser();
  const { product, getProducts, toggleSupplyStatus, getCurrentProduct } = useProduct();
  const { salesChart, fetchSales, fetchSalesusers, salesuserChart } = useDashboard();
  useEffect(() => {
    getUsers();
    getProducts();
    fetchSales();
    fetchSalesusers().then(console.log(salesuserChart));
  }, []);
  // Utiliza los datos de salesChart para el gráfico
  const chartData = salesChart.map((item) => ({
    name: item.saleDate,
    totalSales: item.totalSales,
    totalAmount: parseFloat(item.totalAmount), // Convierte la cantidad a número
  }));

  // Utiliza los datos de salesuserChart para la gráfica de dona
  const pieData = salesuserChart.map((item) => ({
    name: item.userName,
    value: parseFloat(item.totalAmount),
  }));

  const COLORS = ['#ff6600', '#6610f2', '#FFBB28', '#FF8042']; // Puedes cambiar los colores según tus preferencias

  

  return (
    <div className="all">
      <h2 className='text-3xl font-bold mb-4'>Dashboard</h2>
      <div className='flex flex-row items-center mr-[40vh] '>
      <div className='flex flex-col ml-[35vh]'>
      <h2 className='text-3xl font-bold mb-4'>Ventas Por Dia</h2>
       
        <LineChart width={600} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='totalSales' stroke='#00000' name='Ventas' />
          <Line type='monotone' dataKey='totalAmount' stroke='#ff6600' activeDot={{ r: 8 }} name='Monto Total' />
        </LineChart>
        </div>
        <div className='flex flex-col '>
      <h2 className='text-3xl font-bold mt-[3vh]'>Ventas/Meseros</h2>
        
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            cx={200}
            cy={200}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
            label={(entry) => entry.name}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        </div>
      </div>
      </div>
    
    
  );
};

export default Dashboard;
