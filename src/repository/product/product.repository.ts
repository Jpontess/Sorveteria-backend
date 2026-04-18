import type { ProductDto } from '../../models/Product/product.dto.ts';
import Product from '../../models/Product/produto.schema.ts';

export class ProductRepository {

  createProduct = async (dto: ProductDto) => {
    return await Product.create(dto);
  };
  getAll = async () => {
    return await Product.find({});
  };
  getById = async (id: string) => {
    return await Product.findById(id);
  };
  update = async(dto: ProductDto) => {
    return await Product.findByIdAndUpdate(dto);
  };
  softDelete = async (id: string) =>{
    return await Product.findById(id);
  };
}