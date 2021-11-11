<template>
 
 
<div class="navbar">

    <div class="contMen mb-3">

        <div class=" mt-3 logo">


 
            <img class="imgzo" src="../assets/img/foxbel-music.png" alt="">
        </div>

        <div class="contenidoEnlace">

            <ul>
                <li class="tituloList"><strong>Mi librería</strong></li>
                <li class="tituloMarcado">Recientes</li>
                <li>Artistas</li>
                <li>Álbunes</li>
                <li>Canciones</li>
                <li>Estaciones</li>


            </ul>


            <ul class="mt-5">
                <li class="tituloList"><strong>Playlist</strong></li>
                <li>Metal</li>
                <li>Para bailar</li>
                <li>Rock 90s</li>
                <li>Baladas</li>



            </ul>



        </div>

    </div>

</div>















</template>

<script>
export default {



}
</script>

<style scoped>
.navbar {
    background-color: #662323;
    color: white;
    height: 100%;
    min-height: 100vh;
    min-width: 180px;
}

.imgzo {
    width: 80%;
    height: 70px;
}

li {
    list-style: none;
}

.tituloList {
    font-size: 20px;
    font-family: Quicksand;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
}

.tituloMarcado {
    font-weight: 900;
    color: rgb(218, 88, 99);
    font-family: 'Catamaran', sans-serif;
}

ul>li {
    cursor: pointer;
}

.contMen {
    position: absolute;
    left: 2px;
    top: 5px;
    right: 6px;
    margin-left: 15px;
}
</style>