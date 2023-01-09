<template>
  <div class="w-100 p-3">
		<add-buttons @open="open" @close="close" ref="buttons" :groupsLength="groupsLength" />
		<div class="mt-2 newComponent" :style="scaleStyle">
			<component
			:is="component"
			:info="info"
			:newGroupFunction="newGroupFunction"
			/>
		</div>
  </div>
</template>

<script>
import AddButtons from "./AddButtons.vue"
import GroupInfo from "./Group/NewGroup.vue"
import DisplayInfo from "../../Display/NewDisplay.vue"
export default {
	components:{
		AddButtons,
		"GroupInfo": GroupInfo,
		"DisplayInfo": DisplayInfo,
	},
	data(){
		return{
			scale: 0,
			height: 0,
			component: undefined 
		}
	},
	props:{
		groupsLength:{
			type:Number,
			required:true
		},
		newGroupFunction: Function
	},
	computed:{
		scaleStyle(){
			return {
				'--scale-Y': this.scale,
				'--height': this.height
			}
		}
	},
	methods:{
		open(e, info={}){
		const closingTime = setTimeout(()=>{
				if(Object.keys(info).length !== 0){
					this.$refs.buttons.showAddButtons(1)
				}
				this.scale = 1;
				this.height = 'auto'
				this.info = info
				console.log("AAAAAAAAAAAAAA")
				this.component = e == "display" ? "DisplayInfo" : "GroupInfo"
				clearTimeout(closingTime)
			},300) 
		},
		close(closeTabs=false){
			console.log(closeTabs)
			// if(closeTabs) this.$refs.buttons.showAddButtons(1)
			this.scale = 0;
			this.height = 0
		},
		newGroup(e){
			this.$emit("newGroup", e)
		}
	},
	mounted(){
		this.$root.$refs.NewComponentIndex = this
	}
}
</script>

<style scoped>
.newComponent{
    height: var(--height) !important;
	transform: scaleY(var(--scale-Y));
    transition: transform 0.2s ease;
    transform-origin: top;
    padding: 1rem;
    background-color: hsla(206deg, 29%, 17%, 0.66);
    border: 3px solid #25c9ff
}
</style>

