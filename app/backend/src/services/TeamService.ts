import Team from '../database/models/Team';

export default class TeamService {
  public getAll = async () => {
    const teams = await Team.findAll();
    console.log(teams);

    if (teams.length > 0) {
      return { statusCode: 200, message: teams };
    } return { statusCode: 404, message: { message: 'No teams were found' } };
  };

  public getOne = async (id: string | number) => {
    const team = await Team.findByPk(id);

    if (team !== null) {
      return { statusCode: 200, message: team };
    } return { statusCode: 404, message: { message: 'There is no team with such id!' } };
  };
}
