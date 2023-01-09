<template>
  <div class="grid">
    <div class="preview">
        <group :data="previewValues">
            <div class="gridTemplate">
                <div class="card" style="grid-row: 1/ span 3"></div>
                <div class="card" style="grid-column: 2/4"></div>
                <div class="card"></div>
                <div class="card"></div>
            </div>
        </group>
    </div>
    <div class="form">
        <GroupInfo :onDashboard="true" @previewChanges="changePreview" :newGroupFunction="newGroupFunction"/>
    </div>
  </div>
</template>

<script>
import GroupInfo from "../../../groups/GroupsInfo.vue"
import Group from "../../../groups/GroupComponent.vue"
export default {
    data(){
        return{
            previewValues: {},
        }
    },
    components:{
        GroupInfo,
        Group
    },
    props:{
        newGroupFunction: Function
    },
    methods:{
        changePreview(values){
            this.previewValues = values
        }
    },
}
</script>

<style scoped lang="scss">
    .gridTemplate{
        width: 100%;
        height: 100%;
        display:grid;
        grid-template-columns: repeat(3, 33%);
        padding: 1rem;
        grid-gap: 15px;
        .card{
            min-height: 15rem;
            max-height:31rem;
            width: 100%;
            border-radius: 10px;
            background: gray;
        }
    }
    .preview{
        height: auto;
        border-bottom: 3px solid #ff9e04;
        margin-bottom: 0.5rem;

    }
    .form{
        height: auto;
    }
</style>