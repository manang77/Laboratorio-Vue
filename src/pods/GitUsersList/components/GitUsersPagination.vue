<template>
  <div :hidden="hideNavigationBar">
    <div class="pagination-container">
      <div>
        <button
          class="pagination-button arrow-button"
          :disabled="selectedPage === 1"
          @click="pageNavigation(selectedPage - 1)"
        >
          &#60;
        </button>
      </div>
      <div v-for="page in pages" :key="page">
        <div v-if="page !== 0">
          <button
            class="pagination-button"
            :class="{ 'selected-pagination-button': page === selectedPage }"
            @click="pageNavigation(page)"
          >
            {{ page }}
          </button>
        </div>
        <div v-if="page === 0" class="button-slot"></div>
      </div>
      <div>
        <button
          class="pagination-button arrow-button"
          :disabled="selectedPage === totalPages"
          @click="pageNavigation(selectedPage + 1)"
        >
          &#62;
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GitUsersPagination",
  props: {
    totalPages: {
      type: Number,
      required: true,
      default: 0
    },
    selectedPage: {
      type: Number,
      required: true,
      default: 0
    },
    hideNavigationBar: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  methods: {
    pageNavigation(page: number): void {
      this.$emit("page-navigation", page);
    }
  },
  computed: {
    pages(): number[] {
      const initialList = Array(this.totalPages).fill(0);
      let center = 0;
      if (this.selectedPage > 2 && this.selectedPage < this.totalPages - 1) {
        center = this.selectedPage;
      } else {
        center = Math.ceil(this.totalPages / 2);
      }

      const butonList = initialList.reduce((acum, item, index) => {
        switch (index + 1) {
          case 1:
          case 2:
          case center - 1:
          case center:
          case center + 1:
          case this.totalPages - 1:
          case this.totalPages:
            acum.push(index + 1);
            break;
        }
        return acum;
      }, []);

      const finalButonList = butonList.reduce(
        (acum: number[], item: number, index: number) => {
          if (index > 1) {
            if (item !== butonList[index - 1] + 1) {
              acum.push(0);
            }
            acum.push(item);
          } else {
            acum.push(item);
          }

          return acum;
        },
        []
      );
      return finalButonList;
    }
  }
});
</script>

<style></style>
