import type { ProductDto } from '../../models/Product/product.dto.ts';
import { ProductRepository } from '../../repository/product/product.repository.ts';
import { ProductService } from '../product/product.services.ts';

jest.mock('../../repository/product/product.repository.ts', () => ({
  ProductRepository: jest.fn().mockImplementation(() => ({
    createProduct: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
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
  describe('updateByIdProduct', () => {
    it('isso deveria editar um Produto', async () => { 
      const mockProduct = {
        id: '1234',
        name: 'Produto 01',
        description: 'descrição 01',
        price: 10.00,
        quantity: 10,
        image: 'img_caminho',
        isAvailable: true,
        category: 'Massa'
      };
      const mockUpdate = {
        name: 'Produto 02', 
        description: 'descrição 11',
        price: 11.00,
        quantity: 10,
        image: 'img_caminho',
        isAvailable: true,
        category: 'Massa'
      };

      (repository.update as jest.Mock).mockResolvedValue(mockUpdate);

      const result = await service.updateByIdProduct(mockProduct.id, mockUpdate);
      expect(result?.name).toBe('Produto 02');
      expect(repository.update).toHaveBeenCalledWith(mockProduct.id, mockUpdate);
    });
  });

  describe('softDeleteByIdProduct', () => {
    it('isso deveria passar um status de true', async () => {
      const product = {
        id: '123',
        isDeleted: false,
        isAvailable: true
      };

      const updateDeleted = {
        isDeleted: true,
        isAvailable: false
      };

      (repository.getById as jest.Mock).mockResolvedValue(product);
      (repository.softDelete as jest.Mock).mockResolvedValue(updateDeleted);

      const result = await service.softDeleteByIdProduct(product.id);

      expect(result).toEqual(updateDeleted);
      expect(repository.getById).toHaveBeenCalledWith(product.id);
      expect(repository.softDelete).toHaveBeenCalledWith(product.id,updateDeleted);
    });
    it('isso deveria lançar um erro de produto não encontrado', async () =>{
      const updateProd = '123';

      (repository.getById as jest.Mock).mockResolvedValue(null);

      await expect(service.softDeleteByIdProduct(updateProd)).rejects.toThrow('Produto não encotrado!');
      expect(repository.getById).toHaveBeenCalledWith(updateProd);
      expect(repository.softDelete).not.toHaveBeenCalled();
    });
  });
});