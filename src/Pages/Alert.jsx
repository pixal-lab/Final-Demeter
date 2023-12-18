import React, { useState, useEffect } from 'react';
import { useSupplies } from '../Context/Supplies.context';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';
import '../css/style.css'
import '../css/landing.css'

function Alert() {
  const { supplies, getSupplies } = useSupplies();
  const [lowStockSupplies, setLowStockSupplies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSupplies();
  }, []);

useEffect(() => {
  // Intenta obtener los datos almacenados de localStorage
  const storedLowStockSupplies = localStorage.getItem('lowStockSupplies');

  // Verifica si el valor recuperado no es nulo ni indefinido
  if (storedLowStockSupplies !== null && storedLowStockSupplies !== undefined) {
    try {
      // Intenta analizar el valor recuperado como JSON
      const parsedData = JSON.parse(storedLowStockSupplies);

      // Actualiza el estado con los datos analizados
      setLowStockSupplies(parsedData);
    } catch (error) {
      console.error('Error al analizar JSON desde localStorage:', error);
    }
  }

  // Calcula lowStock y actualiza el estado
  const lowStock = supplies.filter((supply) => supply.Unit <= supply.Stock);
  setLowStockSupplies(lowStock);

  // Almacena los datos actualizados en localStorage
  localStorage.setItem('lowStockSupplies', JSON.stringify(lowStock));

}, [supplies]);

  const handleNavigate = () => {
    navigate('/shopping');
  };


  return (
    <section className="pc-container">
      <div className="pcoded-content">
        <div className="row w-100">
          <div className="col-md-12">
            <div className="w-100 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-md-6">
                      <h5>Notificación</h5>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 ml-3">
                      <h5>Suministros con Existencias Bajas</h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Existencias</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lowStockSupplies.map((supply) => (
                            <tr key={supply.ID_Supplies}>
                              <td>{supply.Name_Supplies}</td>
                              <td>{supply.Unit}</td>
                              <td>{supply.Stock}</td>
                              <td>
                                <button
                                  onClick={handleNavigate}
                                  className="btn btn-icon btn-primary"
                                  title='Este boton lo llevará a la pestaña de compras'
                                >
                                  <StoreIcon />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Alert;