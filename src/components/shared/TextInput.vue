<template>
    <b-form-group
        class="form w-100"
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

            <b-form-input
            :type="type"
            :disabled="disabled"
            class="teste"
            :state="validate ? validation : null" 
            :style="disabledColor"
            :id="inputId" 
            v-model="input"
            @change="emitChanges" 
            required
            :value="value"
            trim></b-form-input>

    </b-form-group>
</template>

<script>
export default {
    data(){
        return{
            input: this.value
        }
    },
    props:{
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
        type:{
            type: String,
            required: false,
            default: "text"
        },
        value:{
            type: undefined,
            required: false,
            default: ''
        },
        disabled:{
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed:{
        inputId(){
            return this.name + "Input"
        },
        validation(){
            try{
                return this.state(this.input)
            }catch{
                return true
            }
        },
        disabledColor(){
            if(this.disabled) return {"--background-color" : "#32323233"}
            else return {"--background-color" : "#ffffff0d"}
        }
    },
    methods:{
        emitChanges(){
            this.$emit("changeValue", this.input)
        },
    },
    mounted(){
        this.input = this.value
    }
}
</script>

<style scoped>
    .form > div > input{
        height: 3rem;
        background-color: var(--background-color);
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

<style>
    .form > div{
        width: 100%;
    }
    .invalid-feedback, .is-invalid{
        position: relative !important;
        top:6px !important
    }

</style>