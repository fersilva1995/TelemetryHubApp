<template>
    <div class="grid">
        <div style="grid-column: 1/2">
            <div class="tableHeader text-center p-2">Disponiveis</div>
            <div class="tableBody p-3">
                <div v-for="item in items" :key="item.id" class="">
                    <div class="d-flex align-items-center" style="gap: 1rem">
                        <input type="checkbox" name="check" :id="'checkbox'+item.id" @click="selectedAdd(item)">
                        {{item.text}}
                    </div>
                    <hr>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center flex-column align-items-center btnArea" style="gap: 1rem">
            <button @click="update">
                <b-icon-arrow-left-right/><br>
                atualizar
            </button>
        </div>
        <div style="grid-column: 3/4">
            <div class="tableHeader text-center p-2">Selecionados</div>
            <div class="tableBody p-3">
                <div v-for="selected in selectedItems" :key="selected.id">
                    <div class="d-flex align-items-center" style="gap: 1rem">
                        <input type="checkbox" name="check" :id="'checkbox'+selected.id" @click="selectedRemove(selected)">
                        {{selected.text}}
                    </div>
                    <hr>
                </div>
            </div>
        </div>
    </div>
</template>

<script> 
export default {
    data(){
        return{
            addItems: [],
            removeItems: [],

            selectedItems:[],

            avaliableItems: []
        }
    },
    props:{
        items:{
            type: Array,
            required: true
        },
    },
    methods:{
        selectedAdd(item){
            if(!this.addItems.includes(item)) this.addItems.push(item)
            else this.addItems = this.addItems.filter(i => {if(item != i) return i})
        },
        selectedRemove(item){
            if(!this.removeItems.includes(item)) this.removeItems.push(item)
            else this.removeItems = this.removeItems.filter(i => {if(item != i) return i})
        },

        update(){
            this.addItems.forEach(item => {
                this.selectedItems.push(item)
                this.removeFromAvaliableList(item)
            })
            this.removeItems.forEach(item => {
                this.avaliableItems.push(item)
                this.removeFromSelectedList(item)

            })

            this.addItems = [];
            this.removeItems = [];

            this.$emit("selectedItems", this.selectedItems)
        },

        removeFromAvaliableList(item){
            this.avaliableItems = this.avaliableItems.filter(i => {
                if(item != i){
                    return i
                }
            })
        },
        removeFromSelectedList(item){
            this.selectedItems = this.selectedItems.filter(i => {
                if(item != i){
                    return i
                }
            })
        }
    },
    mounted() {
        this.avaliableItems = this.items
    }
}
</script>

<style scoped>
    .btnArea{
        grid-column: 2/3;
    }
    .grid{
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: 45% 10% 45%;
    }
    .tableHeader{
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 4rem;
        -webkit-box-shadow:inset 0px 0px 0px 1px white;
        -moz-box-shadow:inset 0px 0px 0px 1px white;
        box-shadow:inset 0px 0px 0px 1px white;
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
        padding: 1rem;
        background-color: hsl(206deg 37% 14% / 91%);
    }
    .tableBody{
        max-height: 25rem;
        height: auto;
        overflow-y: auto;
        border: 1px solid white;
        background-color: hsla(206deg, 29%, 17%, 0.66);
        border-top: none;
    }
</style>