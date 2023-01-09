<template>
    <div  class="d-flex justify-content-center" style="height: auto">
        <div class="userContainer">
            <Header name="Equipamentos" btnName="Novo Equipamento" :btnAction="show"/>
            <Table :fields="fields" :items="items" componentDetails="EquipamentsInfo" ref="table"/>
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
            fields: new this.$equipamentsHeader().header,
            items: [
                {id: 1001, name: 'DVC-X1', user: "admin", password: "admin", tipo: "3", status: true},
                {id: 1001, name: 'DVC-X1', user: "admin", password: "admin", tipo: "3", status: true},
                {id: 1001, name: 'DVC-X1', user: "admin", password: "admin", tipo: "3", status: true},
            ]
        }
    },
    methods:{
        show(){
            this.$refs.table.showAddElement()
            console.log("aaaaaaa")
        }
    }
}
</script>

<style lang="scss">
    .userContainer{
        /* background-color: red; */
        width:100%; 
        height:100%; 
        margin: 0 10rem;
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