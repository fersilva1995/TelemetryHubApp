<template>
    <div class="w-100">
        <div class="w-100 d-flex justify-content-end">
            <b-input-group class="searchGroup">
                <b-input-group-prepend>
                    <b-input-group-text>
                        <b-icon icon="search" />
                    </b-input-group-text>
                </b-input-group-prepend>

                <b-form-input type="text" v-model="filter"></b-form-input>

            </b-input-group>
        </div>
        <b-table striped :items="items" :fields="fields" :filter="filter" thead-class="green-bg bg-dark text-white" style="text-align: center">
            <template #cell(details)="row">
                <b-button :id="row.item.id" variant="secondary" size="sm" @click="row.toggleDetails" >
                    Mostrar 
                </b-button>
            </template>
            <template #row-details>
                <div class="detailsContainer">
                    <component 
                    :is="componentDetails"/>
                </div>
            </template>
        </b-table>
        <div class="w-100 newItemContainer">
            <div class="newItem" id="newItemForm">
                <span>
                    <h1 class="w-100 text-center">Novo</h1>
                    <component
                        class="text-center"
                        :is="componentDetails"/>
                </span>
            </div>
        </div>
        <div style="height:1rem;width:100%;background-color:white"></div>

    </div>
</template>

<script>

import UserInfo from "../users/UserInfo.vue"
import EquipamentsInfo from "../equipaments/EquipamentsInfo.vue"
import GroupsInfo from "../groups/GroupsInfo.vue"
export default {
    props:{
        items:{
            type:Array,
            required: true
        },
        fields:{
            type:Array,
            required:true
        },
        componentDetails:{
            type: String,
            required:true
        }
    },
    methods:{
        showAddElement(){
            this.isOpen = !this.isOpen
            const form = document.getElementById("newItemForm").classList
            if(!this.isOpen){
                form.remove("detailsContainer")
            }else{
                form.add("detailsContainer")
            }
        }
    },
    components:{
        "UserInfo":UserInfo,
        "EquipamentsInfo":EquipamentsInfo,
        "GroupsInfo":GroupsInfo
    },
    data(){
        return{
            filter: "",
            isOpen: false
        }
    }

}
</script>

<style lang="scss">
    .table{
        margin-bottom: 0;
    }
    .table thead th{
        background: white;
        color: black;
    }
    .searchGroup{
        width: 20% !important;
        margin: 1rem 0;
    }
    .searchGroup > .form-control{
        border: none;
        color: white;
        background-color: rgba(255, 255, 255, 0.2);
        // border: 0.1px solid rgb(217 217 217 / 89%);
        &:active, &:focus{
            color: white;
            background-color: rgba(255, 255, 255, 0.2);;
        }
    }
    .input-group-text{
        border: none !important;
        background-color: rgb(26 26 26 / 21%) !important;
        color: white !important;
    }
    .detailsContainer{
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

        background-color: hsla(206, 29%, 17%, 0.66);
    }
    .newItemContainer:has(.detailsContainer){
        padding: 1rem;
        border-top: 1px solid white

    }
    .newItem{
        transform: scaleY(0);
        transition: transform 0.25s ease-in-out;
        transform-origin: top;
        height: 0;

    }
    .newItem.detailsContainer{
        height: auto;
        transform: scaleY(1);
        transition: transform 0.25s ease-in-out;
        transform-origin: top;
        outline: 1px solid limegreen;
        outline-offset: -6px;

    }
</style>