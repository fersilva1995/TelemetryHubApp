<template>
    <toggle-button :value="toggle"
    color="#82C7EB"
    @change="changeToggle"
    :sync="true"
    :labels="true"
    :height="60"
    :width="150"
    :fontSize="30"/>
</template>

<script>
import {ToggleButton} from 'vue-js-toggle-button'
export default {
    components:{
        ToggleButton
    },
    data(){
        return{
            toggle: true
        }
    },
    methods:{
        changeToggle(){
            this.toggle = !this.toggle
        }
    }
}
</script>

<style>

</style>