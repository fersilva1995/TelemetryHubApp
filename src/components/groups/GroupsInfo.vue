<template>
  <b-form inline class="text-center">
    <div class="control mb-4 mr-2 ml-2">
      <TextInput ref="name" name="name" label="Nome" :required="true" @changeValue="(value) => previewForm.name = value"/>
    </div>

    <div class="control mb-4 mr-2 ml-2">
      <TextInput ref="description" name="description" label="Descrição" :required="true" @changeValue="(value) => previewForm.description = value"/>
    </div>

    <!-- Não exibe essa parte na dashboard -->
    <div class="w-100 mb-4" v-if="!onDashboard"> 
      <hr>
      <h3>Dashboards</h3>
      <relation-table :items="relationTableItems"/>
      <hr>
      <h3>Measurers</h3>
      <relation-table :items="relationTableItems"/>
    </div>
    <div class="w-100 mb-4 mr-2 ml-2">
      <myButton type="button" title="Remover" buttonStyle="outline-danger" class="mr-1 control"></myButton>
      <myButton type="submit" title="Salvar" buttonStyle="outline-success" @buttonAction="create()" class="ml-1 control"></myButton>
    </div>
  </b-form>
</template>

<script>
import TextInput from "../shared/TextInput.vue"
import Button from '../shared/_Button.vue'

import RelationTable from "../shared/RelationTable.vue"
export default {
  data(){
    return{
      previewForm: {
        name: '',
        description: ''
      },
      relationTableItems: [
                {id: 1, text: "Grupo 1"},
                {id: 2, text: "Grupo 2"},
                {id: 3, text: "Grupo 3"},
                {id: 4, text: "Grupo 4"},
                {id: 5, text: "Grupo 5"},
            ],
    }
  },
  components:{
    TextInput,
    "myButton": Button,
    RelationTable
  },
  props:{
    onDashboard:{
      type: Boolean,
      required:false,
      default: false
    },
    newGroupFunction: Function
  },
  methods:{
    create(){
      const form = {
        name: this.$refs.name.input,
        description: this.$refs.description.input
      }
      this.newGroupFunction(form)
      this.$refs.name.input = ''
      this.$refs.description.input = ''
    }
  },
  watch:{
    previewForm:{
      handler(){
        this.$emit("previewChanges", this.previewForm)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.control {
  width: 48%;
  padding: 5px;
}

.control label {
  font-weight: 500;
  letter-spacing: 0.5px;
}

.control label + input,
.control textarea {
  border: none;
  border-radius: 5px;
  width: 100%;
}
</style>