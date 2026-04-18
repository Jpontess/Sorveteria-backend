import { Router } from 'express';
import { ProductController } from '../Controllers/productController.ts';
import { ProductService } from '../services/product/product.services.ts';
import { ProductRepository } from '../repository/product/product.repository.ts';

const router = Router();
const repository = new ProductRepository();
const service = new ProductService(repository);
const controller = new ProductController(service);


router.post('/create',controller.createProduct);
router.get('/', controller.getProductAll);
router.get('/:id', controller.getByIdProduct);
// router.put('/:id', EditarProduto);
// router.delete('/:id', DeletarProduto);

export default router;