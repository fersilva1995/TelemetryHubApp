/* eslint-disable */
<template>
    <div style="width:100%;display:flex;justify-content:center;flex-direction:column">
        <p style="font-size:1.05;line-height:1.25">Variável</p>
        <div class="displaygrid">
            <div v-for="variable in variableList" :key="variableList.indexOf(variable)" @click="chose(variableList.indexOf(variable))" class="variable">
                {{variable}}
            </div>
        </div>
        <p style="color: #6c757d; font-size:0.875em">Escolha uma váriavel para ser exibido o valor</p>
    </div>
</template>

<script>

export default {
    data(){
        return{
            variableList: [],
            variableIndex: undefined,
            clicked: false
        }
    },
    props:{
        vari:{
            required:false,
            type: String
        }
    },
    mounted(){
        try{
            setInterval(()=>{
                this.variableList = []
                // eslint-disable-next-line
                const varlist = Variable.GetVariableMap()
                varlist.forEach(variable =>{
                    this.variableList.push(variable.name)
                })
            },2000)
        }catch{
            console.log("error");
        }
    },
    update(){
        console.warn(this.vari)
        if(this.vari != undefined){
            this.clicked = true
            this.highlightVar(this.vari)
        }
    },

    methods: {
        highlightVar(variable){
            console.log("Variables")
            var teste = document.getElementsByClassName("variable")
            console.log(teste)
            teste.forEach(card=>{
                if(card.innerHtml == variable){
                    console.error("a")
                    card.classList.add("variableChose")
                }else{
                    card.classList.remove("variableChose")
                }
            })
        },
        chose(index){
            this.clicked = true
            this.variableIndex = index
            this.$emit("varChosen", this.variableList[index])
        }
    },
    watch:{
        clicked(){
            if(this.clicked){
                var teste = document.getElementsByClassName("variable")
                var count = 0
                teste.forEach(card =>{
                    if(count == this.variableIndex){
                        card.classList.add("variableChose")
                    }else{
                        card.classList.remove("variableChose")
                    }
                    count+= 1;
                })
            }
            this.clicked = false
        }
    }
}
</script>

<style scoped>
.displaygrid{
    height:auto;
    width: 100%;

    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    gap: 0.5rem;

    margin-bottom: 1rem;

}
.variable{
outline: 0.03rem solid #1696ff;
    outline-offset: 0.1rem;
    height: 5rem;
    /* width: 95%; */
    background: radial-gradient(circle, rgba(7,11,28,1) 0%, rgba(3,11,64,1) 0%, rgba(0,11,59,1) 100%);
    color: white;
    padding: 1rem;
    display: flex;
    border: 0.01rem solid #275dff;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
    cursor: pointer;
    font-size: 0.95rem;
}
.variableChose{
    opacity: 1 !important;
}
</style>