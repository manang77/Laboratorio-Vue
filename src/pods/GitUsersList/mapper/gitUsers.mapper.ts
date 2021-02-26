import { GitUsersApiModel, GitUsersVmModel } from "@/pods/GitUsersList/model";

const mapGitUserFromApiToVM = (
  gitUserApi: GitUsersApiModel
): GitUsersVmModel => ({
  id: gitUserApi.id,
  avatarUrl: gitUserApi.avatar_url,
  login: gitUserApi.login
});

export const mapGitUsersFromApiToVM = (
  gitUsersApi: GitUsersApiModel[]
): GitUsersVmModel[] =>
  gitUsersApi.map(gitUser => mapGitUserFromApiToVM(gitUser));
