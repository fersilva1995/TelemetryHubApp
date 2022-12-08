<template>
      <div class="container">
        <div class="graficoContainer" >
          <ApexCharts ref="realtimeChart" id="grafico" type="area" :options="opcao" :series="dados"></ApexCharts>
          <p>{{'VALOR'}} {{'unidade'}}</p>
        </div>
      </div>
</template>

<script>
import ApexCharts from 'vue-apexcharts'

export default {
  components:{
    ApexCharts
  },
  data(){
    return{
      dados: [
        {
          data:[10, 5, 12, 18, 15,]
        }
      ],

      opcao: {
        chart:{
          redrawOnParentResize: true,
          toolbar:{show:false},
          type: 'area',
          zoom:{enabled:false}
        },

        dataLabels:{
          enabled: false
        },

        stroke:{
          curve:'smooth',
          width:3
        },

        title:{
          text: "Gráfico de teste",
          align: 'center'
        },

        colors: ['#003cff'],
        fill:{
          shade: 'dark',
        
          colors: ['blue']
        },
        grid:{
          borderColor: '#000f26d1',
          clipMarkers: false,
          yaxis:{
            lines:{show:false}
          },
        },
        markers: {
          size: 3,
          colors: ["#4972b366"],
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
          max:20,
          min :0,
          labels:{show:true, style:{colors:['white']}}
        }

      }
    }
  },
}
</script>

<style scoped lang="scss">
:root{
  --tamanho: 300px
}
.container{
  padding:10rem;
  height:90vh;
  width:100vw;
  display:flex;
  justify-content: flex-start;
  align-items:center;
}
.graficoContainer{
  height:var(--tamanho);
  background:red;
  width:var(--tamanho);
  #grafico{
    min-height: 0 !important;
    .apexcharts-canvas{
        height:var(--tamanho) !important;
        width:var(--tamanho) !important;
        svg{
          height:var(--tamanho) !important;
          width:var(--tamanho) !important;
        }
    }
  }
}
</style>