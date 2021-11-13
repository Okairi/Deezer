



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
                <img   @click="iniciarMusica(data.preview,data.album.cover_medium,data.artist.name,data.album.title,data.title)"  v-bind:src="data.album.cover_medium"     class=" imgAll card-img-top" >

                <div class="card-body">
                    <h5 class="card-title">{{data.title}} </h5>

                    <p class="card-text estiloTexto"> {{data.artist.name}} </p>          
                </div>

            </div>
        </div>

    </div>



  <div class="footer">

   
 
         <div>
            <img class="imgFot" :src="imgInici" alt="">
            <div class="textoFooter">
                <h5> {{nomCanciActu}}</h5>
                <br>
                <p> {{artisAct}} - {{albolAct}}</p>
            </div>
        </div>  
 
        <div>
            <i class="fas fa-step-backward iconoPlaySec"></i>
            <i @click="iniciarMusica(urlIni,imgInici,artisAct,albolAct,nomCanciActu)" class="fas fa-play iconoPlay"></i>
            <i class="fas fa-step-forward iconoPlaySec"></i>
        </div> 
     
</div> 
 </div>
</template>

<script>

import Carga from './Carga.vue'
 


export default {
 components: {
 Carga
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
     urlIni:"",
     nomCanciActu:"",
     artisAct:"",
     albolAct:"",
 
   }


 },
 methods: {
   
   
 async getData(){


const data =await fetch('https://api.deezer.com/search?q='+this.txtBuscar).then(r=>r.json())
 
 this.dataArreglo=data.data
console.log(this.dataArreglo);

this.urlIni=this.dataArreglo[0].preview;
this.imgInici=this.dataArreglo[0].album.cover_big;
this.nomCanciActu=this.dataArreglo[0].title;
this.artisAct=this.dataArreglo[0].artist.name;
this.albolAct=this.dataArreglo[0].album.title;
 
setInterval(() => {
    this.estadoCarga=false;
}, 1500);

},

iniciarMusica(nomMus,imgSelct,artista,album,tituloCanci){

//URl DE LA MUSICA ,  IMAGEN DEL ALBUM ,NOMBRE ARTISTA , TITULO DEL ALBUM,NOMBRE DE LA MUSICA
//data.preview,data.album.cover_medium,data.artist.name,data.album.title,data.title
 this.urlIni=nomMus

this.imgInici=imgSelct
this.artisAct=artista
this.albolAct=album
this.nomCanciActu=tituloCanci


console.log(this.urlIni);
console.log( this.imgInici);
console.log(this.artisAct);
console.log(this.albolAct);
console.log(this.nomCanciActu);



if(nomMus==this.audio.src){

 if(this.contador===1){
   
 

    this.audio.play();
    this.contador=0


    
  }else if(this.contador==0) {

    this.audio.pause()
    
 
    this.contador=1
   
  }

}else{
this.audio.src=nomMus
this.contador=1;
if(this.contador===1){
   
 

    this.audio.play();
    this.contador=0
 
    

  }else if(this.contador==0) {

    this.audio.pause()
 
    this.contador=1
 
  }
}

 
 
 

}

 },
 mounted() {
  
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
    cursor: pointer;
}
 .imgAll{
     cursor: pointer;
 }
 

 .footer {
    position: fixed;
    left: 0px;
    bottom: 0;
 width: 100%;
    background-color: #EB5757;
    height: 100px;
     display: flex;
     flex-direction: row;
    justify-content:center;

}
.iconoPlay {
    margin: 20px;
    font-size: 45px;
    cursor: pointer;
    color: white;
}
.iconoPlaySec {
    margin: 20px;
    font-size: 40px;
    cursor: pointer;
    color: white;
}.imgFot {
    width: 15%;
    height: 100px;
    position: absolute;
    left: 0px;
    margin-right: 50px;
}
.textoFooter {
    margin-left: 40px;
    color: #FFFFFF;
    font-family: Quicksand;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
}



.input-Range{
  color: white;
  height: 20px;
  background-color: #f1f1f1;
  border-radius: 100%;
}

 
</style>