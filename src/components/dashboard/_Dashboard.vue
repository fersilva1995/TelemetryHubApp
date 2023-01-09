<template>
	<div class="w-100 p-2">
		<!--//? Criação de Grupos e de Display -->
		<new-component ref="forms" :groupsLength="groups.length" :newGroupFunction="newGroup"/>
		<!--//? Área para grupos -->
		<div id="dashboardArea" class="w-100">
			<draggable v-model="groups">
				<group v-for="group in groups" :key="groups.indexOf(group)" :data="group">
					<GridLayout 
					:group="group"
					@showModal="showModal(groups.indexOf(group))"
					ref="grid"
					/>
				</group>
			</draggable>
		</div>
		<Modal>
			<template #header>
				<h3>Deletar display</h3>
			</template>
			<template #body>
				<p>Tem certeza que deseja deletar esse display? A ação é irreversível.</p>
			</template>
			<template #footer>
				<div class="d-flex w-100 justify-content-end align-items-center" style="gap: 0.5rem;opacity:0.5">
					<b-button variant="outline-danger"  @click="deleteCard" >Deletar</b-button>
					<b-button variant="outline-warning" @click="editCard">Editar</b-button>
					<b-button variant="outline-light"   @click="$bvModal.hide('modalPopover')">Cancelar</b-button>
				</div>
			</template>
		</Modal>
	</div>
</template>

<script>

import draggable from 'vuedraggable'
import NewComponentIndex from "./componetDashboard/NewComponentIndex.vue"
import GridLayout from "./componetDashboard/GridLayout.vue"
import Group from "../groups/GroupComponent.vue"

import Modal from "../shared/InfoModal.vue"
export default {
	components:{
		"new-component": NewComponentIndex,
		draggable,
		Group,
		GridLayout,
		Modal,
	},
	data(){
		return{
			groups: [],
			varGroupKey: undefined
		}
	},
	methods:{
		newGroup(e){
			this.groups.push(e)
		},
		showModal(index){
			this.varGroupKey = index
			this.$bvModal.show('modalPopover')
		},
		deleteCard(){
			this.$bvModal.hide('modalPopover')
			this.$refs.grid[this.varGroupKey].confirmDelete();
		},
		editCard(){
			this.$bvModal.hide('modalPopover')
			this.$refs.grid[this.varGroupKey].editCard();
			// this.$refs.forms.open("display", )
		},
	},
}
</script>

<style>

</style>