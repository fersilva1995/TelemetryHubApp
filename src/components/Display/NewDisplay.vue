<template>
	<div class="grid">
		<div class="preview">
			<card :info="display" :created="created" @drop="dropped" class="displayCard"/>
		</div>
		<div class="form">
			<div class="w-100 d-flex justify-content-between">
				<h5 style="display:inline">{{actionLabel}}</h5>
				<b-icon-x-lg @click="close"/>
			</div>
			<info @change="change" @create="create" ref="form" :info="info"/>
		</div>
	</div>
</template>

<script>
import DisplayCard from "./DisplayCard.vue"
import DisplayInfo from "./DisplayInfo.vue"
export default {
	data(){
		return{
			display: {},
			created: false
		}
	},
	props:{
		info: {
			type: Object,
			required:false,
		}
	},
	components:{
		"card": DisplayCard,
		"info": DisplayInfo
	},
	computed:{
		actionLabel(){
			return Object.keys(this.info).length !== 0 ? "Atualizar Display" : "Novo Display"
		}
	},
	methods:{
		change(newDisplay){
			this.display = newDisplay
		},
		create(){
			document.querySelector(".preview").style.gridColumn = '1/3'
			document.querySelector(".preview").style.borderRight = 'none'
			document.querySelector(".form").style.display = 'none'
			document.querySelector(".card").style.cursor = 'grab'
			this.created = true
		},
		dropped(){
			document.querySelector(".preview").style.gridColumn = '1/2'
			document.querySelector(".preview").style.borderRight = 'initial'
			document.querySelector(".form").style.display = 'initial'
			document.querySelector(".card").style.cursor = 'blocked'
			this.created = false
			this.$refs.form.reset();
		},
		close(){
			this.$root.$refs.NewComponentIndex.close(true)
		}
	},
	mounted(){
		this.created = false
	}
}
</script>

<style scoped lang="scss">
	p{
		font-size: 0.9rem;
	}
	.grid{
		width: 100%;
		height: auto;
		display: grid;
		grid-template-columns: 30% 69%;
		gap: 1%;
		grid-template-areas: 'preview' 'form';
	}
	.preview{
		height: auto;
		display:flex;
		justify-content: center;
		align-items: center;
		padding-right: 1rem;
		border-right: 5px solid #ff9e04;
	}
	svg.bi-x-lg.b-icon.bi{
		fill: #ff0018;
		cursor: pointer;
	}
	.form{
		min-height: 18rem;
		// background-color: blue;
	}
	.card{
		height: 100%;
		cursor: not-allowed;
		background-color: rgba(136, 135, 135, 0.4);
		border: none;
		background:
				linear-gradient(to right, white 4px, transparent 4px) 0 0,
				linear-gradient(to right, white 4px, transparent 4px) 0 100%,
				linear-gradient(to left, white 4px, transparent 4px) 100% 0,
				linear-gradient(to left, white 4px, transparent 4px) 100% 100%,
				linear-gradient(to bottom, white 4px, transparent 4px) 0 0,
				linear-gradient(to bottom, white 4px, transparent 4px) 100% 0,
				linear-gradient(to top, white 4px, transparent 4px) 0 100%,
				linear-gradient(to top, white 4px, transparent 4px) 100% 100%;

			background-repeat: no-repeat;
			background-size: 20px 20px;
		h4{
			font-size: 1.2rem;
		}
		h6{
			font-size: 0.9rem ;
		}
		header{
			margin-bottom: 0;
			padding-bottom: 0;
		}
		header, footer{
			border-color: rgb(255, 255, 255, 0.1);
		}
		svg{
			opacity: 0.5;
			&:hover{
				opacity: 1;
			}
		}
	}
</style>