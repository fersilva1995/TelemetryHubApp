/* eslint-disable */
<template>
    <div class="iconContainer">
        <b-icon class="icon config" @click="$emit('edit')" icon="gear-wide-connected" />
        <b-icon class="icon delete" @click="$emit('deleteDisplay')" icon="trash-fill" />
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.iconContainer{
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    color:white;
}
.icon{
    cursor: pointer;
    opacity: 0.33;
    transition: opacity 0.5s ease;
    // transition: opacity 0.5s ease;
}
.icon:hover{
    opacity: 0.75;
    transition: opacity 0.5s ease;
    // &.config{
    //     color:yellow
    // }
    // &.delete{
    //     color:red
    // }
}

</style>