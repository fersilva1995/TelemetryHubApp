<template>
    <b-modal id="modalPopover" title="Modal with Popover" ok-only>
        <template #modal-title>
            <slot name="header"></slot>
        </template>
        <slot name="body"></slot>
        <template #modal-footer>
            <slot name="footer"></slot>
        </template>
    </b-modal>
</template>

<script>
export default {

}
</script>

<style lang="scss">
div#modalPopover{
    background-color: rgb(29, 40, 53, 0.95);
    
}
div#modalPopover___BV_modal_content_ {
    color: white;
    background: transparent;
    border-color: rgba(255, 255, 255, 0.3);
}
button.close{
    color: white;
}
button.close:hover{
    color:red
}
div#modalPopover___BV_modal_content_ > * {
    border-color: rgba(255, 255, 255, 0.3);
    color: white;
}
</style>