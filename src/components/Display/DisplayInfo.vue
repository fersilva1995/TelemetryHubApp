<template>
    <b-form class="config">
        <div class="control">
            <TextInput name="name" label="Nome" :required="true" @changeValue="(newValue) => display.name = newValue"/>
        </div>
        <div class="control">
            <SelectInput name="type" label="tipo" :options="options" :selected="options[0]" :required="true" @change="(newValue) => display.type = newValue.text"/>
        </div>

        <div class="control">
            <TextInput name="unit" label="Unidade" :disabled="disabled" :required="true" @changeValue="(newValue) => display.unit = newValue"/>
        </div>

        <div class="w-100 btnGroup quarter">
            <div class="control">
                <TextInput name="min" type="number" :disabled="disabled" label="Valor Minimo" :required="true" @changeValue="(newValue) => display.min = newValue"/>
            </div>
            <div class="control">
                <TextInput name="max" type="number" :disabled="disabled" label="Valor Maximo" :required="true" @changeValue="(newValue) => display.max = newValue"/>
            </div>
            <div class="control">
                <TextInput name="constant" type="number" :disabled="disabled"  label="Valor Constante" :required="true" @changeValue="(newValue) => display.constant = newValue"/>
            </div>
            <div class="control">
                <TextInput name="multiplier" type="number" :disabled="disabled"  label="Valor Multiplicador" :required="true" @changeValue="(newValue) => display.multiplier = newValue"/>
            </div>
        </div>

        <b-alert class="w-90 btnGroup text-center" show>O valor final é o resultado de <code>(Valor Recebido * Multiplicador) + Constante</code></b-alert>

        <div class="w-100 btnGroup">
            <hr>
            <SelectInput name="variable" label="Variavel" :disabled="disabled" :options="options" :required="true" @change="(newValue) => display.variable = newValue.text"/>
        </div>

        <div class="w-100 text-center btnGroup">
            <myButton type="button" title="Limpar" buttonStyle="outline-danger" @buttonAction="reset" class="mr-1 control"></myButton>
            <myButton type="submit" title="Salvar" buttonStyle="outline-success" class="ml-1 control" @buttonAction="$emit('create')"></myButton>
        </div>

    </b-form>
</template>

<script>
import TextInput from "../shared/TextInput.vue"
import SelectInput from "../shared/SelectInput.vue"
import Button from "../shared/_Button.vue"

export default {
    components:{
        TextInput,
        SelectInput,
        "myButton": Button
    },
    props:{
        info:{
            type: Object,
            required:false,
            default: undefined
        }
    },
    data(){
        return{
            display: {
                name: undefined,
                type: undefined,
                min: undefined,
                max: undefined,
                unit: undefined,
                constant: undefined,
                variable: undefined
            },
            options: [{
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
    computed:{
        disabled(){
            return this.display.type == "Digital"
        },
        isUpdate(){
            return Object.keys(this.info).length !== 0
        },
    },
    methods:{
        reset(){
            this.display = {
                name: undefined,
                type: undefined,
                min: undefined,
                max: undefined,
                unit: undefined,
                constant: undefined,
                variable: undefined
            }
            
            this.changeField('name');
            this.changeField('type');
            this.changeField('min');
            this.changeField('max');
            this.changeField('unit');
            this.changeField('constant');
            this.changeField('variable');

        },
        changeField(name, value=''){
            document.getElementById(`${name}Input`).value = value
        }
    },

    watch:{
        display:{
            handler(){
                if(this.display.type == "Digital"){
                    this.display.min = ""
                    this.display.max = ""
                    this.display.unit = ""
                    this.display.constant = ""
                }
                this.$emit("change", this.display)

            },
            deep: true
        },
        info:{
            deep:true,
            handler(){
                if(this.isUpdate){
                    this.changeField('name', this.info.name);
                    this.changeField('type', this.info.type);
                    this.changeField('min', this.info.min);
                    this.changeField('max', this.info.max);
                    this.changeField('unit', this.info.unit);
                    this.changeField('constant', this.info.constant);
                    this.changeField('variable', this.info.variable);
                    this.display = this.info
                }else{
                    this.reset()
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
	.config {
		display: grid;
		grid-template-columns: repeat(3, 32%);
		align-items: baseline;
		@media (min-width: 320px) and (max-width: 991px) {
			grid-template-columns: repeat(1, 100%);
		}
	}
    .quarter{
        display: grid;
		grid-template-columns: repeat(4, 25%);
		align-items: baseline;
		@media (min-width: 320px) and (max-width: 991px) {
			grid-template-columns: repeat(1, 100%);
		}
    }
	.control{
		width: 95%;
		padding: 5px;
		margin: 5px 0;

		@media (min-width: 320px) and (max-width: 991px) {
			width: 100%;
		}
		input {
			background-color: white;
		}

		label + input, textarea {
			width: 100%;
			font-size: inherit;
			border-radius: 5px;
		}
	}

	.btnGroup{
		grid-column: 1/4;
	}
</style>