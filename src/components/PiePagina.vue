<template>
<div class="footer">

    <div class="d-flex justify-content-around ">



        <div>
            <img  :src="imgInici" alt="">
            <div class="textoFooter">
                <h5> </h5>
                <br>
                <p> </p>
            </div>
        </div>









        <div>
          <i class="fas fa-step-backward iconoPlaySec"></i>
            <i  class="fas fa-play iconoPlay"></i>
            <i class="fas fa-step-forward iconoPlaySec"></i>
        </div>



        <div>

          <input class="iconoPlaySec input-Range" type="range">
      <i class="fas fa-volume-off iconoPlaySec"></i>
        </div>

    </div>





</div>


</template>

<script>
export default {

}
</script>

<style scoped>
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #EB5757;
    height: 100px;
}

.contenFooter {
    display: flex;
    justify-content: space-between;
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
}


img {
    width: 200px;
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