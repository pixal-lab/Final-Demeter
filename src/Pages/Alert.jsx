import React, { useState, useEffect } from 'react';
import { useSupplies } from '../Context/Supplies.context';
import DeleteNotification from '../Components/DeleteNotification';
import StoreIcon from '@mui/icons-material/Store';
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Alert() {
  const { supplies } = useSupplies();
  const [lowStockSupplies, setLowStockSupplies] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSupplyToDelete, setSelectedSupplyToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const lowStock = supplies.filter((supply) => supply.Unit <= supply.Stock);
    setLowStockSupplies(lowStock);

    lowStock.forEach((supply) => {
      toast.info(`Existencias bajas para ${supply.Name_Supplies}`, {
        autoClose: 5000,
      });
    });
  }, [supplies]);

  const handleDelete = (supply) => {
    setLowStockSupplies((prevSupplies) =>
      prevSupplies.filter((s) => s.ID_Supplies !== supply.ID_Supplies)
    );

    setSelectedSupplyToDelete(supply);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedSupplyToDelete(null);
  };

  const handleNavigate = () => {
    navigate('/tu-proxima-ruta');
  };

  const handleRemoveFromTable = (supplyId) => {
    setLowStockSupplies((prevSupplies) =>
      prevSupplies.filter((supply) => supply.ID_Supplies !== supplyId)
    );
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
                                  onClick={() => {
                                    handleDelete(supply);
                                    handleRemoveFromTable(supply.ID_Supplies);
                                  }}
                                  className="btn btn-icon btn-danger"
                                >
                                  <AiFillDelete />
                                </button>
                                <button
                                  onClick={handleNavigate}
                                  className="btn btn-icon btn-primary"
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

      {isDeleteModalOpen && (
        <DeleteNotification
          onClose={closeDeleteModal}
          onDelete={() => {
            if (selectedSupplyToDelete) {
              deleteSupplies(selectedSupplyToDelete.ID_Supplies);
              closeDeleteModal();
            }
          }}
        />
      )}
    </section>
  );
}

export default Alert;