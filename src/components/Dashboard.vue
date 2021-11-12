



<template>
 <div class="container">

    <div class="row ">

        <div class="col-lg-8 col-md-6 col-sm-5 col-5">
            <div class="mt-4">
                <input   @keypress.enter="getData()"  v-model="txtBuscar" class="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Buscar">
            </div>
         
        </div>

 
        <div class="col-lg-4 mt-4  col-md-6  col-sm-6  col-7">
            <div class="izquiera">

                <i class="fas fa-user"></i>
                <div>
                    Retuerto A
                </div>
            </div>

        </div>

        
    </div>



    <div class="row mb-5">

        <div class="col-lg-12 offset-1 mt-4">

            <div class="card mb-3">

                <div class="row no-gutters">
 
                    <div class="col-md-5  col-sm-9 offset-2 col-lg-2 col-4 offset-1">
                        
                        <img v-if="!estadoCarga" class="imgInici" :src="imgInici"   >
                        <Carga v-if="estadoCarga"></Carga> 
                    </div>


                    <div class="col-md-7 col-sm-12 offset-2 col-lg-4">
                        <div class="card-body ">
                            <h5 class="card-title "> </h5>
                            <p class="card-text "> La mejor música donde quieras.</p>

                        </div>
                    </div>

                </div>

            </div>
        </div>

    </div>
 
    <div class="row row-cols-1 row-cols-md-3">
 

        <div v-for="data in dataArreglo" :key="data.id" class="col-6 mb-4 col-sm-4">

     
            <div v-if="!estadoCarga" class="card" width="100px">
                <img @click="iniciarMusica(data.preview)"  v-bind:src="data.album.cover_medium"     class="card-img-top" >

                <div class="card-body">
                    <h5 class="card-title">{{data.title}} </h5>

                    <p class="card-text estiloTexto"> {{data.artist.name}} </p>
               
                </div>

            </div>
        </div>


    </div>

 </div>
 
 

 

 

 
 
 

</template>

<script>

import Carga from './Carga.vue'
import PiePagina from './PiePagina.vue'


export default {
 components: {
 Carga,
 PiePagina
}
 ,

 data(){

   return {

     txtBuscar:"LinkinPark",
     dataArreglo:[],
     imgInici:"",
     estadoCarga:true,
     audio:new Audio,
     contador:1,
     sound:false,
     sabueso:"Kevin"
     
     /* Aqui es donde van las variables  */
     /**estas variables tu las creadas en nada cierto??
      * se pueden instanciar , claro pero de donde sacaste esas variables y como sabes usarlos?? una guia u algo?
      * aya algo así xddd no me estas entendiendo, lo que digo es que como sabes que contador es el play = 0 : 1??
      * eso es cuando se da click  mira en el método
      */


   }


 },
 methods: {
   
   
 async getData(){


const data =await fetch('https://api.deezer.com/search?q='+this.txtBuscar).then(r=>r.json())
 
 this.dataArreglo=data.data
console.log(data);
console.log(this.dataArreglo);
this.imgInici=this.dataArreglo[0].album.cover_big;

setInterval(() => {
    this.estadoCarga=false;
}, 1500);

},

iniciarMusica(nomMus){
if(nomMus==this.audio.src){

 if(this.contador===1){
   
     console.log(this.audio);

    this.audio.play();
    this.contador=0
    console.log(this.contador)
    
  }else if(this.contador==0) {

    this.audio.pause()
 
    this.contador=1
    console.log(this.contador)
  }

}else{
this.audio.src=nomMus
this.contador=1;
if(this.contador===1){
   
     console.log(this.audio);

    this.audio.play();
    this.contador=0
    console.log(this.contador)
    

  }else if(this.contador==0) {

    this.audio.pause()
 
    this.contador=1
    console.log(this.contador)
  }
}

console.log(this);
 
 

}

 },
 mounted() {
     console.log("Se creo el componente");
     this.getData();
 },


}
</script>

<style scoped>
.izquiera {
    margin-left: 60%;
}

.estiloTexto {
    font-family: Quicksand;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: 0em;
    text-align: left;
}

.card {
    outline: none;
    border: 0;
}
.imgInici{
    width: 200px;
    height: 200px;
}
 







</style>