<template>
    <b-card 
    class="card" :style="createdStyle" 
    footer-tag="footer" 
    header-tag="header" 
    @drag="drag" 
    @dragend="dragend"  
    draggable="true" 
    unselectable="on">
		<template #header>
			<div id="cardHeader" class="w-100 d-flex justify-content-between">
				<div class="d-flex flex-column justify-content-between w-100">
					<h4>{{name}}</h4>
					<p>{{type}}</p>
				</div>
                <div class="w-100 d-flex justify-content-end" style="gap: 0.5rem">
                    <b-icon-eye-fill id="popover-3"/>
                    <b-icon-arrows-fullscreen/>
                    <DisplayPopover :disabled="!created" @changeDisplay="changeDisplay"/>
                </div>
			</div>
		</template>
		<div class="w-100 h-100 body">
            <div class="w-100 h-100 d-flex justify-content-center align-items-center">
                <component 
                :info="info" 
                :is="display"/>
            </div>
		</div>
		<template #footer>
			<div class="d-flex justify-content-center w-100" style="gap: 1rem">
				<b-icon-trash-fill      @click="deleteCard"/>
				<b-icon-pencil-fill     @click="editDisplay"/>
				<b-icon-clock-history   @click="historyDisplay"/>
			</div>
		</template>
	</b-card>
</template>

<script>
import GaugeDisplay         from "./DisplayComponents/GaugeDisplay.vue"
import VerticalDisplay      from "./DisplayComponents/VerticalDisplay.vue"
import DigitalDisplay       from "./DisplayComponents/DigitalDisplay.vue"
import TextDisplay          from "./DisplayComponents/TextDisplay.vue"
import ChartDisplay         from "./DisplayComponents/ChartDisplay.vue"
import TraficLightDisplay   from "./DisplayComponents/TraficLightDisplay.vue"

import DisplayPopover       from "./DisplayPopover.vue"


export default {
    components:{
        GaugeDisplay,
        VerticalDisplay,
        DigitalDisplay,
        TextDisplay,
        ChartDisplay,
        TraficLightDisplay,
        DisplayPopover
    },
    props:{
        info:{
            type: Object,
            required: true
        },
        created:{
            type: Boolean,
            required: false,
            default: false
        },
        inGroup:{
            type: Boolean,
            required: false,
            default: false
        },
    },
    computed:{
        name(){
            return this.info.name && this.info.name != ''?  this.info.name :"Nome do display"
        },
        type(){
            return this.info.type == undefined ? "Gauge" : this.info.type
        },
        unit(){
            return this.info.unit && this.info.unit != ''?  this.info.unit : "unidade"
        },
        display(){
            return this.type === "Semáforo" ? "TraficLightDisplay" : `${this.type}Display`
        },
        createdStyle(){
            if(this.created){
                return {
                    '--max-Width': '30rem',
                }
            }else{
                return{
                    '--max-Width': 'none',
                }
            }
        },
    },
    methods:{
        drag(){
			if(this.created){
				this.$root.$refs.DisplayCardIsDragging = true
                
			}
		},
		dragend: function (e) {
            if(this.$root.$refs.gridLayout.mouseInArea()){
                this.$root.$refs.gridLayout.addCard(e, this.info)
                this.$emit("drop")
            }
			this.$root.$refs.DisplayCardIsDragging = false
		},
        deleteCard(){
            if(this.inGroup){
                this.$emit("deleteCard")
            }
        },
        editDisplay(){
            if(this.inGroup){
                this.$root.$refs.NewComponentIndex.open("display", this.info)
            }
        },
        changeDisplay(newDisplay){
            this.$emit('changeDisplay', newDisplay)
        }
    },
}
</script>

<style scoped lang="scss">
    .card{
		height: 100% !important;
        width: 100%;
		background-color: rgba(136, 135, 135, 0.4);
		border: none;
        max-width: var(--max-Width);
		background:
				linear-gradient(to right, white 3px, transparent 3px) 0 0,
				linear-gradient(to right, white 3px, transparent 3px) 0 100%,
				linear-gradient(to left, white 3px, transparent 3px) 100% 0,
				linear-gradient(to left, white 3px, transparent 3px) 100% 100%,
				linear-gradient(to bottom, white 3px, transparent 3px) 0 0,
				linear-gradient(to bottom, white 3px, transparent 3px) 100% 0,
				linear-gradient(to top, white 3px, transparent 3px) 0 100%,
				linear-gradient(to top, white 3px, transparent 3px) 100% 100%;

			background-repeat: no-repeat;
			background-size: 20px 20px;
            background-color: #00000036;
            

        .card-body{
            min-height: 13rem;
            align-items: center;
            .body{
                display:grid;
                height: 100% !important;
                min-height: 12rem;
            }
        }
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