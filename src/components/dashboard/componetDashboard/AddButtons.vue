<template>
	<div>
		<b-button size="md" :variant="firstButtonStyle" @click="showAddButtons(scale)">Novo</b-button>
		<b-button size="md" :variant="groupButtonStyle" @click="addGroup" class="btnAdd ml-1" :style="scaleStyle">Grupo</b-button>
		<span id="displaybtn">
			<b-button size="md" :disabled="enableDisplay" :variant="displayButtonStyle" @click="addDisplay" class="btnAdd ml-1" :style="scaleStyle">Display</b-button>
		</span>
		<b-tooltip target="displaybtn" :disabled="!enableDisplay">Você só pode criar um display após criar pelo menos um grupo</b-tooltip>
	</div>
</template>

<script>
export default {
	data(){
		return{
			scale: 0,
			firstButtonStyle: "outline-success",
			groupButtonStyle:"outline-success",
			groupOpen: false,
			displayButtonStyle:"outline-success",
			displayOpen:false,
		}
	},
	methods:{
		showAddButtons(state){
			this.scale = state
			if(this.scale){
				this.scale = 0;

				this.$emit("close", "display")
				this.displayOpen = false

				this.groupOpen = false
				this.$emit("close", "group")

				this.firstButtonStyle = "outline-success"
				this.groupButtonStyle = "outline-success"
				this.displayButtonStyle = "outline-success"

			}
			else{
				this.scale = 1;
				this.firstButtonStyle = "success"
			}
		},
		addDisplay(){
			if(this.displayOpen){
				this.displayButtonStyle="outline-success"
				this.displayOpen=false
                this.$emit("close", "display")

			}else{
                this.$emit("open", "display")
				this.displayButtonStyle="success"
				this.displayOpen=true
				this.groupButtonStyle="outline-success"
				this.groupOpen=false
                this.$emit("close", "group")

			}
		},
		addGroup(){
			if(this.groupOpen){
				this.groupButtonStyle="outline-success"
				this.groupOpen=false
                this.$emit("close", "group")
			}else{
                this.$emit("close", "display")
				this.groupButtonStyle="success"
				this.groupOpen=true
				this.displayButtonStyle="outline-success"
				this.displayOpen=false
                this.$emit("open", "group")

			}

		},

	},
	props:{
		groupsLength:{
			type:Number,
			required:true
		}
	},
	computed:{
		scaleStyle(){
			return {
				'--scale-X': this.scale
			}
		},
		//? Um display só pode ser adicionado caso haja um grupo para ele ser adicionado.
		enableDisplay(){
			return !this.groupsLength > 0
		}
	}
}
</script>

<style scoped lang="scss">

	.btnAdd{
		transform: scaleX(var(--scale-X));
		transform-origin: left;
		transition: transform 0.1s ease;
	}
</style>