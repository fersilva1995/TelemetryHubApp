<template>
    <b-popover target="popover-3" placeholder="top" triggers="focus" :disabled="disabled">
        <template #title>Mudar Display</template>
        <div class="list">
            <div v-for="display in displays" :key="display.value" @click="changeDisplay(display)" class="item w-100 text-center item">{{display.text}}</div>
        </div>
    </b-popover>
</template>

<script>
export default {
    props:{
        disabled: {
            type: Boolean,
            required:false,
            default: false
        }
    },
    data(){
        return{
            displays: [{
					text: "Gauge",
					value: 1,
				},
				{
					text: "Digital",
					value: 2 
				},
				{
					text: "Chart",
					value: 3
				},
				{
					text: "Text",
					value: 4
				},
				{
					text: "Semáforo",
					value: 5
				},
				{
					text: "Vertical",
					value: 6
				},
			],
        }
    },
    methods:{
        changeDisplay(newDisplay){
            this.$emit("changeDisplay", newDisplay)
        }
    }
}
</script>

<style>
.item{
    margin-top: 5px;
    background: whitesmoke;
    border-bottom: 1px solid rgb(219, 219, 219);
    cursor: pointer;
}
.item:hover{
    background: rgb(219, 219, 219);
}
</style>