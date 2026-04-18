import type { ProductDto } from '../../models/Product/product.dto.ts';
import { ProductRepository } from '../../repository/product/product.repository.ts';
import { ProductService } from '../product/product.services.ts';

jest.mock('../../repository/product/product.repository.ts', () => ({
  ProductRepository: jest.fn().mockImplementation(() => ({
    createProduct: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
  }))
}));

describe('Test in Product Service', () => {
  let service: ProductService;
  let repository: ProductRepository;

  beforeEach(() => {
    repository = new ProductRepository();
    service = new ProductService(repository);
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    it('isso deveria retornar um novo objeto',async () => {
      const newDto: ProductDto = {
        name: 'Napolitado',
        description: 'Massa de Napolitano 1,500L',
        price: 10.00,
        quantity: 10,
        image: 'caminho_img',
        category: 'Massa',
        isAvailable: true
      };
      (repository.createProduct as jest.Mock).mockResolvedValue(newDto);

      const result = await service.createProduct(newDto);

      expect(result).toEqual(newDto);
      expect(repository.createProduct).toHaveBeenCalledWith(newDto);
    });
    
    it('isso deveria lançar um erro, quando dto for nulo', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await expect(service.createProduct(null as any)).rejects.toThrow('Por favor insira todos os campos');

      expect(repository.createProduct).not.toHaveBeenCalled();
    });
  });

  describe('getAllProduct', () => {
    it('isso deveria retorna uma lista de produtos', async () => {
      const list = [
        {
          name: 'Napolitado',
          description: 'Massa de Napolitano 1,500L',
          price: 10.00,
          quantity: 10,
          image: 'caminho_img',
          category: 'Massa',
          isAvailable: true
        },
        {
          name: 'Flocos',
          description: 'Massa de Flocos 1,500L',
          price: 10.00,
          quantity: 10,
          image: 'caminho_img',
          category: 'Massa',
          isAvailable: true
        }
      ];

      (repository.getAll as jest.Mock).mockResolvedValue(list);

      const result = await service.getAllProduct();

      expect(result).toEqual(list);
      expect(repository.getAll).toHaveBeenCalledWith();
    });
  });

  describe('getByIdProduct', () =>{
    it('isso deveria retorna um produto por id', async () =>{
      const dto = {
        id: '123',
        name: 'Napolitano',
        description: 'Massa de Napolitano 2L',
        price: 10.00,
        quantity: 10,
        image: 'caminho_img',
        category: 'Massas 2L',
        isAvailable: true
      };

      (repository.getById as jest.Mock).mockResolvedValue(dto);

      const result = await service.getByIdProduct(dto.id);

      expect(result).toEqual(dto);
      expect(repository.getById).toHaveBeenCalledWith(dto.id);
    });
  });
});