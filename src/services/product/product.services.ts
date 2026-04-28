import { ProductDto } from '../../models/Product/product.dto.ts';
import type { ProductDeleteDto } from '../../models/Product/produtcDelete.dto.ts';
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

  updateByIdProduct = async (id: string, dto: ProductDto) =>{
    if (!id) return Error('Erro Id inválido!');
    return await this.repository.update(id, dto);
  };

  softDeleteByIdProduct = async (id: string) =>{
    const findId = await this.repository.getById(id);

    if (!findId) throw new Error('Produto não encotrado!');

    const updateDto: ProductDeleteDto = {
      isDeleted: true
    };

    return await this.repository.softDelete(id , updateDto);
  };



}