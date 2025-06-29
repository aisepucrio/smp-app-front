import { CreateTeamDto, TeamDto } from "../teams/types";
import { apiClient, digestAxiosError } from "./apiClient";

const teamsApi = {
  async getTeams(accessToken: string): Promise<TeamDto[]> {
    try {
      const { data } = await apiClient.get<TeamDto[]>("/teams", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (err) {
      throw digestAxiosError(err);
    }
  },

  async createTeam(
    accessToken: string,
    payload: CreateTeamDto,
  ): Promise<TeamDto> {
    try {
      const { data } = await apiClient.post<TeamDto>("/teams", payload, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (err) {
      throw digestAxiosError(err);
    }
  },
};

export default teamsApi;
