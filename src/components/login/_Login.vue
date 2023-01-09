/* eslint-disable */
 <template>
 <div >
    <b-container fluid="lg" class="d-flex align-items-center justify-content-center" style="min-height: 90vh; width:100vw !important">
        <b-col>
            
            <h1>Login</h1>
            <p>For your protection, please verify your identity.</p>
            <b-col>
                <form>
                    <div class="login">
                        <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="form">
                            <b-form-group
                            class="input"
                            invalid-feedback="Digite um email válido"
                            :state="emailState"
                            >
                                <label id="emailLabel" class="input" for="emailInput" style="width:100%; max-width:500px">Email <span class="required" >*</span></label>
                                <b-form-input :state="emailState" id="emailInput" v-model="form.email" required trim></b-form-input>
                            </b-form-group>
    
                            <b-form-group 
                            class="input" 
                            invalid-feedback="Digite uma senha válida" 
                            :state="passwordState">
                                <label id="passwordLabel" class="input" for="passwordInput" style="width:100%; max-width:500px">Senha <span class="required">*</span></label>
                                <b-form-input :state="passwordState"  id="passwordInput" v-model="form.password" type="password" required class="input"></b-form-input>
                            </b-form-group>

                            <div class="mt-2">
                                <myButton type="submit" title="Login" buttonStyle="outline-primary" @buttonAction="login()"></myButton>
                                <div>
                                    <myLabel :text="$i18n.t('createAccount')" class="label"></myLabel>
                                </div>   
                            </div>
                        </b-form>
                    </div>
                    <div class="w-100 d-flex flex-column">
                        <b-img center :src="require('../../assets/mtw_white.png')" alt="MTW Logo" class="logoTop"></b-img>
                        <!-- <b-img center :src="require('../../assets/tmHub_white.png')" alt="TelemetryHubLogo" class="logoTop"></b-img> -->
                    </div>
                </form>
            </b-col>
        </b-col>
    </b-container>
 </div>

</template>

<script>
import Button from '../shared/_Button.vue'
import Label from '../shared/_Label.vue'


export default {

    components: {
        'myButton' : Button,
        'myLabel': Label,
    },
    data() {
        return{
            form: {
                email: '',
                name: '',
                password: '',
                food: null,
                checked: []
            },
            show: true,
        }
    },
    computed:{
        emailState(){
            return this.form.email.length > 2
        },
        passwordState(){
            return this.form.password.length > 4
        }
    },
   methods: {
        onSubmit(event) {
            event.preventDefault()
            alert(JSON.stringify(this.form))
        },

        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.form.email = ''
            this.form.name = ''
            this.form.food = null
            this.form.checked = []
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
            this.show = true
            })

        },

        // login() {
        //     localStorage.logged = true;
        //     // eslint-disable-next-line
        //     MqttClient.send_message("mensagem teste", "SNTESTE");

            
        // }
        login() {
            this.service = new this.$userService();
            this.service.searchByUsernamePassword(this.username, this.password)
            .then((element) => {
                if(element.id > 0)
                {
                    this.$session.set('logged_id', element.id);
                    this.$session.set('user', element);
                    if(element.profile.name == "Operacao") {
                        this.$session.set('privilege', 'op');
                    } else {
                        this.$session.set('privilege', 'admin');
                    }
                    this.$emit('login');
                }
            })
        }
    } 

}

</script>

<style scoped>
    div{
        text-align: center;
    }
    h1{
        font-weight: 500;
    }
    h3 {
        color: darkgrey;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-weight: 700;
    }
    p{
        text-align: center;
        color: white;
        opacity: 0.5;
    }
    .logoTop {
        height: 1.5rem;
        margin-top: 2em;
    }
    
    .logoFooter {
        width: 200px;
        margin-top: 5em;
    }


    .center {
        position: absolute;
        top: 35%;
        right: 0px;
        bottom: 0px;
        left: 0px;

    }
    .center > .login {
        min-width: 200px;
        min-height: 200px;
        margin-left: 35%;
        margin-right: 35%;
        width: 30%;
    }
    #emailLabel, #passwordLabel{

        text-align: left;
        color: white;
        opacity: 0.75;
        /* margin-bottom: 1rem; */
    }

    #emailInput, #passwordInput{
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
    .label{
        color: #54a0f1;
        text-decoration: underline;
        font-weight: 100;
    }
    .form {
        padding: 10px;
    }

    .input {
        max-width: 400px;
        margin: 0 auto;
        background-color: transparent;
        border-radius: 10px;
        border-color: gray;
        color: gray;
        text-align: center;
        margin-bottom: 0.5rem;
    }
</style>