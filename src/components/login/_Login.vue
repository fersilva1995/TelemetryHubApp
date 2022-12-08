/* eslint-disable */
 <template>
 <div>
    <b-container fluid="lg">
        <b-row>
            <div>
                <!-- <b-img center :src="require('../assets/tmHub_white.png')" alt="TelemetryHubLogo" class="logoTop"></b-img> -->
            </div>
            <b-col>
                <form class="center">
                    <div class="login">
                        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                            <b-form-group id="usernameInput" label-for="username" class="form">
                                <b-form-input id="username" v-model="form.name" :placeholder="$i18n.t('usernameLabel')" required class="input" autocomplete="off"></b-form-input>
                            </b-form-group>
                            <b-form-group id="passwordInput" label-for="password" class="form">
                                <b-form-input id="password" v-model="form.email" type="password" :placeholder="$i18n.t('passwordLabel')" required class="input"></b-form-input>
                            </b-form-group>
                            <myButton type="button" title="Login" buttonStyle="outline-primary" @buttonAction="login()"></myButton>
                            <div>
                                <myLabel :text="$i18n.t('createAccount')"></myLabel>
                            </div>                          
                        </b-form>
                    </div>
                    <div>
                        <!-- <b-img center src="src/assets/mtw_white.png" alt="MTW Logo" class="logoFooter"></b-img> -->
                    </div>
                </form>
            </b-col>
        </b-row>
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
                food: null,
                checked: []
            },
            show: true,
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

        login() {
            localStorage.logged = true;
            // eslint-disable-next-line
            MqttClient.send_message("mensagem teste", "SNTESTE");
        }
    } 

}

</script>

<style scoped>

    h3 {
        color: darkgrey;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-weight: 700;
    }

    .logoTop {
        width: 450px;
        margin-top: 5em;
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

    .form {
        padding: 10px;
    }

    .input {
        max-width: 300px;
        margin: 0 auto;
        background-color: transparent;
        border-radius: 10px;
        border-color: gray;
        color: gray;
        text-align: center;
    }
</style>