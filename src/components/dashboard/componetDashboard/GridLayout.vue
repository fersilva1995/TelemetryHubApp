<template>
    <grid-layout 
		style="min-height:5rem"
		:col-num="3"
        :layout.sync="groupPositions"
		ref="Group"
		:row-height="360"
		:is-draggable="true"
		:is-resizable="true"
		:vertical-compact="true"
		:use-css-transforms="true">

        <grid-item
            style="border:none;background:transparent" 
            v-for="(item, index) in groupDisplays"
            :key="groupPositions[index].i"
            :x="groupPositions[index].x"
            :y="groupPositions[index].y"
            :w="groupPositions[index].w"
            :h="groupPositions[index].h"
            :i="groupPositions[index].i"
            :min-h="1"
            :max-h="3"
            :preserveAspectRatio="false">

            <!-- <div class="w-100 h-100" style="background:red"></div> -->
            <DisplayCard 
            :info="item" 
            :inGroup="true"
            @deleteCard="deleteCard(item, index)"/>

        </grid-item>
    </grid-layout>
</template>

<script>
import DisplayCard from "../../Display/DisplayCard.vue"
import {
	GridLayout,
	GridItem
} from "vue-grid-layout"

let DragPos = {
	"x": null,
	"y": null,
	"w": 1,
	"h": 1,
	"i": null
};
let cardPos = {
	"x": null,
	"y": null
};
export default {
    components:{
        GridLayout,
        GridItem,
        DisplayCard
    },
    props:{
        group:{
            type: undefined
        }
    },
    data(){
        return{
            groupPositions : [],
            groupDisplays: [],
            pos: {},
            toBeDeleted: {}
        }
    },
    methods:{
        getPos(){
            this.groupDimensions = this.$refs.Group.$el.getBoundingClientRect()
            this.pos.top = this.groupDimensions.top
			this.pos.right = this.groupDimensions.right
			this.pos.left = this.groupDimensions.left
			this.pos.bottom = this.groupDimensions.bottom
        },
        mouseInArea(){
            return ((cardPos.x > this.pos.left) && (cardPos.x < this.pos.right)) && ((cardPos.y > this.pos.top) && (cardPos.y < this.pos.bottom))
        },
        dragPos(){
            if ((this.groupPositions.findIndex(item => item.i === 'drop')) === -1) {
				try {
					this.groupPositions.push({
						x: (this.groupPositions.length * 2) % 3,
						y: this.groupPositions.length + 3,
						w: 1,
						h: 1,
						i: 'drop',
					});
				} catch {
                    console.error("")
                }
			}

			//não sei
			let index = this.groupPositions.findIndex(item => item.i === 'drop');
			if (index !== -1) {
                try {
                    this.$refs.Group.$children[this.groupPositions.length].$refs.item.style.display = "none";
				} catch {
                    console.error("")
                }
				let el = this.$refs.Group.$children[index];
				el.dragging = {
                    "top": cardPos.y - this.groupDimensions.top,
					"left": cardPos.x - this.groupDimensions.left
				};

				let new_pos = el.calcXY(cardPos.y - this.groupDimensions.top, cardPos.x - this.groupDimensions.left);
                console.warn(new_pos.x, new_pos.y)
				this.$refs.Group.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1);
				DragPos.i = String(index);
				DragPos.x = this.groupPositions[index].x;
				DragPos.y = this.groupPositions[index].y;
                console.log(DragPos)

                this.$root.$refs.gridLayout = this
			}
        },
        addCard(event, info){
            event
            this.$refs.Group.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
            this.groupPositions = this.groupPositions.filter(obj => obj.i !== 'drop');
            this.groupDisplays.push(info)
            this.groupPositions.push({
				x: DragPos.x,
				y: DragPos.y,
				w: 1,
				h: 1,
				maxH: 3,
				minH: 1,
				i: DragPos.i,
			});
            this.$root.$refs.NewComponentIndex.close(true)
            this.$root.$refs.NewComponentIndex.$refs.buttons.showAddButtons(true)
            console.error(this.groupDisplays, this.groupPositions)
        },
        deleteCard(item, index){
            this.toBeDeleted = {item, index}
            this.$emit("showModal")
        },
        confirmDelete(){
            this.groupDisplays = this.groupDisplays.filter(display => {
                if(display != this.toBeDeleted.item) return display 
            })
            this.groupPositions.splice(this.toBeDeleted.index, 1)
            this.toBeDeleted = {}
        },
        editCard(){
            console.log("aaaaaaaaaaaaaaaa")
            console.warn(this.toBeDeleted.item)
            this.$root.$refs.NewComponentIndex.open("display", this.toBeDeleted.item)
        }
    },
    mounted(){
        document.addEventListener("dragover", function (e) {
            cardPos.x = e.clientX
            cardPos.y = e.clientY
		});
        setInterval(()=>{
            if(this.$root.$refs.DisplayCardIsDragging){
                this.getPos();
                if(this.mouseInArea()){
                    this.dragPos()
                }
            }
        },100)
    },
}
</script>

<style>

</style>