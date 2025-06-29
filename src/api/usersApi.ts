import { apiClient, digestAxiosError } from "./apiClient";

export type UserDto = {
  id: string;
  userName: string;
  email: string;
};

const usersApi = {
  async lookupUser(accessToken: string, query: string): Promise<UserDto> {
    try {
      const encoded = encodeURIComponent(query.trim());
      const { data } = await apiClient.get<UserDto>(`/users/${encoded}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (err) {
      throw digestAxiosError(err);
    }
  },
};

export default usersApi; 