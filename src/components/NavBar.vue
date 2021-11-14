<template>
  <div class="c-navbar">
    <div class="c-navbar_container">
      <div class="c-navbar_container_img">
        <img
          class="c-navbar_container_img_imgzo"
          src="../assets/img/foxbel-music.png"
          alt=""
        />
      </div>
      <div class="c-navbar_container_enlace">
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

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "NavBar",
});
</script>

<style scoped lang="scss">
.c-navbar {
  background-color: #662323;
  color: white;
  height: 100%;
  width: 20%;
  min-height: 100vh;
  min-width: 180px;
  position: fixed;
  &_container {
    position: absolute;
    left: 2px;
    top: 5px;
    right: 6px;
    margin-left: 15px;
    &_img {
      width: 100%;
      &_imgzo {
        width: 80%;
        height: 70px;
      }
    }
    &_enlace {
      li {
        list-style: none;
        cursor: pointer;
        &_tituloList {
          font-size: 20px;
          font-family: Quicksand;
          font-size: 22px;
          font-style: normal;
          font-weight: 700;
          line-height: 28px;
          letter-spacing: 0em;
          text-align: left;
        }
        &_tituloMarcado {
          font-weight: 900;
          color: rgb(218, 88, 99);
          font-family: "Catamaran", sans-serif;
        }
      }
    }
  }
}
@media (max-width: 800px) {
  .c-navbar {
    display: none;
  }
}
</style>
