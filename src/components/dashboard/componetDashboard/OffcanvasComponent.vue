/* eslint-disable */
<template>
    <div>
        <b-sidebar id="sidebar-right" :title="actionDescription" right shadow backdrop-variant="dark" backdrop no-close-on-backdrop no-close-on-esc>
            <div class="px-3 py-2">
                <FORM @info="getInfo" :edit="edit"/>
            </div>
        </b-sidebar>
    </div>
</template>
<script>
import FORM from './DisplayForm.vue'
export default {
    components:{
        FORM
    },
    methods:{
        getInfo(info){
            this.$parent.getInfo(info)
        }
    },
    props:{
        edit: Object
    },
    computed:{
        actionDescription(){
            if(this.edit){
                return "Editando um display"
            }else return "Adicionando um novo display"
        }
    }
}
</script>

<style>
    #sidebar-right{
        background: #041526 !important;
        color:#d5d5fd !important
    }
    .close, .text-dark{
        background: #00c4ff;
        border-color: white;
    }
    ::-webkit-scrollbar {
	width: 5px;
	}

	/* Track */
	::-webkit-scrollbar-track {
	box-shadow: inset 0 0 5px grey; 
	border-radius: 10px;
	}
	
	/* Handle */
	::-webkit-scrollbar-thumb {
	background: rgb(171, 198, 255);
	border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
	background: rgb(133, 170, 250);; 
	}

</style>