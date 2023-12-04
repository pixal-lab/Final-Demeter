import axios from './axios.js'



export const getProductCategories = () => axios.get(`/productCategories`);