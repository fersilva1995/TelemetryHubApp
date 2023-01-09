<template>
    <b-form inline >

        <div class="control mb-4 mr-2 ml-2">
            <TextInput name="login" label="Login" :required="true" @changeValue="(newValue) => form.login = newValue"/>
        </div>
        <div class="control mb-4 mr-2 ml-2">
            <TextInput name="password" type="password" label="Senha" :required="true" @changeValue="(newValue) => form.password = newValue"/>
        </div>

        <hr class="h-100">

        <div class="w-100 grid">
            <div class="w-100 mb-4 mr-2 ml-2">
                <TextInput name="fullName" label="Nome Completo" :required="true" @changeValue="(newValue) => form.fullName = newValue"/>
            </div>
            <div class="w-100 mb-4 mr-2 ml-2">
                <TextInput name="socialName" label="Nome social" :required="true" @changeValue="(newValue) => form.socialName = newValue"/>
            </div>
            <div class="w-100 mb-4 mr-2 ml-2">
                <TextInput name="nickname" label="Apelido" :required="true" @changeValue="(newValue) => form.nickname = newValue"/>
            </div>
        </div>
        <div class="control mb-4 mr-2 ml-2">
            <TextInput name="email" label="Email" type="email" :validate="true" :state="emailValidation" invalidMessage="Digite um email válido" :required="true" @changeValue="(newValue) => form.email = newValue"/>
        </div>
        <div class="control mb-4 mr-2 ml-2">
            <TextInput class="phone" name="phone" label="Numero de telefone" type="tel" :required="true" @changeValue="(newValue) => form.phone = newValue"/>
        </div>

        <hr class="h-100">

        <div class="control mb-4 mr-2 ml-2">
            <TextInput class="cpf" name="cpf" label="CPF" :validate="true" invalidMessage="Digite um CPF válido" :state="cpfValidation" :required="true" @changeValue="(newValue) => form.cpf = newValue"/>
        </div>
        <div class="control mb-4 mr-2 ml-2">
            <TextInput class="cnpj" name="cnpj" label="CNPJ" :validate="true" invalidMessage="Digite um CNPJ válido" :state="cnpjValidation" :required="true" @changeValue="(newValue) => form.cnpj = newValue"/>
        </div>

        <hr class="h-100">

        <div class="w-100 grid">
            <div class="w-100 mb-4 mr-2 ml-2">
                <TextInput class="cep" name="cep" label="CEP" :validate="true" :state="cepValidation" invalidMessage="Digite um CEP válido" :required="true" @changeValue="(newValue) => form.cep = newValue"/>
            </div>

            <div class="w-100 mb-4 mr-2 ml-2">
                <TextInput  name="province" :value="form.province" label="Estado" :required="true" @changeValue="(newValue) => form.province = newValue"/>
            </div>
            <div class="w-100 mb-4 mr-2 ml-2">
                <TextInput name="city" :value="form.city" label="Cidade" :required="true" @changeValue="(newValue) => form.city = newValue"/>
            </div>
            <div class="w-100 mb-4 mr-2 ml-2">
                <TextInput name="region" :value="form.region" label="Bairro" :required="true" @changeValue="(newValue) => form.region = newValue"/>
            </div>

            <div class="w-100 mb-4 mr-2 ml-2">
                <TextInput name="adress" :value="form.adress" label="Rua" :required="true" @changeValue="(newValue) => form.adress = newValue"/>
            </div>
            <div class="w-100 mb-4 mr-2 ml-2">
                <TextInput name="number" label="Número" type="number" :required="true" @changeValue="(newValue) => form.number = newValue"/>
            </div>
            <div class="w-100 mb-4 mr-2 ml-2">
                <TextInput name="complement" label="Complemento" :required="false" @changeValue="(newValue) => form.complement = newValue"/>
            </div>
        </div>


        <div class="w-100 mb-4 mr-2 ml-2">
            <myButton type="button" title="Remover" buttonStyle="outline-danger" @buttonAction="login()" class="mr-1 control"></myButton>
            <myButton type="submit" title="Salvar" buttonStyle="outline-success" class="ml-1 control"></myButton>
        </div>
    </b-form>
</template>

<script src="https://unpkg.com/imask"></script>
<script>
import TextInput from "../shared/TextInput.vue"
import axios from "axios";
// import SelectInput from "../shared/SelectInput.vue"
import Button from '../shared/_Button.vue'
import 'vue-select/dist/vue-select.css';


