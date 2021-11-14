<template>
  <div class="container">
    <div class="row ">
      <div class="col-lg-8 col-md-6 col-sm-5 col-5">
        <div class="mt-4">
          <input
            @keypress.enter="getData()"
            v-model="txtBuscar"
            class="form-control mr-sm-2  "
            type="search"
            placeholder="Buscar"
            aria-label="Buscar"
          >
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
        <div class="card mb-3 datosCard">
          <Carga
            class="estiloCarga"
            v-if="estadoCarga"
          ></Carga>
          <div
            v-if="!estadoCarga"
            class="row no-gutters"
          >
            <div class="col-md-5  col-sm-9 offset-2 col-lg-2 col-4 offset-1">
              <img
                class="imgInici "
                :src="imgInici"
              >
            </div>
            <div class="col-md-7 col-sm-12 offset-2 col-lg-4">
              <div class="card-body ">
                <h5 class="card-title"> {{nomCanciActu}}</h5>
                <p class="card-text "> La mejor música donde quieras.</p>
                <p> {{artisAct}} - {{albolAct}}</p>
                <div class="contenedorBotones">
                  <button>Reproducir</button>
                  <button>Seguir</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-3">
      <div
        v-for="data in dataArreglo"
        :key="data.id"
        class="col-6 mb-4 col-sm-4"
      >
        <div
          v-if="!estadoCarga"
          class="card"
          width="100px"
        >
          <div class="contenedorIconImage">
            <img
              @click="iniciarMusica(data.preview,data.album.cover_medium,data.artist.name,data.album.title,data.title)"
              v-bind:src="data.album.cover_medium"
              class=" imgAll card-img-top"
            >
            <i
              @click="iniciarMusica(data.preview,data.album.cover_medium,data.artist.name,data.album.title,data.title)"
              class="fas fa-play centrado"
            ></i>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{data.title}} </h5>
            <p class="card-text estiloTexto"> {{data.artist.name}} </p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="hijoFooter">
        <div class="contenImgFooter">
          <img
            class="imgFot"
            :src="imgInici"
            alt=""
          >
        </div>
        <div class="textoFooter">
          <h5> {{nomCanciActu}}</h5>
          <br>
          <p> {{artisAct}} - {{albolAct}}</p>
        </div>
      </div>

      <div class="playMusic">
        <i class="fas fa-step-backward iconoPlaySec"></i>
        <i
          @click="iniciarMusica(urlIni,imgInici,artisAct,albolAct,nomCanciActu)"
          class="fas fa-play iconoPlaySec"
        ></i>
        <i class="fas fa-step-forward iconoPlaySec"></i>
      </div>
      <div class="volumen">
        <div class="centrarIconVolumen">

          <input
            @change="subirVolumen($event)"
            value="5"
            id="barra"
            type="range"
            min="1"
            max="9"
          >
        </div>
        <div class="centrarIconVolumen"> <i
            @click="silenciarMusica()"
            class="fas fa-volume-off iconoPlaySec"
          ></i></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Carga from "./Carga.vue";
import fetchJsonp from "fetch-jsonp";
import { defineComponent , PropType} from "vue";
 

interface Music  {
    id: number;
    title: string;
    artist: {
        name: string;
    };
    album: {
        title: string;
        cover_medium: string;
        cover_big:string;
    };
    preview: string;
}
interface Audio {
    preview : string;
}
export default defineComponent({
  name: "Dashboard",
  components: {
    Carga,
  },
  data() {
    return {
      txtBuscar: "LinkinPark",
      dataArreglo :[] as Music[],
      /* dataArreglo : Object as PropType<Music[]>, */
      imgInici: "",
      estadoCarga: true,
      audio: new Audio(),
      contador: 1,
      urlIni: ""  as String,
      nomCanciActu: "",
      artisAct: "",
      albolAct: "",
      contadorMuted: 1,
    };
  },
  methods: {
    async getData() {
      const data  = await fetchJsonp(
        `https://api.deezer.com/search?q=${this.txtBuscar}` +
          "&index=0&limit=40&output=jsonp"
      ).then((response) => response.json());

      this.dataArreglo = data.data;
      
      this.urlIni =  this.dataArreglo[0].preview;
      this.imgInici = this.dataArreglo[0].album.cover_big;
      this.nomCanciActu = this.dataArreglo[0].title;
      this.artisAct = this.dataArreglo[0].artist.name;
      this.albolAct = this.dataArreglo[0].album.title;

      setInterval(() => {
        this.estadoCarga = false;
      }, 1500);
    },

    iniciarMusica(nomMus:string, imgSelct:string, artista:string, album:string, tituloCanci:string) {

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
    subirVolumen(event:any) {
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
  },
});
</script>

<style scoped lang="scss">
.hijoFooter {
  display: flex;

  flex-direction: row;
  justify-content: center;
}

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
.imgInici {
  width: 200px;
  height: 200px;
  cursor: pointer;
  border-radius: 20%;
}
.imgAll {
  cursor: pointer;
  border-radius: 50%;
}
.contenImgFooter {
  width: 80%;
}

.footer {
  position: fixed;
  left: 0px;
  bottom: 0;
  width: 100%;
  background-color: #eb5757;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.iconoPlaySec {
  margin: 20px;
  font-size: 35px;
  cursor: pointer;
  color: white;
}
.imgFot {
  width: 100%;
  height: 100px;
}
.textoFooter {
  margin-left: 40px;
  color: #ffffff;
  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
}

.input-Range {
  color: white;
  height: 20px;
  background-color: #f1f1f1;
  border-radius: 100%;
}

.volumen {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.centrarIconVolumen input {
  height: 80px;
}
.playMusic {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (max-width: 777px) {
  .volumen {
    display: none;
  }
  .playMusic li {
    width: 100%;
  }

  .iconoPlaySec {
    font-size: 35px;
  }

  .textoFooter {
    margin-left: 23px;
    color: #ffffff;
    font-family: Quicksand;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    margin-top: 0px;
    line-height: 10px;
  }
  .textoFooter h5 {
    font-size: 15px;
    height: 35px;
  }
}

.estiloCarga {
  margin: auto;
  margin-right: 70%;
}

.contenedorIconImage {
  position: relative;
  display: inline-block;
  text-align: center;
}

.centrado {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 40px;
  cursor: pointer;
}
.centrado:active {
  font-size: 50px;
}
.datosCard {
  font-weight: 700;
  color: black;
}
button {
  background-color: rgba(232, 96, 96, 1);

  border-radius: 100px;
  padding: 10px 25px;
  margin-left: 20px;
  color: white;
  border: none;
}
button:active {
  font-size: 17px;
}
.contenedorBotones {
  display: flex;
  flex-direction: row;
}
</style>