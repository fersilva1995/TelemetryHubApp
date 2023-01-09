<template>
    <div class="p-3 w-100">
        <div class="group">
            <div class="groupHeader d-flex justify-content-between align-items-center w-100">
                <div class="d-flex align-items-center">
                    <div class="">
                        <b-icon-grip-vertical class="dragIcon"/>
                    </div>
                    <h5 class="m-0">{{groupName}}</h5>
                </div>
                <b-icon-chevron-down class="handle" @click="openBody"/>
            </div>
            <hr>
            <div class="groupBody" ref="body" :style="bodyHeight">
                <slot/>
                <hr>
            </div>
            <div class="groupFooter"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isOpen: false,
        }
    },
    methods:{
        openBody(){
            this.isOpen = !this.isOpen
            this.$refs.body.classList.toggle("open")
        }
    },
    computed:{
        bodyHeight(){
            return{
                '--scaleY': this.isOpen ? 1 : 0
            }
        },
        groupName(){
            return this.data ? this.data.name : "Nome do grupo"
        },

    },
    props:{
        data:{
            type: Object,
            required:false
        }
    },
    watch:{
        isDraggingFromOutside(){
            console.error("a")
        }
    }
}
</script>

<style lang="scss" scoped>
    .group{
        padding: 1px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 4rem;
        -webkit-box-shadow:inset 0px 0px 0px 1px rgb(255, 255, 255, 0.5);
        -moz-box-shadow:inset 0px 0px 0px 1px rgb(255, 255, 255, 0.5);
        box-shadow:inset 0px 0px 0px 1px rgb(255, 255, 255, 0.5);
        background:
            linear-gradient(to right, white 2px, transparent 2px) 0 0,
            linear-gradient(to right, white 2px, transparent 2px) 0 100%,
            linear-gradient(to left, white 2px, transparent 2px) 100% 0,
            linear-gradient(to left, white 2px, transparent 2px) 100% 100%,
            linear-gradient(to bottom, white 2px, transparent 2px) 0 0,
            linear-gradient(to bottom, white 2px, transparent 2px) 100% 0,
            linear-gradient(to top, white 2px, transparent 2px) 0 100%,
            linear-gradient(to top, white 2px, transparent 2px) 100% 100%;

        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-color: hsl(206deg 37% 14% / 91%);
        .groupHeader{
            padding: 1.25rem;
            .dragIcon{
                font-size: 1.75rem;
            }
        }
        .groupBody{
            transform: scaleY(var(--scaleY));
            transition: transform 0.25s ease, height 0.25s ease;
            transform-origin: top;
            height: 0;
            width:100%;
            &.open{
                min-height: 5rem;
                height:auto;
                transition: transform 0.25s ease, height 0.25s ease;
            }
        }
    }
</style>