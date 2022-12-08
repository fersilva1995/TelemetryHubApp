<template>
  <div class="tudo" :style="groupColor">
    <div class="titulo">
      <div class="uau">
          <b-icon-grip-vertical class="handle" ></b-icon-grip-vertical>
    
          <b-dropdown>
            <template height="auto" width="auto">
              <b-icon-gear-wide-connected style="height:15px; width:15px; opacity:0.5"></b-icon-gear-wide-connected>
            </template>
            <b-dropdown-form id="group-dropdown-item" href="#" style="cursor:pointer"><b-icon-palette-fill ></b-icon-palette-fill>
              <input type="color" id="my-color" style="opacity: 0; visibility: hidden; position: absolute;" @change="changeColor(color, 'color_1', $event)">
              <label for="my-color" style="cursor:pointer">Mudar Cor</label>
            </b-dropdown-form>
            <b-dropdown-item id="group-dropdown-item" href="#" @click="edit" :class="groupName + '-editButton'" style="cursor:pointer">
              <b-icon-pencil-fill ></b-icon-pencil-fill>Mudar Nome
            </b-dropdown-item>
            <b-dropdown-item @click="$bvModal.show('modal-center-'+groupName.slice(5, groupName.length))">
              <b-icon-trash-fill />  Apagar Grupo
            </b-dropdown-item>        
          </b-dropdown>
          <div class="input-container">
            <input @keypress="disableInput" :id="groupName+'-name'" class="name" :value="title ? title : 'Novo Grupo'" disabled/>
            <b-button variant="success" :id="groupName+'-confirmButton'" class="btnHidden" @click="confirmNameChange"><b-icon-check></b-icon-check></b-button>
            <b-button variant="danger" :id="groupName+'-cancelButton'" class="btnHidden" @click="cancelNameChange"><b-icon-x></b-icon-x></b-button>
          </div>
      </div>
      <small @click="click" class="open">^</small>
    </div>
    <div :id="groupName + '-espaco'" class="espaco">
        <slot/>
    </div>

    <b-modal
      @ok="deleteGroup"
      :id="'modal-center-'+groupName.slice(5, groupName.length)" centered title="Atenção! Deletar grupo?">
      <p class="my-4">Atenção, você está prestes a deletar o grupo <strong>"{{title}}"</strong>, deseja continuar com a ação?</p>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data(){return{
    oldName: undefined,
    editMode:false,
    open: false,
    gpColor:undefined
  }},
  props:{
    groupName: String,
    title:{
      type: String,
      required: false
    },
    color:{
      type: String,
      required: false
    }
  },
  mounted(){
    this.gpColor = this.color ? this.color : 'blue';
  },
  methods:{
    click(e){
      const btn = e.target
      btn.classList.toggle("open");
      const groupElement = document.querySelector("#" + this.groupName + '-espaco')
      if(!this.open) groupElement.classList.add('esOpen')
      else groupElement.classList.remove('esOpen')
      this.open = !this.open
    }, 
    edit(e){
      this.oldName = document.querySelector('#'+this.groupName+'-name').value
      this.editMode = !this.editMode
      this.enableAndDisableNameInput(this.editMode)
    },
    
    enableAndDisableNameInput(change){
      const nameInput = document.querySelector('#'+this.groupName+'-name')
      const btnOk = document.querySelector('#'+this.groupName+'-confirmButton')
      const btnCancel = document.querySelector('#'+this.groupName+'-cancelButton')
      if(change){
        nameInput.removeAttribute('disabled')
        btnOk.classList.remove('btnHidden')
        nameInput.style.border = "1px solid yellowgreen"
        btnCancel.classList.remove('btnHidden')
        btnOk.classList.add('btnShow')
        btnCancel.classList.add('btnShow')
      }else{
        btnOk.classList.add('btnHidden')
        btnCancel.classList.add('btnHidden')
        nameInput.style.border = "none"
        btnOk.classList.remove('btnShow')
        btnCancel.classList.remove('btnShow')
        nameInput.setAttribute('disabled', '')
        this.editMode = false
      }
    },

    disableInput(e){
      const nameInput = document.querySelector('#'+this.groupName+'-name')
      const editButton = document.getElementsByClassName(this.groupName + '-editButton')[0]
      if(e.key == "Enter"){
          this.confirmNameChange()
      }
    },

    confirmNameChange(){
      const newName = document.querySelector('#'+this.groupName+'-name').value
      this.$emit("changeName", {id: parseInt(this.groupName.slice(5, this.groupName.length)), newName: newName})
      this.enableAndDisableNameInput(false)
    },

    cancelNameChange(){
      this.$emit("changeName", {id: parseInt(this.groupName.slice(5, this.groupName.length)), newName: this.oldName})
      this.enableAndDisableNameInput(false)
    },

    changeColor(colors, a, e){
      this.gpColor = e.target.value
      this.$emit("changeColor", {id: parseInt(this.groupName.slice(5, this.groupName.length)),newColor: e.target.value})

    },
    deleteGroup(){
      this.$emit("deleteGroup", this.groupName.slice(5, this.groupName.length));
    },
    ok(){
      console.log("a")
    }
  },
  computed:{
    groupColor(){
        return{
        '--group-title-gradient': "radial-gradient(circle, red 0%, " + this.gpColor + " 0%, rgba(31,46,58,0) 100%)",
        '--group-space-color': this.gpColor
        }
    }
  },
}
</script>

<style  scoped lang="scss">
.uau{
  display:flex;
  align-items: center;
}
.input-container{
  height: 1rem;
  width:80%;
  display: flex;
}
#group-dropdown-item{
  display:flex !important;
  align-items:center !important;
  gap: 10px !important
}
.dropdown{
  .btn{
    width:auto;
    padding: 0;
  }
}
.tudo{
  margin-bottom: 1rem;
}
.handle{
  color:rgb(255, 255, 255);
  opacity: 0.5;
  margin-right: 0.75rem;
  cursor: -webkit-grabbing; 
  cursor: grabbing;
}

.titulo{
  color: white;
  display: flex;
  justify-content: space-between;
  width:100%;
  text-align: start;
  padding-right: 1rem;
  align-items: center;
  align-content: center;
  border-bottom: 3px solid #9c9fff;
  margin-bottom: 0;
  background: var(--group-title-gradient) !important;
}.espaco{
  height: 1rem;
  max-height: 1rem;
  width: 100%;
  background: var(--group-space-color);
  border-bottom: 1px solid #9c9fff;
  transform: scaleY(0);    
  transform-origin: top;
  transition: transform 0.25s ease;
  overflow: hidden;
  padding: 1rem 0.5rem;
}
.esOpen{
  height: auto;
  max-height: none;
  transform: scaleY(1);   
  transform-origin: top;
	transition: transform 0.25s ease;
}
.open{
  transform: rotate(180deg);
  transition: transform 0.5s ease;
}
small{
  transform: rotate(0deg);
  transition: transform 0.5s ease;
  cursor: pointer;
  
}
.name{
  margin-left: 1rem;
  border:none;
  background: transparent;
  color: white;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: auto;
  padding: 0.5rem;
  max-width: 40rem;
  &:focus{
    outline: none;
    border: none;
  }
}
.btnHidden{
  display:none
}
.btnShow{
  margin-left:0.5rem; display:flex;justify-content:center;align-items:center;
}

</style>