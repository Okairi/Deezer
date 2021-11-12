<template>

 
<div class="p-prin">

<div class="row">

    <div class="col-lg-3 col-md-3	 menuText">
       <Menu></Menu>

    </div>

    <div class="col-lg-9 col-md-8">
      <Dashboard></Dashboard>

    </div>

</div>
<!-- 
  <div class="row">
  
    <div class="col-lg-12">
       <PiePagina></PiePagina>

    </div>


 

</div>  
  -->
 </div>
 


 
</template>

<script>
import Dashboard from './components/Dashboard.vue'
import Menu from './components/Menu.vue'
import PiePagina from './components/PiePagina.vue'
import Carga from './components/Carga.vue'

export default {
  name: 'App',
  components: {


  Dashboard,
  Menu,
  PiePagina,
  Carga



  }
}
</script>

<style>
 
*{
  margin: 0px;
  padding: 0px;

}

 

.p-prin{
  width: 95%;
}
 

  
</style>
 
