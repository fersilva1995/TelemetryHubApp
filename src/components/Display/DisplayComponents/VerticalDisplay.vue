<template>
	<div class="w-100 h-100 grid">
		<div class="w-100 h-100 d-flex justify-content-center align-items-center progress-container" ref="container">
			<div style="width: 100%; max-width: 200px">
				<b-progress :value="value" :max="100" :variant="barColor" animated></b-progress>
			</div>
		</div>
		<div class="w-100 h-100 d-flex flex-column justify-content-between">
			<p class="text-success">{{max}}</p>
			<!-- v-resize-text -->
			<div class="w-100">
				<h2>Valor</h2>
				<h6>{{unit}}</h6>
			</div>
			<p class="text-danger" style="position:relative; top:20px">{{min}}</p>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				value: 77,
				// width: 100,
			}
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
			},
			min(){
				return this.info.min ? this.info.min : 'min'
			},
			max(){
				return this.info.max ? this.info.max : 'max'
			},
			barColor(){
				if(this.value >= 66) return 'success'
				if (this.value >= 33) return 'warning'
				return 'danger'
			},
		},
		mounted(){
			// ! é o unico jeito que funciona a barra vertical ter 100% sem extrapolar os limites do card
			// setInterval(()=>{
			// 	try{
			// 		this.width = `width: ${this.$refs.container.offsetHeight - 20}px`
			// 	}catch{
			// 		// eslint-disable-next-line
			// 	}
			// },100)
		}
	}
</script>

<style scoped>
	.grid{
		display: grid;
		grid-template-columns: 70% 30%;
	}
	.progress{
		transform: rotate(-90deg);
		height: 50px
	}
	p{
		opacity: 1;
	}
</style>