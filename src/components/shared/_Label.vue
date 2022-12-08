<template>
    <label class="label">{{ text }}</label>
</template>

<script>

export default {

    props: {

        text : {
            type: String,
            required: true
        }
    }
}

</script>

<style scoped>

.label {
    font-size: 14px;
    color: gray;

}

</style>