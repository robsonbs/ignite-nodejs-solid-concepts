import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const user_id = request.header("user_id");
      const result = this.listAllUsersUseCase.execute({ user_id });
      return response.status(200).json(result);
    } catch (error) {
      return response.status(error.status).json({ error: error.message });
    }
  }
}

export { ListAllUsersController };
