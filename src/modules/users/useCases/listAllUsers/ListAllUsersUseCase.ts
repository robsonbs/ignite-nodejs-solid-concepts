import { SolidError } from "../../../../errors/SolidError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    if (!user_id) {
      throw new SolidError(400, "Invalid User ID");
    }

    const requester = this.usersRepository.findById(user_id);
    if (!requester) {
      throw new SolidError(400, "Requester not found");
    }
    if (!requester.admin) {
      throw new SolidError(400, "Requester have no admin role");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
