<template>
  <div class="git-user-detail-container">
    <GitUserDetailCard :gitUser="gitUserDetail" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteLocation } from "vue-router";
import GitUserDetailCard from "@/pods/GitUserDetail/components/GitUserDetailCard.vue";
import { getGitUserData } from "@/pods/GitUserDetail/services";
import { createGitUser } from "@/pods/GitUserDetail/model";

export default defineComponent({
  name: "GitUserDetail",
  data() {
    return {
      gitUserDetail: createGitUser()
    };
  },
  computed: {
    login(): string {
      return String((this.$route as RouteLocation).params.id);
    }
  },
  components: {
    GitUserDetailCard
  },
  async created() {
    await this.loadGitUserDetail();
  },

  methods: {
    async loadGitUserDetail() {
      this.gitUserDetail = await getGitUserData(this.login);
      return;
    }
  }
});
</script>
