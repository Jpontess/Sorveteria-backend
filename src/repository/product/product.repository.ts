import type { ProductDto } from '../../models/Product/product.dto.ts';
import type { ProductDeleteDto } from '../../models/Product/produtcDelete.dto.ts';
import Product from '../../models/Product/produto.schema.ts';

export class ProductRepository {

  createProduct = async (dto: ProductDto) => {
    return (await Product.create(dto));
  };
  getAll = async () => {
    return await Product.find({}).select('');
  };
  getById = async (id: string) => {
    return await Product.findById(id).select('created');
  };
  update = async(id: string, dto: ProductDto) => {
    return await Product.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true
    });
  };
  softDelete = async (id: string, dto: ProductDeleteDto) =>{
    return await Product.findByIdAndUpdate(id, dto, {
      new: true,
    });
  };
}