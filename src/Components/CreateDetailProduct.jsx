import React, { useState } from 'react';
import { useSupplies } from "../Context/Supplies.context.jsx";
import { useProduct } from '../Context/ProductContext.jsx'

const CreateDetailProduct = () => {
  const { CurrentProd, createDetailP } = useProduct();
  const { supplies } = useSupplies();
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleIngredientChange = (event) => {
    setSelectedIngredient(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Product_ID: CurrentProd,
      Supplies_ID: selectedIngredient,
      Lot_ProductDetail: quantity,
    };

    createDetailP(data)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="ingredientSelect">Insumo</label>
        <select
          id="ingredientSelect"
          className="form-control"
          value={selectedIngredient}
          onChange={handleIngredientChange}
        >
          {supplies.map((supply) => (
            <option key={supply.ID_Supplies} value={supply.ID_Supplies}>
              {supply.Name_Supplies}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="quantityInput">Cantidad</label>
        <input
          type="text"
          className="form-control"
          id="quantityInput"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default CreateDetailProduct;