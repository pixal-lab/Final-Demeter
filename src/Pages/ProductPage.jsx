// ProductPage.jsx
import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import "../css/style.css";
import "../css/landing.css";
import { useSupplies } from "../Context/Supplies.context.jsx";
import { useProduct } from '../Context/Product.context.jsx'
import { useCategoryProducts } from '../Context/CategoryProducts.context.jsx'
import CreateProducts from '../Components/CreateProduct.jsx'
import EditRecipe from '../Components/EditRecipe.jsx';
import EditRecipeWithTable from '../Components/EditRecipeWithTable.jsx';  // Importa el nuevo componente

function ProductPage() {
  const { product, getProducts, toggleSupplyStatus, getCurrentProduct } = useProduct();
  const { Category_products } = useCategoryProducts();
  const { supplies, getSupplies, deleteSupplies } = useSupplies();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditTableModalOpen, setIsEditTableModalOpen] = useState(false); // Agrega el estado para el nuevo modal
  const navigate = useNavigate();
  
  const barraClass = product?.State ? "" : "desactivado";

  const navigateToCreateProduct = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreated = () => {
    getProducts();
  };

  useEffect(() => {
    getProducts();
    getSupplies();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const entrar = (id) => {
    getCurrentProduct(id)
    navigate('/create_product');

  }

  const filteredProduct = product.filter((produc) => {
    const { Name_Products, Price_Product, ProductCategory_ID, State } = produc;
    const searchString = `${Name_Products} ${Price_Product} ${ProductCategory_ID} ${State}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <section className="pc-container">
      <div className="pcoded-content">
        <div className="row w-100">
          <div className="col-md-12">
            <div className=" w-100 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Visualización de productos</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <button
                        className="btn btn-primary"
                        onClick={navigateToCreateProduct}
                        type="button"
                      >
                        Registrar
                      </button>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="search"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Buscador"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card-body table-border-style">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th className="text-center">Nombre</th>
                            <th className="text-center">Categoria</th>
                            <th className="text-center">Precio</th>
                            <th className="text-center">Estado</th>
                            <th className="text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProduct.map((produc) => (
                            <tr key={produc.ID_Product}>
                              <td>{produc.Name_Products}</td>
                              <td>
                                {produc.ProductCategory_ID
                                  ? Category_products.find(
                                    (category) =>
                                      category.ID_ProductCategory ===
                                      produc.ProductCategory_ID
                                  )?.Name_ProductCategory || ''
                                  : ''}
                              </td>
                              <td>{produc.Price_Product}</td>
                              <td className={`${barraClass}`}>
                                {produc?.State ? "Habilitado" : "Deshabilitado"}
                              </td>
                              <td>
                                <div style={{ display: "flex", alignItems: "center", padding: '3px' }}>
                                  <button
                                    onClick={() => {
                                      entrar(produc.ID_Product)
                                  }}
                                    className={`ml-1 btn btn-icon btn-primary ${!produc.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                                    disabled={!produc?.State}
                                  >
                                    <BiEdit />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(produc)}
                                    className={`ml-1 btn btn-icon btn-danger ${!produc.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                                    disabled={!produc.State}
                                  >
                                    <AiFillDelete />
                                  </button>
                                  <button
                                    type="button"
                                    className={`ml-1 btn btn-icon btn-success ${barraClass}`}
                                    onClick={() => onStatusChange(produc.ID_Product)}
                                  >
                                    {produc.State ? (
                                      <MdToggleOn className={`estado-icon active ${barraClass}`} />
                                    ) : (
                                      <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
                                    )}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {isCreateModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                          <div className="modal-overlay" onClick={() => setIsCreateModalOpen(false)}></div>
                          <div className="modal-container">
                            <CreateProducts onClose={() => setIsCreateModalOpen(false)} onCreated={handleCreated} />
                          </div>
                        </div>
                      )}
                      {isEditModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                          <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}></div>
                          <div className="modal-container">
                            <EditRecipe onClose={() => setIsEditModalOpen(false)} />
                          </div>
                        </div>
                      )}
                      {isEditTableModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                          <div className="modal-overlay" onClick={() => setIsEditTableModalOpen(false)}></div>
                          <div className="modal-container">
                            <EditRecipeWithTable onClose={() => setIsEditTableModalOpen(false)} />
                          </div>
                        </div>
                      )}
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

export default ProductPage;