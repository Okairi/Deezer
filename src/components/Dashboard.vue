<template>
  <div class="c-dashboard">
    <div class="c-dashboard_search">
      <div class="c-dashboard_search__input">
        <input
          @keypress.enter="getData()"
          v-model="txtBuscar"
          type="search"
          placeholder="Buscar"
          aria-label="Buscar"
        />
      </div>
      <div class="c-dashboard_search__author">
        <i class="fas fa-user"></i>
        <h6>Retuerto A</h6>
      </div>
    </div>
    <div v-show="estadoCarga" class="c-dashboard_loading">
      <Carga class="c-dashboard_loading__icon"></Carga>
    </div>
    <div v-show="!estadoCarga">
      <banner
        :imgInici="imgInici"
        :artisAct="artisAct"
        :nomCanciActu="nomCanciActu"
        :albolAct="albolAct"
      />
      <h4 class="c-dashboard_title" v-show="!estadoCarga">Resultados:</h4>
      <div class="c-dashboard_result">
        <div
          v-for="data in dataArreglo"
          :key="data.id"
          class="c-dashboard_result__data"
        >
          <div v-if="!estadoCarga" class="c-dashboard_result__data_img">
            <img
              @click="
                iniciarMusica(
                  data.preview,
                  data.album.cover_medium,
                  data.artist.name,
                  data.album.title,
                  data.title
                )
              "
              v-bind:src="data.album.cover_medium"
            />
            <i
              @click="
                iniciarMusica(
                  data.preview,
                  data.album.cover_medium,
                  data.artist.name,
                  data.album.title,
                  data.title
                )
              "
              class="fas fa-play icon_center"
            ></i>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ data.title }}</h5>
            <p class="card-text estiloTexto">{{ data.artist.name }}</p>
          </div>
        </div>
      </div>
      <div class="c-dashboard_footer">
        <div class="c-dashboard_footer__img">
          <img class="imgFot" :src="imgInici" alt="" />
          <div class="c-dashboard_footer__img_text">
            <h6>{{ nomCanciActu }}</h6>
            <br />
            <p>{{ artisAct }} - {{ albolAct }}</p>
          </div>
        </div>

        <div class="c-dashboard_footer__controls">
          <i class="fas fa-step-backward iconoPlaySec"></i>
          <i
            @click="
              iniciarMusica(urlIni, imgInici, artisAct, albolAct, nomCanciActu)
            "
            class="fas fa-play iconoPlaySec"
          ></i>
          <i class="fas fa-step-forward iconoPlaySec"></i>
        </div>
        <div class="c-dashboard_footer__vol">
          <input
            class="form-range"
            @change="subirVolumen($event)"
            value="5"
            id="barra"
            type="range"
            min="1"
            max="9"
          />
          <i
            @click="silenciarMusica()"
            class="fas fa-volume-off iconoPlaySec"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Carga from "./Carga.vue";
import fetchJsonp from "fetch-jsonp";
import { defineComponent } from "vue";
import { Music } from "../types/music";
import Banner from "./Banner.vue";

