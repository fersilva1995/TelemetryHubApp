<template>
  <div class="w-100">

    <div class="traficLight w-100 d-flex justify-content-center align-items-center mb-2" style="gap: 1rem">
      <div class="outter">
        <div class="innerCircle w-100 h-100"></div>
      </div>
      <h1>Status</h1>
    </div>

    <div v-resize-text class="label w-100 text-center">
      <h3>Valor</h3>
      <h6>{{unit}}</h6>
    </div>
  </div>
</template>

<script>
export default {
  props:{
      info:{
        type:Object,
        required:true
      }
    },
    computed:{
      unit(){
        return this.info.unit ? this.info.unit : 'unidade'
      }
    },
}
</script>

<style scoped>
  .outter{
    height:3rem;
    width: 3rem;
    border-radius: 100%;
    background: rgba(255, 255, 255, 0.411);
    padding: 0.125rem;
  }
  .innerCircle{
    border-radius: 100%;
    background: red;
    animation: blink 1.25s ease-in-out alternate-reverse infinite;
  }
  @keyframes blink{
    0%{
      opacity: 0.75;
    }
    100%{
      opacity: 1;
    }
  }
</style>