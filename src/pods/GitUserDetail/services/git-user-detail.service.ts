import { getGitUserDataApi } from "../api";
import { mapGitUserDetailFromApiToVM } from "../mapper";
import { GitUserVmModel, GitUserDetailApiModel } from "../model";

export const getGitUserData = async (
  login: string
): Promise<GitUserVmModel> => {
  const apiGitUserData: GitUserDetailApiModel = await getGitUserDataApi(login);
  const vmGitUserData: GitUserVmModel = mapGitUserDetailFromApiToVM(
    apiGitUserData
  );
  return vmGitUserData;
};
