import { ProductService } from '../../services/product/product.services.ts';
import { ProductController } from '../productController.ts';
import { ProductRepository } from '../../repository/product/product.repository.ts';

jest.mock('../../repository/product/product.repository.ts');
jest.mock('../../services/product/product.services.ts', () => ({
  ProductService: jest.fn().mockImplementation(() => ({
    createProduct: jest.fn(),
    getAllProduct: jest.fn(),
    getByIdProduct: jest.fn(),
    updateByIdProduct: jest.fn(),
    softDeleteByIdProduct: jest.fn(),
  }))
}));

describe('Product Controller', () => {
  let service: ProductService;
  let repository: ProductRepository;
  let controller: ProductController;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockReq = (body: object = {}, params: object = {}) => ({ body, params }) as any;
  const mockRes = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
  };

  beforeEach(() => {
    repository = new ProductRepository() as jest.Mocked<ProductRepository>;
    service = new ProductService(repository) as jest.Mocked<ProductService>;
    controller = new ProductController(service);
    jest.clearAllMocks();
  });


  describe('createProduct', () => {
    it('isso deve retornar um 201 ao criar um usuário', async () => {
      const body = {
        name: 'Flocos',
        description: 'Massa de Flocos 1,500L',
        price: 10.00,
        quantity: 10,
        image: 'caminho_img',
        category: 'Massa',
        isAvailable: true
      };
      const req = mockReq(body);
      const res = mockRes();

      (service.createProduct as jest.Mock).mockResolvedValue(body);

      await controller.createProduct(req, res);
      

      expect(service.createProduct).toHaveBeenLastCalledWith(body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: `${body.name} foi criando com sucesso`
      });
      console.log(res.json);
    });
    it('isso deve retornar um erro 400', async () => {
      const req = mockReq({});
      const res = mockRes();

      (service.createProduct as jest.Mock).mockRejectedValue(new Error('Falha ao se conectar no banco!'));

      await controller.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'O seguinte erro aconteceu: Error: Falha ao se conectar no banco!'
      });
    });
  });
  describe('getProductAll', () => {
    it('isso deveria retornar um status 200', async () => {
      const body = [
        {
          name: 'Flocos',
          description: 'Massa de Flocos 1,500L',
          price: 10.00,
          quantity: 10,
          image: 'caminho_img',
          category: 'Massa',
          isAvailable: true
        },
        {
          name: 'Napolitano',
          description: 'Massa de Napolitano 1,500L',
          price: 10.00,
          quantity: 10,
          image: 'caminho_img',
          category: 'Massa',
          isAvailable: true
        }
      ];       
      const req = mockReq(body);
      const res = mockRes();

      (service.getAllProduct as jest.Mock).mockResolvedValue(body);

      await controller.getProductAll(req , res);

      expect(service.getAllProduct).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it('isso deveria status 400', async () => {
      const req = mockReq({});
      const res = mockRes();

      (service.getAllProduct as jest.Mock).mockRejectedValue(new Error('Db not found'));

      await controller.getProductAll(req , res);

      expect(service.getAllProduct).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenLastCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error: Db not found'
      });
    });
  });
  describe('getByIdProduct', () => {
    it('isso deveria retornar um status 200', async () => {
      const id = '1234';

      const produto = {
        name: 'Flocos',
        description: 'Massa de Flocos 1,500L',
        price: 10.00,
        quantity: 10,
        image: 'caminho_img',
        category: 'Massa',
        isAvailable: true
      };
      const req = mockReq({}, { id });
      const res = mockRes();

      (service.getByIdProduct as jest.Mock).mockResolvedValue(produto);

      await controller.getByIdProduct(req, res);

      expect(service.getByIdProduct).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(200);
      console.log(produto);
    });
    it('isso deveria retornar um status 400', async () => {
      const req = mockReq({}, {});
      const res = mockRes();

      (service.getByIdProduct as jest.Mock).mockRejectedValue(new Error('Db'));

      await controller.getByIdProduct(req, res);

      expect(res.status).toHaveBeenLastCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Erro ao buscar produtos: Error: id não encontrado!'
      });
    });
  });

  describe('updateProduct', () => {
    it('isso deveria retornar um status 200 ao editar um produto', async () => {
      const id = '1234';
      const result = {
        _id: id,
        name: 'Flocos',
        description: 'Massa de Flocos 1,500L',
        price: 10.00,
        quantity: 10,
        image: 'caminho_img',
        category: 'Massa',
        isAvailable: true
      };

      const req = mockReq(result, { id });
      const res = mockRes();

      (service.updateByIdProduct as jest.Mock).mockResolvedValue(result);

      await controller.updateProduct(req, res);

      expect(service.updateByIdProduct).toHaveBeenLastCalledWith(id, result);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(result);
    });
    it('isso deveria retornar um erro 400 quando id não for encontrado', async () =>{
      const req = mockReq({}, {});
      const res = mockRes();

      await controller.updateProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('deletedProduct', () => {
    it('isso deveria retornar um status 200 ao deletar um produto', async () => {
      const id = '1234';
      const req = mockReq({}, { id });
      const res = mockRes();

      (service.softDeleteByIdProduct as jest.Mock).mockResolvedValue({ deleted: true });

      await controller.deletedProduct(req, res);

      expect(service.softDeleteByIdProduct).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('isso deveria retornar um status 404 quando id não for encontrado', async () => {
      const req = mockReq({}, {});
      const res = mockRes();

      await controller.deletedProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('isso deveria retornar um status 400 quando o service lançar erro', async () => {
      const req = mockReq({}, { id: '1234' });
      const res = mockRes();

      (service.softDeleteByIdProduct as jest.Mock).mockRejectedValue(new Error('Db offline'));

      await controller.deletedProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
