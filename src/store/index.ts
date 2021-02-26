import { createStore, ModuleTree } from "vuex";
import NavigationModule from "./Navigation";
export type State = { modules: ModuleTree<typeof NavigationModule> };
export default createStore({
  modules: {
    NavigationModule
  }
});
