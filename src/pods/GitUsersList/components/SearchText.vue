<template>
  <div class="search-container">
    <input
      class="search-input"
      id="searchText"
      v-model="searchText"
      placeholder="Enter Company"
    />
    <button class="button" type="button" @click="companySearch()">
      Search
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    company: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    companySearch(): void {
      this.$emit("company-search", this.searchText);
    }
  },
  created() {
    this.searchText = this.company;
  }
});
</script>

<style></style>
