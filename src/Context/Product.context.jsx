import { createContext, useContext, useState } from "react";


const ProductContext = createContext();

export const useProduct = () => {
    const context = useContext(ProductContext);

    if (!context)
        throw new Error("Ha ocurrido un error con el uso del contexto de los insumos");

    return context;
}

export function Product({ children }) {


    return 4;
}