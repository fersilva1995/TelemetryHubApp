/* eslint-disable */
<template>
  <div class="semafaroContainer">
    <div class="semafaroWrapper">
        <div class="semafaro" :style="semafaroColor"></div>
        <h2>{{config.Unit == undefined ? 'Indicador' : semafaroStatus}}</h2>
    </div>
    <h4>{{config.Unit == undefined ? 'VALOR' : value}} {{config.Unit == undefined ? 'unidade' : config.Unit}}</h4>
  </div>
</template>

<script>
export default {

    props:{
        data: Number,
        config: Object
    },
    mounted(){
        // setInterval(()=>{
        //     this.data = Math.floor(Math.random() * 25);
        // }, 3000);
        // console.log(this.config.Unit)
    },
    data(){
        return{
        }
    },
    computed:{
        value(){
          return (this.data * this.config.Multiplier) + parseInt(this.config.Constant)  
        },
        semafaroStatus(){
            const diference = parseInt(this.config.Maximum) - parseInt(this.config.Minimum)
            if(this.value < (diference * 0.33) ){
                return "Baixo"
			}
			else if(this.value > (diference * 0.66)){
                return "Alto"
			}
			else{
                return "Médio"
			}

        },
        semafaroColor(){
            const diference = this.config.Maximum - this.config.Minimum
            if(this.value < (diference * 0.33)){
				return{
					'--semafaro-color': 'red'
				}
			}
			else if(this.value > (diference * 0.66)){
				return{
					'--semafaro-color': 'yellowgreen'
				}
			}
			else{
				return{
					'--semafaro-color': 'yellow'
				}
			}

        }
    }
}
</script>

<style scoped>
    .semafaroContainer{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: space-around;

    }
    .semafaroWrapper{
        height: 100%;
        width: 100%;
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }
    h2{
        animation-name: blink;
        animation-duration: 0.75s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-direction: alternate-reverse;
    }
    .semafaro{
        height: 1.75rem;
        width: 1.75rem;
        background: var(--semafaro-color);
        border: 2px solid #bbb3b3;
        border-radius: 100%;
        animation-name: blink;
        animation-duration: 0.75s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-direction: alternate-reverse;
    }
    
    @keyframes blink{
        to{
            opacity: 0.5;
        }
    }

</style>