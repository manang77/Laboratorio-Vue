<template>
  <article class="detail-card-container">
    <section>
      <div class="detail-card-title">{{ gitUser.name }}</div>
      <div class="detail-card-image-container">
        <img :src="gitUser.avatarUrl" class="detail-card-image" alt="" />
      </div>
    </section>
    <section>
      <div class="detail-card-line-container">
        <div className="detail-card-line-element-icon">
          <img
            src="../assets/gitUserDetail_1.jpg"
            class="detail-card-image"
            alt=""
          />
        </div>
        <div class="detail-card-line-element-text">
          {{ gitUser.login }}
        </div>
      </div>
      <div class="detail-card-line-container">
        <div className="detail-card-line-element-icon">
          <img
            src="../assets/gitUserDetail_2.jpg"
            class="detail-card-image"
            alt=""
          />
        </div>

        <div class="detail-card-line-element-text">
          <span
            >{{ gitUser.followers }} followers
            {{ gitUser.following }} following</span
          >
        </div>
      </div>
      <div class="detail-card-line-container">
        <div className="detail-card-line-element-icon">
          <img
            src="../assets/gitUserDetail_3.jpg"
            class="detail-card-image"
            alt=""
          />
        </div>
        <div class="detail-card-line-element-text">
          <span>{{ gitUser.twitter }}</span>
        </div>
      </div>
      <div class="detail-card-line-container">
        <div class="detail-card-line-element-text">
          <span>{{ gitUser.bio }}</span>
        </div>
      </div>
      <div class="detail-card-line-button">
        <router-link :to="`/`">
          <button class="git-user-detail-button" type="button">
            <img src="../assets/gitUserDetail_back.jpg" />
          </button>
        </router-link>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { createGitUser } from "../model";

export default defineComponent({
  name: "GitUserDetailCard",
  props: {
    gitUser: {
      type: Object,
      required: true,
      default: createGitUser()
    }
  }
});
</script>

<style></style>
