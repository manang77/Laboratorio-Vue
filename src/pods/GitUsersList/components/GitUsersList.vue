<template>
  <div class="total-users-container">
    <strong>Total Users: </strong>{{ gitCompanyTotalUsers }}
  </div>
  <section class="cards-container">
    <div v-for="gitUser in gitUsers" :key="gitUser.id">
      <GitUserCard :gitUser="gitUser" />
    </div>
  </section>
</template>

<script lang="ts">
import GitUserCard from "@/pods/GitUsersList/components/GitUserCard.vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    totalGitUsers: {
      type: Number,
      required: true,
      default: 0
    },
    gitUsers: {
      type: [Array, Object],
      default: () => []
    }
  },
  components: {
    GitUserCard
  },
  data() {
    return {
      gitCompanyTotalUsers: "0"
    };
  },

  updated() {
    this.gitCompanyTotalUsers = this.totalGitUsers.toString();
  }
});
</script>

<style></style>
