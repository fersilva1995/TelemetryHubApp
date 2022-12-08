<template>
    <div class="seila">
		<div class="verticalContainer">
			<small  style="color:greenyellow; position:relative; left:-15px">{{config.Unit == undefined ? 'MAX' : config.Maximum}}</small>
			<div class="verticalWrapper" :style="barColor">
				<div class="verticalHeight" :style="barHeight"></div>
			</div>
			<small style="color:red; position:relative; left:-15px">{{config.Unit == undefined ? 'MIN' : config.Minimum}}</small>
		</div>
		<div class="infoContainer">
			<h4>{{config.Unit == undefined ? 'VALOR' : value}}</h4>
			<small>{{config.Unit == undefined ? 'unidade' : config.Unit}}</small>
		</div>
	</div>
</template>

<script>
/* eslint-disable */

export default {
    props:{
    	data: Number,
		config: Object
    },
	mounted(){
    	// setInterval(()=>{
        //     this.data = Math.floor(Math.random() * 25);
        // }, 3000);
    },
	computed: {
		value(){
			return (this.data * this.config.Multiplier) + parseInt(this.config.Constant) 
		},
		barHeight(){
			return{
				'--bar-height': 100 - ((100 * this.value) / this.config.Maximum) + "%"
			}
		},
		barColor(){
			const diference = this.config.Maximum - this.config.Minimum
			if(this.value < (diference * 0.33)){
				return{
					'--bar-color': 'red'
				}
			}
			else if(this.value > (diference * 0.66)){
				return{
					'--bar-color': 'yellowgreen'
				}
			}
			else{
				return{
					'--bar-color': 'yellow'
				}
			}
		}
	}
}
</script>

<style scoped>
	.seila{
		height:100%;
		display:flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}
	.verticalContainer{
		height: 100%;
    	display: flex;
    	flex-direction: column;
	}
	.verticalWrapper{
		min-height: 5rem;
		height: 100%;
		width:2rem;

		background: var(--bar-color);
	}
	.verticalHeight{
		background: #bbb3b3;
		height: var(--bar-height);
		width:2rem;
		transition: height 1s ease-in-out
	}
</style>