export default {
    data(){
        return{
            form: {
                name: "",
                registration: "",
                login: "",
                password: "",
                type: "",
                province:"",
                city:"",
                region:"",
                adress:"",
                type: ""
            },
            options: [
                { value: null, text: 'Please select an option' },
                { value: 'a', text: 'This is First option' },
                { value: 'b', text: 'Selected Option' },
                { value: { C: '3PO' }, text: 'This is an option with object value' },
                { value: 'd', text: 'This one is disabled', disabled: true }
            ],
        }
    },
    components:{
        TextInput,
        // SelectInput,
        "myButton": Button
    },
    methods:{
        passwordValidation(password){
            return password.length > 2
        },

        cepValidation(cep){
            var cep = cep.replace(/\D/g, '');
            if (cep != "") {
                var validacep = /^[0-9]{8}$/;
                if (validacep.test(cep)){
                    this.findAdress(cep);
                    return true
                }else return false
            }else return false
        },
        async findAdress(cep){
            const a = await axios.get('https://viacep.com.br/ws/'+ cep + '/json/').then(res => {
                const response = res.data
                if(response.erro == undefined){
                    this.form.province = response.uf
                    this.form.city = response.localidade
                    this.form.region = response.bairro
                    this.form.adress = response.logradouro
                    document.querySelector("#provinceInput").value = response.uf
                    document.querySelector("#cityInput").value = response.localidade
                    document.querySelector("#regionInput").value = response.bairro
                    document.querySelector("#adressInput").value = response.logradouro
                }else{
                    this.form.province = ''
                    this.form.city = ''
                    this.form.region = ''
                    this.form.adress = ''
                    document.querySelector("#provinceInput").value = ''
                    document.querySelector("#cityInput").value = ''
                    document.querySelector("#regionInput").value = ''
                    document.querySelector("#adressInput").value = ''
                }
            })

        },
        emailValidation(email){
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return pattern.test(email)
        },
        cpfValidation(cpf){
            cpf = cpf.replace(/[^\d]+/g,'');	
            if(cpf == '') return false;	
            if (cpf.length != 11 || 
                cpf == "00000000000" || 
                cpf == "11111111111" || 
                cpf == "22222222222" || 
                cpf == "33333333333" || 
                cpf == "44444444444" || 
                cpf == "55555555555" || 
                cpf == "66666666666" || 
                cpf == "77777777777" || 
                cpf == "88888888888" || 
                cpf == "99999999999")
                    return false;		
            // Valida 1o digito	
            add = 0;	
            for (i=0; i < 9; i ++)		
                add += parseInt(cpf.charAt(i)) * (10 - i);	
                rev = 11 - (add % 11);	
                if (rev == 10 || rev == 11)		
                    rev = 0;	
                if (rev != parseInt(cpf.charAt(9)))		
                    return false;
                else console.warn(rev, parseInt(cpf.charAt(9)))
            // Valida 2o digito	
            add = 0;	
            for (i = 0; i < 10; i ++)		
                add += parseInt(cpf.charAt(i)) * (11 - i);	
            rev = 11 - (add % 11);	
            if (rev == 10 || rev == 11)	    
                rev = 0;	
            if (rev != parseInt(cpf.charAt(10)))
                return false;		
            return true;   
        },
        cnpjValidation(cnpj){
            cnpj = cnpj.replace(/[^\d]+/g,'');
            if(cnpj == '') return false;
            
            if (cnpj.length != 14)
                return false;
        
            // Elimina CNPJs invalidos conhecidos
            if (cnpj == "00000000000000" || 
                cnpj == "11111111111111" || 
                cnpj == "22222222222222" || 
                cnpj == "33333333333333" || 
                cnpj == "44444444444444" || 
                cnpj == "55555555555555" || 
                cnpj == "66666666666666" || 
                cnpj == "77777777777777" || 
                cnpj == "88888888888888" || 
                cnpj == "99999999999999")
                return false;
                
            // Valida DVs
            tamanho = cnpj.length - 2
            numeros = cnpj.substring(0,tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;
                
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0,tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;
                
            return true;
        },

        maskCep(){
            const cepElement = document.querySelector('.cep')
            cepElement.addEventListener("keyup", (e) => {
                var v= e.target.value.replace(/\D/g,"")                
                v=v.replace(/^(\d{5})(\d)/,"$1-$2") 
                e.target.value = v;
            });
        },
        maskPhone(){
            const phoneElement = document.querySelector('.phone')
            phoneElement.addEventListener("keyup", (e)=>{
                var v= e.target.value.replace(/\D/g,"") 
                v = v.replace(/\D/g,'')
                v = v.replace(/(\d{2})(\d)/,"($1) $2")
                v = v.replace(/(\d)(\d{4})$/,"$1-$2")
                e.target.value = v;
            })
        },
        maskCPF(){
            const cpfElement = document.querySelector(".cpf")
            cpfElement.addEventListener("keyup", (e)=>{
                var v= e.target.value.replace(/\D/g,"") 
                v=v.replace(/\D/g,"")
                v=v.replace(/(\d{3})(\d)/,"$1.$2")
                v=v.replace(/(\d{3})(\d)/,"$1.$2")
                v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
                e.target.value = v;
            })
        },
        maskCNPJ(){
            const cnpjElement = document.querySelector(".cnpj")
            cnpjElement.addEventListener("keyup", (e)=>{
                e.target.value = e.target.value.replace(/\D/g, '').replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1 $2 $3/$4-$5");
            })
        }

    },
    mounted(){
        this.maskCep();
        this.maskPhone();
        this.maskCPF();
        this.maskCNPJ();
    }
}
</script>

<style lang="scss" scoped>
    .grid {
		display: grid;
		grid-template-columns: repeat(3, 32%);
		align-items: baseline;
        gap: 0.5rem;
		@media (min-width: 320px) and (max-width: 991px) {
			grid-template-columns: repeat(1, 100%);
		}
	}

select{
    width:100% !important;
}
select.custom-select{
    height: auto;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border: 0.1px solid rgba(255, 255, 255, 0.3);
    color: white;
    border-radius: 8px;
    & > option{
        text-align: left;
        color: black;
        font-weight: 400
    }
}
form{
    padding: 2rem;
}
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
  font-size: inherit;
}
</style>
<style>
    div:has(> #cepInput ~ .d-block.invalid-feedback ){
        position: relative;
        top: -11px
    }
</style>