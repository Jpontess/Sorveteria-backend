import { User } from '../../models/Users/users.schema.ts';
import { UserRepository } from '../login/user.repository.ts';

jest.mock('../../models/Users/users.schema.ts');

describe('userRepository', () => {
  let repository: UserRepository;

  beforeEach(() =>{
    repository = new UserRepository();
    jest.clearAllMocks();
  });

  it('Isso deveria buscar um usuário', async () => {
    const mockUser = { name: 'joao' };
    
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    const result = await repository.findByUser('joao');


    expect(result).toEqual(mockUser);
    expect(User.findOne).toHaveBeenCalledWith({ name: 'joao' });
  });

  it('Isso deveria criar um usuário', async () => {
    const mockUserNew = { name: 'joao', password: '1234' };
    
    (User.create as jest.Mock).mockResolvedValue(mockUserNew);

    const result = await repository.create(mockUserNew);

    expect(result).toEqual(mockUserNew);
    expect(User.create).toHaveBeenCalledWith({ name: 'joao', password: '1234' });
  });
});



