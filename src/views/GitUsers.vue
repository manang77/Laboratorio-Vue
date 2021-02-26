<template>
  <GitUsersAlert :hidden="alertHidden" :message="alertMessage" />
  <div class="git-user-list-container">
    <SearchText :company="company" @companySearch="onCompanySearch" />
    <GitUserList
      :totalGitUsers="gitCompanyTotalUsers"
      :gitUsers="gitUsersList"
    />
    <GitUsersPagination
      :totalPages="pages"
      :selectedPage="page"
      :hideNavigationBar="hideNavigationBar"
      @pageNavigation="onPageNavigation"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchText from "@/pods/GitUsersList/components/SearchText.vue";
import GitUserList from "@/pods/GitUsersList/components/GitUsersList.vue";
import GitUsersAlert from "@/pods/GitUsersList/components/GitUsersAlert.vue";
import GitUsersPagination from "@/pods/GitUsersList/components/GitUsersPagination.vue";
import { configDataRequired, configDataNotRequired } from "@/common/";
import { gitUsersService } from "@/pods/GitUsersList/services";
import {
  GitUsersVmWithConfig,
  GitUsersVmModel
} from "@/pods/GitUsersList/model";

import { useStore } from "vuex";
import store from "@/store";

export default defineComponent({
  name: "GitUsers",
  data() {
    return {
      store: useStore(),
      company: "",
      gitCompanyTotalUsers: 0,
      gitUsersList: [] as GitUsersVmModel[],
      page: 0,
      pages: 1
    };
  },
  components: {
    SearchText,
    GitUserList,
    GitUsersAlert,
    GitUsersPagination
  },
  async created() {
    this.company = this.store.getters["NavigationModule/searchCompany"];
    this.page = this.store.getters["NavigationModule/navigationPage"];
    await this.loadCompanyGitUsers(configDataRequired);
  },
  computed: {
    alertHidden(): boolean {
      return this.pages === 0 ? false : true;
    },
    alertMessage(): string {
      if (this.company === "") {
        return "Please, enter a valid company name";
      } else {
        if (this.pages === 0) {
          return `There is no git users for ${this.company}`;
        } else {
          return "";
        }
      }
    },
    hideNavigationBar(): boolean {
      return this.pages === 0;
    }
  },
  methods: {
    async onCompanySearch(newCompany: string) {
      this.page = 1;
      store.dispatch("NavigationModule/setNavigationPage", 1);
      this.company = newCompany;
      store.dispatch("NavigationModule/setNavigationCompany", newCompany);
      if (this.company !== "") {
        await this.loadCompanyGitUsers(configDataRequired);
      } else {
        this.gitCompanyTotalUsers = 0;
        this.gitUsersList = [];
        this.pages = 0;
      }
    },

    async onPageNavigation(newPage: number) {
      this.page = newPage;
      store.dispatch("NavigationModule/setNavigationPage", newPage);
      await this.loadCompanyGitUsers(configDataNotRequired);
    },

    async loadCompanyGitUsers(config: boolean) {
      const gitCompanyUsers: GitUsersVmWithConfig = await gitUsersService.getGitUsersData(
        this.company,
        this.page,
        config
      );
      if (config) {
        if (gitCompanyUsers.gitUsersConfigData.gitUsersCount === 0) {
          this.gitCompanyTotalUsers = 0;
          this.gitUsersList = [];
          this.pages = 0;
        } else {
          const companyConfigData = gitCompanyUsers.gitUsersConfigData;
          this.gitCompanyTotalUsers = companyConfigData.gitUsersCount;
          this.pages = companyConfigData.gitUsersPages;
          this.gitUsersList = gitCompanyUsers.gitUsersData;
        }
      } else {
        this.gitUsersList = gitCompanyUsers.gitUsersData;
      }
    }
  }
});
</script>
