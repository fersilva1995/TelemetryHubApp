<template>
    <div  class="d-flex justify-content-center" style="height: auto;">
        <div class="userContainer">
            <Header name="Grupos" btnName="Novo Grupo" :btnAction="showAddElement"/>
            <Table :fields="fields" :items="items" componentDetails="GroupsInfo" ref="table"/>
        </div>

    </div>
</template>

<script>
import Table from "../shared/_Table.vue"
import Header from "../shared/IndexHeader.vue"
export default {
    components:{
        Table,
        Header
    },
    data() {
        return {
            filter:"",
            fields: new this.$groupHeader().header,
            items: [
                {id: 1, name: "Grupo 1", time: 10},
                {id: 1, name: "Grupo 2", time: 10},
                {id: 1, name: "Grupo 3", time: 10},
                {id: 1, name: "Grupo 4", time: 10},
            ]
        }
    },
    methods:{
        showAddElement(){
            this.$refs.table.showAddElement()
        }
    }
}
</script>

<style lang="scss">
    .userContainer{
        /* background-color: red; */
        width:100vw; 
        height:100%; 
        margin: 0 5rem;
        padding: 2rem 1rem;
    }
    hr{
        width: 100%;
        margin: 0;
        padding: 0;
        background: #acacac;
        height: 2px;
        margin-bottom: 2rem;
    }
    p{
        
        opacity: 0.5;
    }
    tbody{
        color: white
    }
</style>