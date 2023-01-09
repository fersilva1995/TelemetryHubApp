<template>
  <div>
    <div>
      <ApexCharts ref="realtimeChart" id="grafico" type="area" :options="opcao" :series="dados"></ApexCharts>
    </div>
    <div v-resize-text class="label w-100 text-center d-flex justify-content-center align-items-end" style="gap: 0.5rem">
      <h3>Valor</h3><h6 style="position:relative;top:-3px">{{unit}}</h6>
    </div>
  </div>
</template>

<script>
import ApexCharts from 'vue-apexcharts'

export default {
  components:{
    ApexCharts
  },
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
  data(){
    return{
      dados: [
        {
          data: [10, 5, 12, 18, 15,]
        }
      ],

      opcao: {
        title:{text: ''},
        chart:{
          width: "100%",
          // redrawOnParentResize: true,
          toolbar:{show:false},
          type: 'area',
          zoom:{enabled:false}
        },

        dataLabels:{
          enabled: false
        },

        stroke:{
          curve:'smooth'
        },

        colors: ['#ff9e04'],
        fill:{
          shade: 'dark',
        
          colors: ['#ff9e04']
        },
        grid:{
          borderColor: '#ff9e04',
          clipMarkers: false,
          yaxis:{
            lines:{show:false}
          },
        },
        markers: {
          size: 3,
          colors: ["#ff9e04"],
          strokeColor: "white",
          strokeWidth: 1
        },
        tooltip:{
          theme: "dark"
        },
        labels: [1, 2, 3, 4, 5],
        xaxis:{
          labels:{
            show:false
          }
        },
        yaxis:{
          show: true,
          forceNiceScale: true,
          showAlways: false,
          max: 20,
          min :0,
          labels:{show:true, style:{colors:['white']}}
        }

      }
    }
  },
}
</script>

<style>

</style>