import React, { createContext, useContext, useEffect, useState } from "react";
import teamsApi from "../api/teamsApi";
import { CreateTeamDto, TeamDto } from "../teams/types";
import { useAuth } from "./AuthContext";

interface TeamsContextValue {
  teams: TeamDto[];
  loading: boolean;
  refresh: () => Promise<void>;
  createTeam: (payload: CreateTeamDto) => Promise<TeamDto>;
}

const TeamsContext = createContext<TeamsContextValue | undefined>(undefined);

export const TeamsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken } = useAuth();
  const [teams, setTeams] = useState<TeamDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTeams = async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const data = await teamsApi.getTeams(accessToken);
      setTeams(data);
    } catch (err) {
      console.error("Failed to fetch teams", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const createTeam = async (payload: CreateTeamDto): Promise<TeamDto> => {
    if (!accessToken) throw new Error("No access token");
    const team = await teamsApi.createTeam(accessToken, payload);
    await fetchTeams();
    return team;
  };

  return (
    <TeamsContext.Provider
      value={{ teams, loading, refresh: fetchTeams, createTeam }}
    >
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeams = () => {
  const ctx = useContext(TeamsContext);
  if (!ctx) throw new Error("useTeams must be used within TeamsProvider");
  return ctx;
};
