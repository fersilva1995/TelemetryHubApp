<template>
    <b-form-group
        id="form"
        class="w-100"
        :invalid-feedback="invalidMessage"
        :state="validate ? validation : null"
        :required="required"
        >
            <label 
            id="label" 
            :for="inputId" 
            style="width:100%;">
                {{label}} <span class="required" v-if="required">*</span>
            </label>
            <v-select v-model="value" :id="inputId" :multiple="multiple" :options="options" @input="emitChanges" :label="'text' || 'name'">
                <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                        Não foi possivel encontrar nenhum <em>{{ search }}</em>.
                    </template>
                </template>
                <template #search="{attributes, events}">
                    <input
                    :id="inputId"
                    class="vs__search"
                    :required="!value"
                    v-bind="attributes"
                    v-on="events"
                    />
                </template>
            </v-select>
    </b-form-group>
</template>

<script>
import 'vue-select/dist/vue-select.css';
export default {
    data(){
        return{
            value: ''
        }
    },
    props:{
        options:{
            type: Array,
            required: true
        },
        label:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        invalidMessage:{
            type: String,
            required: false,
            default: ''
        },
        validate:{
            type: Boolean,
            required: false,
            default: false
        },
        state:{
            type: Function,
            required: false,
        },
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        multiple:{
            type: Boolean,
            required: false,
            default: false
        },
        selected: {
            type: Object,
            required: false,
            default: undefined
        }
    },
    computed:{
        inputId(){
            return this.name + "Input"
        },
        validation(){
            try{
                return this.state(this.value)
            }catch{
                return true
            }
        }
    },
    methods:{
        emitChanges(){
            this.$emit("change", this.value)
        },
    },
    mounted(){
        if(this.selected != undefined){
            this.value = this.selected
        }
    }
}
</script>

<style scoped>
    #form > div > input{
        height: 1.5rem;
        background-color: rgba(255, 255, 255, 0.05);
        padding: 1rem;
        border: 0.1px solid rgb(217 217 217 / 89%);
        color: white;
        border-radius: 8px;
        width: 100%;
    }
    label{
        text-align: left;
        color: white;
        opacity: 0.75;
    }
    .input{
        height: 3rem;
        background-color: rgba(255, 255, 255, 0.05);
        padding: 1rem;
        border: 0.1px solid rgba(255, 255, 255, 0.3);
        color: white;
        border-radius: 8px;
    }
    .required{
        color: rgba(255,96,96);
    }
</style>

<style lang="scss">
    #form > div{
        width: 100%;
    }
    .invalid-feedback, .is-invalid{
        position: relative !important;
        top:6px !important
    }
    .v-select.vs--searchable{
        color: black !important;
        & > div{
            background-color: rgba(255, 255, 255, 0.05);
            padding: 0.65rem;
            border: 0.1px solid rgba(255, 255, 255, 0.3);
            color: white;
            border-radius: 8px;
        }
        .vs__selected{
            color: white
        }
        .vs__actions{
            .vs__clear{
                fill: #dc3545
            }
            .vs__open-indicator{
                fill: white
            }
        }
        .vs__selected-options{
            .vs__selected{
                background: rgb(22 3 3 / 25%);
                .vs__deselect{
                    fill: #dc3545
                }
            }
    }
}

</style>