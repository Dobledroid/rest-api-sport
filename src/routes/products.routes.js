import { Router } from "express";
import {
  getProducts,
  createNewProduct,
  getProductById,
  deleteProductById,
  getTotalProducts,
  updateProductById,
  getAllProductsWithRelations,
  getListProductsWithImagen,
  getListProductsWithImagenPrincipal,
  getProductByIdWithImagens
} from "../controllers/products.controller";

const router = Router();

router.get("/products", getProducts);

router.get("/list-products", getListProductsWithImagen);

router.get("/list-products-imagenPrincipal", getListProductsWithImagenPrincipal);

router.get("/products/relations", getAllProductsWithRelations);

router.post("/products", createNewProduct);

router.get("/products/count", getTotalProducts);

router.get("/products/:id", getProductById);

router.get("/products-with-imagens/:id", getProductByIdWithImagens);

router.delete("/products/:id", deleteProductById);

router.put("/products/:id", updateProductById);



export default router;
