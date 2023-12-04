import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useCategoryProducts } from '../Context/CategoryProducts.context.jsx';
// import { useProducts } from "../Context/Products.context.jsx";
import CreateProductCategory from "../Components/CreateProductCategory.jsx";
import UpdateProductCategory from "../Components/UpdateProductCategory.jsx";
import DeleteProductCategory from "../Components/DeleteProductCategory.jsx";
import CannotDeleteCategory from "../Components/CannotDeleteProductsCategory.jsx";
import CannotDisableCategoryProduct from '../Components/CannotDisableCategoryProduct.jsx';

import "../css/style.css";
import "../css/landing.css";

function ProductCategoryPage() {
  const { Category_products, getCategory_products, deleteCategory_products, toggleCategoryProductStatus } = useCategoryProducts();
//   const { products, getProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductCategoryToDelete, setSelectedProductCategoryToDelete] = useState(null);
  const [selectedProductCategoryToUpdate, setSelectedProductCategoryToUpdate] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showWarningDisable, setShowWarningDisable] = useState(false);

  useEffect(() => {
    getCategory_products();
    // getProducts();
  }, []);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProductsCategory = Category_products.filter((productCategory) => {
    const {
      Name_ProductCategory,
    } = productCategory;
    const searchString =
      `${Name_ProductCategory}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  const handleDelete = async (productCategory) => {
    // const categoryID = productCategory.ID_ProductCaProduct
    // const productInCategory = product.filter((product) => product.ProductCategory_ID === categoryID);

    // if (productInCategory.length > 0) {
      // setShowWarning(true);
      //setDeleteModalOpen(false);
    // } else {
      setShowWarning(false);
      setSelectedProductCategoryToDelete(productCategory);
      setDeleteModalOpen(true);
    // }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedProductCategoryToDelete(null);
    setShowWarning(false);
  };

  const handleUpdateProductCategory = (productCategory) => {
    setSelectedProductCategoryToUpdate(productCategory);
  };

  const handleToggleStatus = async (productCategory) => {
    const categoryID = productCategory.ID_ProductCategory;

    const productInCategory = product.filter((product) => supply.ProductCategory_ID === categoryID);

    if (productInCategory.length > 0) {
      setShowWarningDisable(true);
    } else {
      setShowWarningDisable(false);
      toggleCategoryProductStatus(categoryID);
    }
  };


  return (
    <section className="pc-container">
      <div className="pcoded-content">
        <div className="row w-100">
          <div className="col-md-12">
            <div className=" w-100 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Visualización de categoría de insumos</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <CreateProductCategory />
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
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProductsCategory.map((productCategory) => (
                            <tr key={productCategory.ID_ProductCategory}>
                              <td>{productCategory.Name_ProductCategory}</td>
                              <td>{productCategory.State ? 'Habilitado' : 'Deshabilitado'}</td>
                              <td>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                  <UpdateProductCategory
                                    buttonProps={{
                                      buttonClass: `btn btn-icon btn-primary ${!productCategory.State ? "text-gray-400 cursor-not-allowed" : ""}`,
                                      isDisabled: !productCategory.State,
                                      buttonText: <BiEdit />,
                                    }}
                                    productCategoryToEdit={productCategory}
                                    onUpdate={handleUpdateProductCategory}
                                  />
                                  <button
                                    onClick={() => handleDelete(productCategory)}
                                    className={`btn btn-icon btn-danger ${!productCategory.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                                    disabled={!productCategory.State}
                                  >
                                    <AiFillDelete />
                                  </button>
                                  <button
                                    type="button"
                                    className={`btn btn-icon btn-success ${productCategory.State ? "active" : "inactive"}`}
                                    onClick={() => handleToggleStatus(productCategory)}
                                  >
                                    {productCategory.State ? (
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteProductCategory
          onClose={closeDeleteModal}
          onDelete={() => {
            if (selectedProductCategoryToDelete) {
              deleteCategory_products(selectedProductCategoryToDelete.ID_ProductCategory);
              closeDeleteModal();
            }
          }}
        />
      )}

      {showWarning && (
        <CannotDeleteCategory
          onClose={closeDeleteModal}
        />
      )}

      {selectedProductCategoryToUpdate && (
        <UpdateProductCategory
          productCategoryToEdit={selectedProductCategoryToUpdate}
          onUpdate={() => {
            setSelectedProductCategoryToUpdate(null);
          }}
        />
      )}

      {showWarningDisable && (
        <CannotDisableCategoryProduct
          onClose={() => setShowWarningDisable(false)}
        />
      )}
    </section>
  );
}

export default ProductCategoryPage;
