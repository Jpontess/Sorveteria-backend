import { AuthContoller } from '../authController.ts';
import { AuthService } from '../../services/auth/authService.ts';
import { UserRepository } from '../../repository/login/user.repository.ts';

jest.mock('../../repository/login/user.repository.ts', () => ({
  UserRepository: jest.fn().mockImplementation(() => ({}))
}));

jest.mock('../../services/auth/authService.ts', () => ({
  AuthService: jest.fn().mockImplementation(() => ({
    registerUsers: jest.fn(),
    singIn: jest.fn()
  }))
}));

describe('Auth Controller', () => {
  let service: AuthService;
  let repository: UserRepository;
  let controller: AuthContoller;


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockReq = (body: object) => ({ body }) as any;
  const mockRes = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
  };

  beforeEach(() => {
    repository = new UserRepository();
    service = new AuthService(repository);
    controller = new AuthContoller(service);
    jest.clearAllMocks();
  });

  it('deve retornar um status 201 ao registrar usuário', async () => {
    const body = { name: 'joao', password: '123' };
    const req = mockReq(body);
    const res = mockRes();

    (service.registerUsers as jest.Mock).mockResolvedValue(body);

    await controller.register(req, res);

    expect(service.registerUsers).toHaveBeenCalledWith({ name: 'joao', password:'123' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: `O usuário${body.name} foi criado com sucesso`,
      data: body
    });
  });

  it('deve retornar status 400 quando register falha', async () => {
    const req = mockReq({ name: 'joao', password: '123' });
    const res = mockRes();

    (service.registerUsers as jest.Mock).mockRejectedValue(new Error('já cadastrado'));

    await controller.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('deve retornar status 200 ao fazer login', async () => {
    const req = mockReq({ name: 'joao', password: '123' });
    const res = mockRes();

    (service.singIn as jest.Mock).mockResolvedValue('fake.jwt.token');

    await controller.singIn(req, res);

    expect(service.singIn).toHaveBeenCalledWith('joao', '123');
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('deve retornar status 400 quando login falha', async () => {
    const req = mockReq({ name: 'joao', password: 'errada' });
    const res = mockRes();

    (service.singIn as jest.Mock).mockRejectedValue(new Error('Senha incorreta'));

    await controller.singIn(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
    
});