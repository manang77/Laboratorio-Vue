export interface GitUsersVmModel {
  id: number;
  login: string;
  avatarUrl: string;
}

export const getNewGitUsersVm = () => {
  return {
    id: 0,
    loging: "",
    avatarUrl: ""
  };
};

export interface GitUsersVmConfig {
  gitUsersCount: number;
  gitUsersPages: number;
}

export interface GitUsersVmWithConfig {
  gitUsersConfigData: GitUsersVmConfig;
  gitUsersData: GitUsersVmModel[];
}

export const getGitUsersVmNewConfigData = (): GitUsersVmConfig => {
  return {
    gitUsersCount: 0,
    gitUsersPages: 0
  };
};

export const getNewGitUsersVmWithConfig = (): GitUsersVmWithConfig => {
  return {
    gitUsersConfigData: getGitUsersVmNewConfigData(),
    gitUsersData: []
  };
};
