
<template>
    <b-form @submit="submit">

        <b-form-group
        label="Apelido"
        lable-for="subtitle"
        description="Nome do display para facilitar a identificação"
        >
            <b-form-input
            id="subtitle"
            placeholder="Apelido"
            :value="edit ? edit.Subtitle : ''"
            type="text"
            required
            ref='subtitle'></b-form-input>
        </b-form-group>
        <br>
        <variable @varChosen="varChosen" :vari="edit ? edit.slot : undefined"/>
        <br>
        <b-form-group
        label="Unidade"
        label-for="unit"
        description="Unidade de medida do display">
            <b-form-input
            id="unit"
            placeholder="V"
            :value="edit ? edit.Unit : ''"
            type="text"
            required
            ref="unit"></b-form-input>
        </b-form-group>
        <br>
        <b-form-group
        label="Multiplicador"
        lable-for="multiplier"
        description="O multiplicador multiplica o valor lido pelo sensor"
        >
            <b-form-input
            id="multiplier"
            :value="edit? edit.Multiplier : 1"
            placeholder="1"
            type="number"
            step="0.01"
            required
            ref="multiplier"></b-form-input>
        </b-form-group>
        <br>
        <b-form-group
        label="Constante"
        lable-for="constant"
        description="A constante será somada ao valor lido pelo sensor"
        >
            <b-form-input
            id="constant"
            :value="edit ? edit.Constant : 0"
            placeholder="0"
            type="number"
            step="0.01"
            required
            ref="constant"></b-form-input>
        </b-form-group>
        <br>
        <b-form-group
        label="Minimo"
        lable-for="minimum"
        description="Qual é o valor minimo lido por esse display"
        >
            <b-form-input
            id="minimum"
            :value="edit ? edit.Minimum : 0"
            placeholder="0"
            type="number"
            step="0.01"
            required
            ref="minimum"></b-form-input>
        </b-form-group>
        <br>
        <b-form-group
        label="Maximo"
        lable-for="maximum"
        description="Qual é o valor maximo lido por esse display"
        >
            <b-form-input
            id="maximum"
            :value="edit ? edit.Maximum : 25"
            placeholder="25"
            type="number"
            step="0.01"
            required
            ref="maximum"></b-form-input>
        </b-form-group>
        <!-- <b-form-select v-model="selected" :options="variableList" size="sm" class="mt-3"></b-form-select> -->
        <br>
        <b-button type="submit" variant="success">{{edit ? 'Editar': 'Criar'}}</b-button>
    </b-form>
</template>

<script>
import Variable from "./choseVariable.vue"

export default {
    data(){
        return{
            vari: undefined,
        }
    },
    
    components: {
        Variable
    },
    methods:{
        submit(e){
            e.preventDefault()
            const form = {
                Subtitle: this.$refs.subtitle.localValue,
                Unit: this.$refs.unit.localValue,
                Multiplier: this.$refs.multiplier.localValue,
                Constant: this.$refs.constant.localValue,
                Minimum: this.$refs.minimum.localValue,
                Maximum: this.$refs.maximum.localValue,
                slot: this.vari
            }

            console.table(form)
            this.clearFields()
            this.$emit("info", form)
            this.$root.$emit('bv::toggle::collapse', 'sidebar-right')
        },
        clearFields(){
            this.$refs.subtitle.value = ''
            this.$refs.unit.value = ''
        },
        varChosen(v){
            this.vari = v
        }
    },
    props:{
        edit: Object
    }
}
</script>

<style scoped>

</style>