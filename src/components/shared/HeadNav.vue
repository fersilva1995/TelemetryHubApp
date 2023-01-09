<template>
  <div>
    <b-navbar toogleable="lg" type="dark" variant="dark" class="p-2">
      <b-navbar-nav small>
        <b-button v-b-toggle.sidebar-variant squared variant="transparent" class="p-1">
          <b-icon-list font-scale="1.5" variant="white"></b-icon-list>
        </b-button>
         <b-nav-item to="/" exact exact-active-class="active">
          <b-img width="250%" center :src="require('../../assets/tmHub_white.png')"  fluid></b-img>
         </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <language></language>
        <b-icon-power font-scale="1.5" class="mt-2 pr-2"></b-icon-power>
        <b-avatar></b-avatar>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import Language from './_Language.vue'
export default {
  components: {Language},
};
</script>

<style scoped>

.navbar {
  padding: .1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>