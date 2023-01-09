<template>
    <div>
        <section class="w-100">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h1>{{name}}</h1>
                <myButton type="button" :title="btnName" buttonStyle="outline-light" @buttonAction="click()" class="m-0"></myButton>
            </div>
            <p>{{description}}</p>
        </section>
        <hr>
    </div>
</template>

<script>
import Button from "./_Button.vue"
export default {
    components:{
        "myButton": Button
    },
    props:{
        name:{
            type:String,
            required: true
        },
        btnName:{
            type:String,
            required: true
        },
        btnAction:{
            type: Function,
            required:true
        },
        description: {
            type: String,
            required: false,
            default: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure neque molestias dignissimos."
        },
    },
    methods:{
        click(){
            this.btnAction()
        }
    }
}
</script>

<style>

</style>