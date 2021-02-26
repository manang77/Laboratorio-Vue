import { AxiosResponse } from "axios";
import {
  GitUsersApiWithHeader,
  GitUsersVmWithConfig,
  getNewGitUsersVmWithConfig,
  getGitUsersVmNewConfigData,
  GitUsersApiModel,
  GitUsersVmModel,
  GitUsersVmConfig
} from "@/pods/GitUsersList/model";
import { gitUsersApi } from "@/pods/GitUsersList/api";
import { mapGitUsersFromApiToVM } from "@/pods/GitUsersList/mapper";
import { pageSize } from "@/common";

export const gitUsersService = {
  async getGitUsersData(
    company: string,
    page: number,
    config: boolean
  ): Promise<GitUsersVmWithConfig> {
    if (config) {
      try {
        const gitUsersData = await this.getGitUsersInitialData(company, page);
        return gitUsersData;
      } catch {
        return getNewGitUsersVmWithConfig();
      }
    } else {
      const gitUsersApiData: GitUsersApiModel[] = await this.getGitUsersPage(
        company,
        page
      );
      const gitUsersVmData: GitUsersVmModel[] = mapGitUsersFromApiToVM(
        gitUsersApiData
      );
      const gitUsersPageData: GitUsersVmWithConfig = {
        gitUsersConfigData: getGitUsersVmNewConfigData(),
        gitUsersData: gitUsersVmData
      };
      return gitUsersPageData;
    }
  },

  async getGitUsersInitialData(
    company: string,
    page: number
  ): Promise<GitUsersVmWithConfig> {
    const gitUsersApiWithHeader: AxiosResponse = await gitUsersApi.getGitUsersWithHeader(
      company,
      page
    );
    if (gitUsersApiWithHeader !== null) {
      const gitUsersApiDataWithHeader: GitUsersApiWithHeader = {
        header: gitUsersApiWithHeader.headers,
        gitUsersApiData: gitUsersApiWithHeader.data
      };

      const gitUsersPages: number = this.getServerPages(
        gitUsersApiDataWithHeader
      );
      const usersLastPage: GitUsersApiModel[] = await gitUsersApi.getGitUsersPage(
        company,
        gitUsersPages
      );
      const totalUsers: number =
        (gitUsersPages - 1) * pageSize + usersLastPage.length;
      const gitUsersVm: GitUsersVmModel[] = mapGitUsersFromApiToVM(
        gitUsersApiDataWithHeader.gitUsersApiData
      );
      const gitUsersVmConfig: GitUsersVmConfig = {
        gitUsersPages: gitUsersPages,
        gitUsersCount: totalUsers
      };
      const gitUsersVmWithConfig: GitUsersVmWithConfig = {
        gitUsersConfigData: gitUsersVmConfig,
        gitUsersData: gitUsersVm
      };
      return gitUsersVmWithConfig;
    } else {
      return getNewGitUsersVmWithConfig();
    }
  },

  async getGitUsersPage(company: string, page: number) {
    const gitUsersPage: GitUsersApiModel[] = await gitUsersApi.getGitUsersPage(
      company,
      page
    );
    return gitUsersPage;
  },

  getServerPages(data: GitUsersApiWithHeader): number {
    const { link } = data.header;
    if (link) {
      if (link.indexOf(`rel="last"`) === -1) {
        return (
          parseInt(
            link.slice(
              link.indexOf(`&page=`) + 6,
              link.indexOf(`>; rel="prev"`)
            )
          ) + 1
        );
      } else {
        return parseInt(
          link.slice(
            link.indexOf(`&page=`, link.indexOf(`rel="next"`)) + 6,
            link.indexOf(link.indexOf(`>; rel="next"`))
          )
        );
      }
    } else {
      if (Array.isArray(data.gitUsersApiData)) {
        return 1;
      } else {
        return 0;
      }
    }
  }
};
