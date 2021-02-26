<template>
  <div class="alert-container">
    <div class="alert" :hidden="hidden">{{ message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GitUsersAlert",
  props: {
    message: {
      type: String,
      required: true,
      default: ""
    },
    hidden: {
      type: Boolean,
      required: true,
      default: true
    }
  }
});
</script>

<style></style>
