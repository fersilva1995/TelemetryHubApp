<template>
  <div>
    <b-navbar toogleable="lg" type="dark" variant="dark">
      <b-navbar-nav small>
        <b-button v-b-toggle.sidebar-variant squared variant="transparent" class="p-1">
          <b-icon-list font-scale="1.5" variant="white"></b-icon-list>
        </b-button>
        <language></language>
      </b-navbar-nav>
      <b-img width="250%" center src="src/assets/tmHub_white.png" fluid></b-img>
      <b-navbar-nav class="ml-auto">
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