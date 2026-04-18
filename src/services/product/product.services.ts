import type { ProductDto } from '../../models/Product/product.dto.ts';
import type { ProductRepository } from '../../repository/product/product.repository.ts';

export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  //Add produto
  createProduct = async (dto: ProductDto) => {
    if (!dto) throw new Error('Por favor insira todos os campos');
    
    const newDto = await this.repository.createProduct(dto);
    
    return newDto;
  };

  getAllProduct = async () => {
    return await this.repository.getAll();
  };

  getByIdProduct = async (id: string) => {
    return await this.repository.getById(id);
  };

  updateByIdProduct = async () =>{

  };
  updateByIdProductQuatity = async () =>{

  };

  softDeleteByIdProduct = async () =>{

  };



}