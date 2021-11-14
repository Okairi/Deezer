<template>
  <div class="p-prin">
    <div class="row">
      <div class="col-lg-3 col-md-3">
        <Menu></Menu>
      </div>
      <div class="col-lg-9 col-md-8">
        <Dashboard></Dashboard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Dashboard from "@/components/Dashboard.vue";
import Menu from "@/components/Menu.vue";
 

export default defineComponent({
  name: "Inicio",
  components: {
    Dashboard,
    Menu
 
  },
});
</script>

<style lang="scss">
</style>