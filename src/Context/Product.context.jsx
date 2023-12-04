import { createContext, useContext, useState } from "react";
import { getProductsRequest, getProductByCategoryRequest, createProductsRequest, statusProductsRequest, updateProductsRequest, deleteProductsRequest } from "../Api/Product.request.js"
import {  getProductSale, getAllProduct, getDetailProductRequest, createDetailPRequest, deleteDetailProductRequest } from "../Api/Product.request.js" //Detalles

const ProductContext = createContext();

export const useProduct = () => {
    const context = useContext(ProductContext);

    if (!context)
        throw new Error("Ha ocurrido un error con el uso del contexto de los insumos");

    return context;
}

export function Product({ children }) {
    const [product, setProduct] = useState([]);
    const [detailP, setDetailP] = useState([]);
    const [Products, setProducts] = useState([]);
    const [Product, setproduct] = useState([]);
    const [AllProducts, setAllProducts] = useState([]);

    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            setProduct(res.data);
            
        } catch (error) {
            console.error(error);
        }
    }

    const getProductByCategory = async (id) => {
        try {
            const res = await getProductByCategoryRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const createProduct = async (products) => {
        try {
            const res = await createProductsRequest(products);
            getProducts(res);
        } catch (error) {
            console.error(error);
        }
    }

    const toggleSupplyStatus = async (id) => {
        try {
            const res = await statusProductsRequest(id);

            if (res.status === 200) {
                setProduct((prevProduct) =>
                    prevProduct.map((products) =>
                        products.ID_Product === id ? { ...products, State: !products.State } : products
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateProduct = async (id, product) => {
        try {
            await updateProductsRequest(id, product);
            getProducts();
        } catch (error) {
            console.error(error);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductsRequest(id)
            if (res.status === 204)
                setProduct(product.filter(product => product.ID_Product !== id))
        } catch (error) {
            console.log(error);
        }
    }

    // Detalles

    const getDetailProduct = async (id) => {
        try {
            const res = await getDetailProductRequest(id);
            setDetailP(res);
        } catch (error) {
            console.error(error);
        }
    }

    const createDetailP = async (id, datilsP) => {
        try {
            await createDetailPRequest(id, datilsP);
            getDetailProduct();
        } catch (error) {
            console.error(error);
        }
    }

    const deleteDetailProduct = async (id) => {
        try {
            const res = await deleteDetailProductRequest(id)
            if (res.status === 204)
                setDetailP(detailP.filter(detail => detail.ID_ProductDetail !== id))
        } catch (error) {
            console.log(error);
        }
    }
    
    const fetchProduct = async (id) => {
        try {
            const res = await getProductSale(id);
            return(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    const getProduct = async (id) => {
        try {
            const res = await getProduct(id);
            setproduct(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getwholeProducts = async () => {
        try {
            const res = await getAllProduct();
            setAllProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <ProductContext.Provider value={{
            product,
            getProducts,
            getProductByCategory,
            createProduct,
            toggleSupplyStatus,
            updateProduct,
            deleteProduct,
            // Datalles
            getDetailProduct,
            createDetailP,
            deleteDetailProduct,
            Product,
            Products,
            AllProducts,
            fetchProduct,
            getProduct,
            getwholeProducts 
            
        }}>
            {children}
        </ProductContext.Provider>
    );
}