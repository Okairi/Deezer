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

<script>


 

import Dashboard from '@/components/Dashboard.vue'
import Menu from '@/components/Menu.vue'
 
import Carga from '@/components/Carga.vue'

export default {
  name: 'Inicio',
  components: {
  Dashboard,
  Menu,
  Carga



  }
}

 
</script>

<style>
 
</style>