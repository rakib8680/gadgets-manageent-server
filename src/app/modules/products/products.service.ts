import { TProduct } from "./products.interface";
import { ProductModel } from "./products.model";





// insert Product to DB 
const addProduct = async (payload:TProduct)=>{
    const result = await ProductModel.create(payload);

    return result;
};




export const ProductServices = {
    addProduct,
}