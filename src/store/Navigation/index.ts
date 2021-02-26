import { Commit } from "vuex";

export interface NavigationStatus {
  company: string;
  page: number;
}
const mutationTypes = {
  SET_COMPANY_FILTER: "SET_COMPANY_FILTER",
  SET_NAVIGATION_PAGE: "SET_TEXT_FILTER"
};

const state: () => NavigationStatus = () => ({ company: "Lemoncode", page: 1 });

const actions = {
  setNavigationCompany({ commit }: { commit: Commit }, newCompany: string) {
    commit(mutationTypes.SET_COMPANY_FILTER, newCompany);
  },
  setNavigationPage({ commit }: { commit: Commit }, newPage: number) {
    commit(mutationTypes.SET_NAVIGATION_PAGE, newPage);
  }
};

const mutations = {
  [mutationTypes.SET_COMPANY_FILTER](
    state: NavigationStatus,
    newCompany: string
  ) {
    state.company = newCompany;
  },
  [mutationTypes.SET_NAVIGATION_PAGE](
    state: NavigationStatus,
    newPage: number
  ) {
    state.page = newPage;
  }
};

const getters = {
  searchCompany: (state: NavigationStatus) => state.company,
  navigationPage: (state: NavigationStatus) => state.page
};

const NavigationModule = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export default NavigationModule;
