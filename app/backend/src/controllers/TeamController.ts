import { Request, Response } from "express";
import TeamService from "../services/TeamService";

export default class TeamController {
  constructor(public service = new TeamService()) {}

  public getAll = async (req: Request, res: Response) => {
    const response = await this.service.getAll()
    return res.status(response.statusCode).json(response.message)
  }
}