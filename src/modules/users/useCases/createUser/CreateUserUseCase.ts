import { SolidError } from "../../../../errors/SolidError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const alreadyExists = this.usersRepository.findByEmail(email);
    if (alreadyExists) {
      throw new SolidError(400, "User already exists");
    }

    const user = this.usersRepository.create({
      name,
      email,
    });
    return user;
  }
}

export { CreateUserUseCase };
