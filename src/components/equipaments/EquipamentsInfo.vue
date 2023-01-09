<template>
	<b-form class="config">

		<div class="control">
			<TextInput name="name" label="Nome" :required="true" @changeValue="(newValue) => form.name = newValue"/>
		</div>
		<div class="control">
			<TextInput name="ip" label="IP" :required="true" @changeValue="(newValue) => form.name = newValue"/>
		</div>
		<div class="control">
			<TextInput name="login" label="Login" :required="true" @changeValue="(newValue) => form.name = newValue"/>
		</div>

		<div class="control">
			<TextInput name="password" type="password" label="Senha" :required="true" @changeValue="(newValue) => form.name = newValue"/>
		</div>
		<div class="control">
			<SelectInput name="type" label="Tipo" :options="options" :required="true"/>
		</div>
		<div class="control">
			<TextInput name="primary" label="RTSP Primário" :required="true" @changeValue="(newValue) => form.name = newValue"/>
		</div>

		<div class="control">
			<TextInput name="secundary" label="RTSP Secundário" :required="true" @changeValue="(newValue) => form.name = newValue"/>
		</div>
		<div class="control">
			<TextInput name="transmitionPrimary" label="RTSP de Transmissão Primário" :required="true" @changeValue="(newValue) => form.name = newValue"/>
		</div>
		<div class="control">
			<TextInput name="transmitionSecundary" label="RTSP de Transmissão Secundário" :required="true" @changeValue="(newValue) => form.name = newValue"/>
		</div>

		<div class="w-100 btnGroup">
			<hr>
			<h1>Teste</h1>
			<RelationTable :items="options"/>
		</div>
		<div class="w-100 btnGroup">
			<hr>
			<SelectInput name="group" label="Grupos" :options="[]" :required="true"/>
		</div>


		<div class="w-100 btnGroup">
			<myButton type="button" title="Remover" buttonStyle="outline-danger" @buttonAction="login()" class="mr-1 control"></myButton>
			<myButton type="submit" title="Salvar" buttonStyle="outline-success" class="ml-1 control"></myButton>
		</div>
	</b-form>
</template>

<script>
import TextInput from "../shared/TextInput.vue"
import Button from '../shared/_Button.vue'
import SelectInput from "../shared/SelectInput.vue"
import 'vue-select/dist/vue-select.css';

import RelationTable from "../shared/RelationTable.vue"

export default {

	components:{
		TextInput,
		"myButton": Button,
		SelectInput,
		RelationTable,
	},
	data(){
		return{
			options: [
				{id:0, value: 0, text: "Vazio" },
				{id:1, value: 1, text: "Camera" },
				{id:2, value: 2, text: "Switch" },
				{id:3, value: 3, text: "Computador" },
				{id:4, value: 4, text: "Modem" },
				{id:5, value: 5, text: "Roteador" },
				{id:6, value: 6, text: "Servidor" },
				{id:7, value: 7, text: "Telefone" },
				{id:8, value: 8, text: "Telemetria" },
				{id:9, value: 9, text: "GateWay" },
				{id:10, value: 10, text: "Radio" },
				{id:11, value: 11, text: "Medidor" },
				{id:12, value: 12, text: "NVR" },
				{id:13, value: 13, text: "DVR" },
				{id:14, value: 14, text: "HD" },
				{id:15, value: 15, text: "Outro" }
			],
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