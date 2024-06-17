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
  getProductByIdWithImagens,
  getListProductsWithImagenPrincipalAdmin,
  createNewProductCrear
} from "../controllers/products.controller";

const router = Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });


router.get("/products", getProducts);

router.get("/list-products", getListProductsWithImagen);

router.get("/list-products-imagenPrincipal", getListProductsWithImagenPrincipal);
router.get("/list-products-imagenPrincipal-admin", getListProductsWithImagenPrincipalAdmin);

router.get("/products/relations", getAllProductsWithRelations);

// router.post("/products", createNewProduct);
router.post("/products", upload.array('images', 10), createNewProduct);

router.get("/products/count", getTotalProducts);

router.get("/products/:id", getProductById);

router.get("/products-with-imagens/:id", getProductByIdWithImagens);

router.delete("/products/:id", deleteProductById);

router.put("/products/:id", updateProductById);



export default router;
