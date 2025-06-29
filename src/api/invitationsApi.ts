import { apiClient, digestAxiosError } from "./apiClient";

export type CreateInvitationDto = {
  teamId: string;
  email: string;
};

const invitationsApi = {
  async createInvitation(
    accessToken: string,
    payload: CreateInvitationDto,
  ): Promise<void> {
    try {
      await apiClient.post("/invitations", payload, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (err) {
      throw digestAxiosError(err);
    }
  },
};

export default invitationsApi; 