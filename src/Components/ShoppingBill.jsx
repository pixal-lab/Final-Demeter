import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import '../css/style.css'
import ConfirmShop from './confirmShop';
import CancelShop from './CancelShop';
import { useSupplier } from '../Context/Supplier.context';
import Select from 'react-select';


function ShoppingBill({ total = 0, ...confirmValues }) {
  const { register, handleSubmit } = useForm();
  const { getSupplier } = useSupplier()
  const [supplierState, setSupplierState] = useState([{
    Name_Supplier: "",
    ID_Supplier: "",
    Name_Business: "",
  }])
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '180px',
      minHeight: '30px',
      fontSize: '14px',
    }),
  };

  useEffect(() => {
    return async () => {
      const newSupplier = await Promise.resolve(getSupplier())
      setSupplierState(newSupplier)
    }
    // console.log(getSupplies())
  }, [])

  //para enviar los datos con useform
  const onSubmit = handleSubmit(data => {
    signin(data)
  })
  //se utilizará para actualizar la fecha cada segundo o en intervalos regulares, llamando ka función tick  
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  //La fecha se muestra dinámicamente en el componente usando currenteDate
  const tick = () => {
    setCurrentDate(new Date());
  };

  const handleChange = (value, name) => {
    setSelectedSupplier(value);
  };

  const options = supplierState.map(({ ID_Supplier, Name_Supplier, Name_Business }) => ({
    value: ID_Supplier,
    label: Name_Supplier,
  }));





  return (

    <div className="facture flex justify-between gap-20 w-full h-full ">
      <form className="w-full max-w-xs p-6" onSubmit={onSubmit}>
        <div className="text-center">
          <h4 className='mt-3'>{currentDate.toLocaleDateString()}</h4>
          <h2>Factura</h2>
          <hr className="ml-2" />
        </div>
        <div className="flex mb-2 ">
          <h4 className='ml-4 mt-2'>Proveedor:</h4>
          <Select
            required
            className='ml-3'
            options={options}
            value={selectedSupplier}
            onChange={handleChange}
            placeholder=""
            styles={customStyles}
          />

        </div>
        <hr className='ml-2 mt-4' />
        <div>
          <h1 className='text-center mt-5'>$ {total}</h1>
          <p className='text-center mt-1'>Total</p>
        </div>

        <div className="mt-auto ">
          <hr className="ml-2 mt-5 " />
          <div className="flex justify-between pt-4">
            <ConfirmShop {...confirmValues} data={selectedSupplier} />
            <CancelShop />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ShoppingBill