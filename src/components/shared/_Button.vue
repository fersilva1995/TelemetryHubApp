<template>
    <b-button :to="pageLink" @click="triggerAction()" class="button" :variant="buttonStyle" :type="type">{{ title }}</b-button>
</template>

<script>

export default {

    props: {

        type: {
            required: true, 
            type: String
        },

        title: {
            required: true, 
            type: String
        }, 

        buttonStyle: String,
        pageLink: String
    },

    methods: {
        triggerAction() {
            // console.log("Ola mundo");
            this.$emit('buttonAction');
        }
    },
}
</script>

<style scoped>
    .button {
        margin: 10px auto;
        width: 100%;
        max-width: 300px;
        padding: 10px;
        border-radius: 10px;
        font-size: 1.2em;
        padding: 5px;
    }

    .button-danger {
        background: firebrick;
        color: white;
    }

    .primary {
        background-color: transparent;
        border-color: #0d6efd;
        color: #0d6efd;
        border-radius: 20px;
        min-width: 200px;
    }
</style>