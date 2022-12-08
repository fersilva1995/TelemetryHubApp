/* eslint-disable */
<template>
  <div class="gaugeContainer">
    <VueSvgGauge
    :start-angle="-90"
    :end-angle="93"
    :value="value"
    :separator-step="(parseInt(config.Maximum)-parseInt(config.Minimum))/3"
    :min="parseInt(config.Minimum)"
    :max="parseInt(config.Maximum)"
    :gauge-color="[{ offset: 0, color: '#eb4034'}, { offset: 66, color: '#ebcb2d'}, { offset: 100, color: '#8CDFAD'}]"
    :scale-interval="0.1"
    >
        <div class="valueSpace">
            <h2>{{value}} {{config.Unit}}</h2>
        </div>
    </VueSvgGauge>
  </div>
</template>

<script>
import { VueSvgGauge } from 'vue-svg-gauge'
export default {
    components: {
        VueSvgGauge
    },
    props:{
        data: Number,
        config: Object,
    },
    computed:{
        value(){
            return (this.data * this.config.Multiplier) + parseInt(this.config.Constant) 
        }
    },
    // mounted(){
    //     setInterval(()=>{
    //         this.data = Math.floor(Math.random() * 25);
    //     }, 3000);
    // }
}
</script>

<style scoped>
.valueSpace{
    position: relative;
    top: 4.75rem;
    
}
.gaugeContainer{
    height: 100%;
    width: 100%
}
h2{
    font-size: 1.25rem;
}
</style>