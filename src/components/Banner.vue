<template>
  <div class="c_banner">
    <div class="c_banner__img">
      <img class="imgInici" :src="imgInici" />
    </div>
    <div class="c_banner__description">
      <h5 class="card-title">{{ nomCanciActu }}</h5>
      <p class="card-text">La mejor música donde quieras.</p>
      <p>{{ artisAct }} - {{ albolAct }}</p>
      <div class="c_banner__description__buttons">
        <button>Reproducir</button>
        <button>Seguir</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Banner",
  props: {
    imgInici: {
      type: String,
      required: true,
    },
    nomCanciActu: {
      type: String,
      required: true,
    },
    artisAct: {
      type: String,
      required: true,
    },
    albolAct: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.c_banner {
  width: 100%;
  display: flex;
  justify-content: space-between;
  &__img {
    width: 30%;
    img {
      width: 100%;
      height: 270px;
    }
  }
  &__description {
    width: 80%;
    padding: 40px 20px;
    background-color: #eb575791;
    color: #fff;
    &__buttons {
      button {
        background-color: rgba(232, 96, 96, 1);
        border-radius: 100px;
        padding: 10px 25px;
        color: white;
        margin: 0 5px;
        border: none;
      }
    }
  }
}
@media (max-width: 800px) {
  .c_banner__img {
    margin: auto;
    img {
      height: 140px;
    }
  }
  .c_banner__description {
    display: none;
  }
}
</style>
