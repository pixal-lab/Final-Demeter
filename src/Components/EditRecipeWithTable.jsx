// EditRecipeWithTable.jsx
import React, { useState, useEffect } from 'react';
import { useProduct } from '../Context/Product.context.jsx';

const EditRecipeWithTable = ({ onClose }) => {
  const { CurrentProd, getDetailProduct, detailP } = useProduct();
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    
    getDetailProduct(CurrentProd);
    console.log(detailP)
  }, []);

  const detailsArray = Array.isArray(detailP) ? detailP : [];
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Receta {CurrentProd}</h5>
       
      </div>
      <div className="modal-body">
       
        <table className="table">
          <thead>
            <tr>
              
              <th>Cantidad</th>
              
              <th>Insumo</th>
            </tr>
          </thead>
          <tbody>
           
            {detailsArray.map((detail) => (
    <tr key={detail.ID_ProductDetail}>
        <td>{detail.Lot_ProductDetail} {detail.Supply.measure}</td>
        <td>{detail.Supply ? detail.Supply.Name_Supplies : ''} </td>
    </tr>
))}
          </tbody>
        </table>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeWithTable;
