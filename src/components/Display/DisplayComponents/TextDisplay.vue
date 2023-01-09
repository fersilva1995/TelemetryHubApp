<template>
  <div class="text-center">
    <h1>Valor</h1>
    <h6>{{unit}}</h6>
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

<style>

</style>