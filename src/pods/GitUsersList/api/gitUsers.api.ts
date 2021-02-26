import Axios, { AxiosResponse } from "axios";
import { pageSize } from "@/common";
import { GitUsersApiModel } from "@/pods/GitUsersList/model";

export const gitUsersApi = {
  async getGitUsersPage(
    company: string,
    page: number
  ): Promise<GitUsersApiModel[]> {
    try {
      const companyGitUser: GitUsersApiModel[] = await Axios.get<
        GitUsersApiModel[]
      >(
        `https://api.github.com/orgs/${company}/members?per_page=${pageSize}&page=${page.toString()}`
      )
        .then(response => response.data)
        .then(data => data);
      return companyGitUser;
    } catch {
      return [];
    }
  },

  async getGitUsersWithHeader(
    company: string,
    page: number
  ): Promise<AxiosResponse> {
    try {
      const requestResponse = await Axios.get(
        `https://api.github.com/orgs/${company}/members?per_page=${pageSize}&page=${page.toString()}`
      ).then(response => response);
      return requestResponse;
    } catch {
      return {} as AxiosResponse;
    }
  }
};
