<template>
  <article class="card-container">
    <router-link :to="`/detail/${gitUser.login}`">
      <div class="image-container">
        <img :src="gitUser.avatarUrl" class="card-image" alt="" />
      </div>
      <div class="card-content-container">
        <p class="card-content-text">{{ gitUser.login }}</p>
        <button class="git-user-detail-button" type="button">
          <img src="../assets/gitUserDetail.jpg" />
        </button>
      </div>
    </router-link>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getNewGitUsersVm } from "../model/gitUsers.vm.model";

export default defineComponent({
  name: "GitUserCard",
  props: {
    gitUser: {
      type: Object,
      required: true,
      default: getNewGitUsersVm()
    }
  }
});
</script>

<style></style>
