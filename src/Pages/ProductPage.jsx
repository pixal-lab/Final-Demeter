import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import "../css/style.css";
import "../css/landing.css";

import { useProduct } from '../Context/Product.context.jsx'
import { useCategoryProducts } from '../Context/CategoryProducts.context.jsx'
import CreateProducts from '../Components/CreateProduct.jsx'

function ProductPage() {
    const { product, getProducts, toggleSupplyStatus } = useProduct();
    const { Category_products } = useCategoryProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const navigateToCreateProduct = () => {
        setIsModalOpen(true);
    };

    const handleCreated = () => {
        getProducts();
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProduct = product.filter((produc) => {
        const { Name_Products, Price_Product, ProductCategory_ID, State } = produc;
        const searchString = `${Name_Products} ${Price_Product} ${ProductCategory_ID} ${State}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    const status = product.State ? "" : "desactivado";

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
                                                            <td>{produc.State ? 'Habilitado' : 'Deshabilitado'}</td>
                                                            <td>
                                                                <div style={{ display: "flex", alignItems: "center" }}>

                                                                    <button
                                                                        type="button"
                                                                        className={`btn btn-icon btn-success ${produc.State ? "active" : "inactive"}`}
                                                                        onClick={() => toggleSupplyStatus(produc.ID_Product)}
                                                                    >
                                                                        {produc.State ? (
                                                                            <MdToggleOn className={`estado-icon active`} />
                                                                        ) : (
                                                                            <MdToggleOff className={`estado-icon inactive`} />
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {isModalOpen && (
                                                <div className="fixed inset-0 flex items-center justify-center z-50">
                                                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>
                                                    <div className="modal-container">
                                                        <CreateProducts onClose={() => setIsModalOpen(false)} onCreated={handleCreated} />
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
