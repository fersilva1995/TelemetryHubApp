<template>
    <div  class="d-flex justify-content-center" style="height: auto">
        <div class="userContainer">
            <Header name="Users" btnName="Novo Usuário" :btnAction="showAddElement"/>
            <Table :fields="fields" :items="items" componentDetails="UserInfo" ref="table"/>
        </div>

    </div>
</template>

<script>
// import Button from '../shared/_Button.vue'
import Table from "../shared/_Table.vue"
import Header from "../shared/IndexHeader.vue"
export default {
    components:{
        Header,
        // "myButton": Button,
        Table
    },
    data() {
        return {
            filter:"",
            fields: new this.$userHeader().header,
            items: [
                {id: 10001, name: "Eduardo", registration: 10},
                {id: 1, name: "Pedro", registration: 10},
                {id: 1, name: "Eduardo", registration: 10},
                {id: 1, name: "Eduardo", registration: 10},
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