export default defineComponent({
  name: "Dashboard",
  components: {
    Carga,
    Banner,
  },
  data() {
    return {
      txtBuscar: "Linkin Park",
      dataArreglo: [] as Music[],
      /* dataArreglo : Object as PropType<Music[]>, */
      imgInici: "",
      estadoCarga: true,
      audio: new Audio(),
      contador: 1,
      urlIni: "" as string,
      nomCanciActu: "",
      artisAct: "",
      albolAct: "",
      contadorMuted: 1,
    };
  },
  methods: {
    async getData() {
      const data = await fetchJsonp(
        `https://api.deezer.com/search?q=${this.txtBuscar}` +
          "&index=0&limit=40&output=jsonp"
      ).then((response) => response.json());
      console.log(data);
      this.dataArreglo = data.data;

      this.urlIni = this.dataArreglo[0].preview;
      this.imgInici = this.dataArreglo[0].album.cover_big;
      this.nomCanciActu = this.dataArreglo[0].title;
      this.artisAct = this.dataArreglo[0].artist.name;
      this.albolAct = this.dataArreglo[0].album.title;

      setInterval(() => {
        this.estadoCarga = false;
      }, 1500);
    },

    iniciarMusica(
      nomMus: string,
      imgSelct: string,
      artista: string,
      album: string,
      tituloCanci: string
    ) {
      this.urlIni = nomMus;
      this.imgInici = imgSelct;
      this.artisAct = artista;
      this.albolAct = album;
      this.nomCanciActu = tituloCanci;
      if (nomMus == this.audio.src) {
        if (this.contador === 1) {
          this.audio.play();
          this.contador = 0;
        } else if (this.contador == 0) {
          this.audio.pause();
          this.contador = 1;
        }
      } else {
        this.audio.src = nomMus;
        this.contador = 1;
        if (this.contador === 1) {
          this.audio.play();
          this.contador = 0;
        } else if (this.contador == 0) {
          this.audio.pause();

          this.contador = 1;
        }
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subirVolumen(event: Event | any) {
      /*  this.audio.volume=event.currentTarget.value */
      console.log([this.audio.volume]);
      console.log(event.target.value);
      this.audio.volume = event.target.value * 0.1;
    },
    silenciarMusica() {
      console.log(this.audio.muted);
      if (this.contadorMuted === 1) {
        this.audio.muted = true;
        this.contadorMuted = 0;
      } else if (this.contadorMuted == 0) {
        this.audio.muted = false;

        this.contadorMuted = 1;
      }
    },
  },
  mounted() {
    this.getData();
    console.log(this.getData());
  },
});
</script>

<style scoped lang="scss">
.c-dashboard {
  &_search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;
    &__input {
      width: 70%;
      input {
        border-radius: 100px;
        border-color: #bbb4b4;
        outline: none;
        width: 100%;
        padding: 5px 20px;
      }
    }
    &__author {
      max-width: 16%;
      min-width: 14%;
      display: flex;
      justify-content: space-between;
      .fas {
        color: rgb(209, 39, 39);
      }
    }
  }
  &_loading {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    &__icon {
      width: 15%;
      color: #bbb4b4;
    }
  }
  &_result {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 50px;
    &__data {
      width: 100%;
      &_img {
        width: 100%;
        position: relative;
        img {
          width: 100%;
        }
        .icon_center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 40px;
          cursor: pointer;
          &:active {
            font-size: 50px;
          }
        }
      }
    }
  }
  &_title {
    margin: 10px 0;
  }
  &_footer {
    position: fixed;
    left: 0px;
    bottom: 0;
    width: 100%;
    background-color: #eb5757;
    height: 95px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &__img {
      display: flex;
      max-width: 300px;
      min-width: 300px;
      img {
        width: 30%;
      }
      &_text {
        padding: 10px;
        font-size: 12px;
        color: #fff;
      }
    }
    &__controls {
      width: 10%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        color: white;
        &:active {
          transform: scale(1.2);
        }
      }
    }
    &__vol {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 20px;
      input[type="range"]::-webkit-slider-thumb {
        background: #ffffff;
      }

      i {
        padding: 0 10px;
        color: #fff;
        &:active {
          transform: scale(1.2);
        }
      }
    }
  }
}
@media (max-width: 800px) {
  .c-dashboard_search__author {
    display: none;
  }
  .c-dashboard_search__input {
    width: 100%;
    input {
      padding: 10px;
    }
  }
  .c-dashboard_banner__img {
    margin: auto;
  }
  .c-dashboard_banner__description {
    display: none;
  }
  .c-dashboard_footer__controls {
    width: 40%;
    margin: 0 10px;
  }
  .c-dashboard_footer__vol {
    display: none;
  }
}
</style>
