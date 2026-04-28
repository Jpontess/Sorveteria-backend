import { Router } from 'express';
import { ProductController } from '../Controllers/productController.ts';
import { ProductService } from '../services/product/product.services.ts';
import { ProductRepository } from '../repository/product/product.repository.ts';
import { authMiddlwares } from '../middlewares/auth.ts';

const router = Router();
const repository = new ProductRepository();
const service = new ProductService(repository);
const controller = new ProductController(service);


router.get('/',authMiddlwares, controller.getProductAll);
router.post('/create', authMiddlwares, controller.createProduct);
router.get('/:id',authMiddlwares, controller.getByIdProduct);
router.patch('/edit/:id', authMiddlwares, controller.updateProduct);
router.delete('/deleted/:id', authMiddlwares, controller.deletedProduct);

export default router;