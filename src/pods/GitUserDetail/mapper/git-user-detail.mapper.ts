import { GitUserDetailApiModel, GitUserVmModel } from "../model";

export const mapGitUserDetailFromApiToVM = (
  apiCompanyGitUser: GitUserDetailApiModel
): GitUserVmModel => ({
  avatarUrl: apiCompanyGitUser.avatar_url,
  name: apiCompanyGitUser.name,
  id: apiCompanyGitUser.id.toString(),
  login: apiCompanyGitUser.login,
  followers: apiCompanyGitUser.followers.toString(),
  following: apiCompanyGitUser.following.toString(),
  twitterUser: apiCompanyGitUser.twitter_username,
  bio: apiCompanyGitUser.bio
});
