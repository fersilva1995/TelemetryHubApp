<template>
    <div class="w-110 h-100">
        <VueSvgGauge
        :start-angle="-90"
        :end-angle="93"
        :value="80"
        :separator-step="33"
        :min="0"
        :innerRadius="60"
        :separatorThickness="1"
        :max="100"
        :gauge-color="[{ offset: 0, color: '#eb4034'}, { offset: 66, color: '#ebcb2d'}, { offset: 100, color: '#8CDFAD'}]"
        :scale-interval="5">
            <div class="valueSpace">
                <h2>Valor <br> {{unit}}</h2>
            </div>
        </VueSvgGauge>
        <div class="w-100 d-flex justify-content-between">
            <h4 class="text-danger">{{min}}</h4>
            <h4 class="text-success">{{max}}</h4>
        </div>
    </div>
</template>

<script>
import { VueSvgGauge } from 'vue-svg-gauge'
export default {
    components: {
        VueSvgGauge
    },
    props:{
        info:{
            type: Object,
            required: true
        }
    },
    computed:{
        unit(){
            return this.info.unit ? this.info.unit : 'unidade'
        },
        min(){
            return this.info.min ? this.info.min : 'min'   
        },
        max(){
            return this.info.max ? this.info.max : 'max'   
        }
    }

}
</script>

<style scoped>
.valueSpace{
    position: relative;
    top: 4.75rem;
    text-align: center;
    left: 3rem;
    width: 50%;
    
}
.gaugeContainer{
    height: 100%;
    width: 100%
}
h2{

    font-size: 0.75rem;
}
</style>