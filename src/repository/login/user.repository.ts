import type { UserDTO } from '../../models/Users/user.dto.ts';
import { User } from '../../models/Users/users.schema.ts';


export class UserRepository{
    
  async findByUser(name: string){
    return await User.findOne({ name });
  }

  async create(userDTO: UserDTO){
    return await User.create(userDTO);
  }
}