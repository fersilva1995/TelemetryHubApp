/* eslint-disable */
<template>
  <div class="">
    <!-- <button @click="togglebtn" :style="btnColor" id="button">{{simbol}}</button> -->
    <b-dropdown :style="btnColor" right split :text="simbol" class="m-2" background-color="red" @click="togglebtn">
      <b-dropdown-item  @click="togglebtn">Novo Componente</b-dropdown-item>
      <b-dropdown-item @click="newGroup">Criar novo Grupo</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>


export default {
  data(){
    return{
      open: false,
    }
  },
  methods:{
    newGroup(){
      this.$parent.newGroup();
    },
    togglebtn: function(){
      this.open = !this.open
      this.$parent.showComponents(this.open)
    }
  },
  computed:{
    simbol(){
      if(!this.open) return '+'
      else return '-'
    },
    btnColor(){
      if(this.open)return{
        '--btn-color': 'red',
        '--drop-color': 'darkred',
      }
      else return{
        '--btn-color': 'darkgreen',
        '--drop-color': 'green',
      }
    },
  },
};
</script>

<style scopped lang="scss">
// #botao{
//   height:2rem;
//   width: 3rem;

//   background: var(--btn-color) !important;
//   border: none;
//   color:white;
//   // #botao__BV_toggle_::after{
//   //   display: none;
//   // }
//   .btn .btn-secondary{
//     width: 4rem;
//   }
// }

.btn-group{
  .btn, .btn-secondary{
    background: var(--btn-color) !important;
    width: 3.25rem;
    border:none;
  }
  .dropdown-toggle-split{
    background: var(--drop-color) !important;
    border:none;
    width: 1.5rem;
    span{
      display: none;
    }
  }
}
</style>
