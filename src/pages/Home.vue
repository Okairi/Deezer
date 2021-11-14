<template>
  <div class="p-home">
    <div class="p-home__main">
      <div class="p-home__main_left">
        <navBar />
      </div>
      <div class="p-home__main_right">
        <Dashboard></Dashboard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dashboard from "@/components/Dashboard.vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "Home",
  components: {
    Dashboard,
    NavBar,
  },
});
</script>

<style lang="scss">
.p-home {
  height: 100vh;
  width: 100%;
  &__main {
    display: flex;
    &_left {
      width: 20%;
    }
    &_right {
      margin: auto;
      width: 74%;
    }
  }
}
@media (max-width: 800px) {
  .p-home__main_left {
    display: none;
  }
  .p-home__main_right {
    width: 90%;
  }
}
</style>
