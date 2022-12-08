/* eslint-disable */
<template>
      <!-- <div class="graficoContainer" :style="size"> -->
        <div class="wrapper" :style="size">
          <ApexCharts ref="realtimeChart" id="grafico" type="area" :options="opcao" :series="dados"></ApexCharts>
        </div>
        <!-- <p>{{config.Unit == undefined ? 'VALOR' : value}} {{config.Unit == undefined ? 'unidade' : config.Unit}}</p> -->
      <!-- </div> -->
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
          data: this.data ? [] : [10, 5, 12, 18, 15,]
        }
      ],

      opcao: {
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
          curve:'smooth',
          width:3,
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
            lines:{show:this.data != undefined ? true : false}
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
          max: this.data != undefined ? parseInt(this.config.Maximum) : 20,
          min :this.data != undefined ? parseInt(this.config.Minimum) : 0,
          labels:{show:true, style:{colors:['white']}}
        }

      }
    }
  },
  props:{
    data:{
      required:false,
      type: Number
    }, 
    config:{
      required:false,
      type: Object
    },
    maxWidth:{
      required:false,
      type: Number
    },
    maxHeight:{
      required:false,
      type: Number
    }
  },
  mounted(){
    console.warn(this.maxWidth)
    console.warn(this.maxHeight)
    if(!isNaN(this.value)){
      setInterval(()=>{  
        if(this.dados[0].data.length == 5){
          this.dados[0].data.shift()
        }
        this.dados[0].data.push(this.value)
        var d = new Date();
        d = new Date(d.getTime() - 3000000);
        var date_format_str = d.getFullYear().toString() + "-" + ((d.getMonth() + 1).toString().length == 2 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1).toString()) + "-" + (d.getDate().toString().length == 2 ? d.getDate().toString() : "0" + d.getDate().toString()) + " " + (d.getHours().toString().length == 2 ? d.getHours().toString() : "0" + d.getHours().toString()) + ":" + ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2 ? (parseInt(d.getMinutes() / 5) * 5).toString() : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) + ":00";
        if(this.opcao.labels.length == 5){
          this.opcao.labels.shift()
        }
        this.opcao.labels.push(date_format_str)
        try{
          this.updateSeriesLine()
        }catch{
          console.log("error");
        }
      }, 1000)
    }
  },
  methods:{
    updateSeriesLine() {
      this.$refs.realtimeChart.updateSeries([{
        data: this.dados[0].data,
      }], false, true);
    },
  },
  computed:{
    value(){
      return (this.data * parseInt(this.config.Multiplier)) + parseInt(this.config.Constant) 
    },
    size(){
      return{
        '--height' : `${this.maxHeight - (this.maxHeight * 0.2)}px`,
        '--width' : `${this.maxHeight - (this.maxHeight * 0.2)}px`
      }
    }
  },
  watch: {
    data(){
    },
    opcao:{
      handler(){
      },
      deep:true
    }
  }
}
</script>

<style scoped lang="scss">

.wrapper{
  height: var(--height);
  width:100%;
}

.graficoContainer{
    display:flex;
    flex-direction: column;
    justify-content:center;
    text-align:center;
    align-items:center;
    height:auto;
    width:auto;
    min-height: 100px;
}
#grafico{
    min-height: 0 !important;
    width: auto;
    display: flex;
    justify-content: center;
    .apexcharts-canvas{
        height:auto;
        width:auto;
        // height:var(--size) !important;
        // width:var(--size) !important;
        svg{
          height:auto;
          width:auto;
          // height:var(--size) !important;
          // width:var(--size) !important;
        }
    }
}
</style>