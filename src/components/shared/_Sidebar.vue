<template>
  <div id="sidebar">
    <b-sidebar id="sidebar-variant" 
      text-variant="secondary"
      no-header
      backdrop
      backdrop-variant="dark"
      bg-variant="transparent"
      shadow="sm"
      >
        <b-nav vertical class="w-100">
            <b-nav-item to="/" exact exact-active-class="active">Home</b-nav-item>
            <b-nav-item to="/Login" exact exact-active-class="active">Login</b-nav-item>
            <b-nav-item to="/Dashboard" exact exact-active-class="active">Dashboard</b-nav-item>
            <b-nav-item to="/Awq2B31/3/PH03" exact exact-active-class="active">Teste</b-nav-item>
        </b-nav>
    </b-sidebar>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>

.nav-item a {
  color: aliceblue;
  border: 1px solid transparent;
  background-color: rgba(255, 255, 255, .03);
}
.nav-item a::hover{
  text-decoration: underline;
  color: burlywood;
}
</style>
