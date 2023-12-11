// EditRecipe.jsx
import React, { useState } from 'react';
import { useSupplies } from "../Context/Supplies.context.jsx";

const EditRecipe = ({ onClose }) => {
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
    // Aquí puedes agregar la lógica para manejar los datos del formulario
    console.log('Ingredient:', selectedIngredient);
    console.log('Quantity:', quantity);
    // Lógica adicional según tus necesidades, por ejemplo, enviar datos al servidor, etc.
    // ...

    // Cierra el modal después de manejar el formulario
    onClose();
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Receta</h5>
        <button type="button" className="close" onClick={onClose}>
          <span>&times;</span>
        </button>
      </div>
      <div className="modal-body">
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
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
