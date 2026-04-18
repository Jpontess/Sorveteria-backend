import type { ProductDto } from '../../models/Product/product.dto.ts';
import Product from '../../models/Product/produto.schema.ts';
import { ProductRepository } from '../product/product.repository.ts';

jest.mock('../../models/Product/produto.schema.ts');

describe('Product Repository', () => {
  let repository: ProductRepository;

  beforeEach(() => {
    repository = new ProductRepository();
    jest.clearAllMocks();
  });


  it('Isso deveria criar um Produto', async () =>{
    const mockProduto: ProductDto = {
      name: 'Napolitano',
      description: '1,5 de massa',
      price: 20.00,
      quantity: 10,
      image: 'caminhoDaIMG',
      category: 'Massa',
      isAvailable: true
    }; 

    (Product.create as jest.Mock).mockResolvedValue(mockProduto);
    const result = await repository.createProduct(mockProduto);

    expect(result).toEqual(mockProduto);
    expect(Product.create).toHaveBeenCalledWith(
      { name: 'Napolitano',
        description: '1,5 de massa',
        price: 20.00,
        quantity: 10,
        image: 'caminhoDaIMG',
        category: 'Massa',
        isAvailable: true
      },
    );
  });
});