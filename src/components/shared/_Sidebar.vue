<template>
  <div id="sidebar">
    <b-sidebar id="sidebar-variant" 
      text-variant="secondary"
      no-header
      bg-variant="transparent"
      shadow="sm"
      >
        <b-nav vertical class="w-100">
            <div class="w-100 mb-1">
              <small>Navegação</small>
              <b-nav-item to="/Dashboard" exact exact-active-class="active"><b-icon-cpu font-scale="0.9"/> Dashboard</b-nav-item>
            </div>
            <div class="w-100 mb-1">
              <small>Configuração</small>
              <b-nav-item to="/users" exact exact-active-class="active"><b-icon-person-circle font-scale="0.9"/> Usuarios</b-nav-item>
              <b-nav-item to="/groups" exact exact-active-class="active"><b-icon-files font-scale="0.9"/> Grupos</b-nav-item>
              <b-nav-item to="/equipaments" exact exact-active-class="active"><b-icon-collection font-scale="0.9"/> Equipamentos</b-nav-item>
            </div>
            <b-nav-item to="/Login" exact exact-active-class="active">Login</b-nav-item>
            <b-nav-item to="/Awq2B31/3/PH03" exact exact-active-class="active">Teste</b-nav-item>
        </b-nav>
    </b-sidebar>
    <router-view class="w-100"></router-view>
  </div>
</template>

<style lang="scss" scoped>
small{
  font-size: 0.75rem;
  color:white;
  opacity: 0.8;
}
#sidebar{
  display: flex;
  // justify-content: center;
}
.nav-item a {
  padding-left: 0;
  padding-right: 0;
  color: aliceblue;
  border: 1px solid transparent;
  display: flex;
  gap: 1rem;
  align-items: center;
  // background-color: rgba(255, 255, 255, .03);
}
.nav-item a::hover{
  text-decoration: underline;
  color: burlywood;
}
.nav-item{
  font-size: 1.15rem;
  opacity: 0.75;
  color: initial;
  transition: opacity 0.4s ease;
  &:hover{
    opacity: 1;
    color: white;
    transition: opacity 0.4s ease;

  }
}
</style>
<style>
  #sidebar-variant{
    position: static !important;
    top: 5% !important;
    width: 15rem;
    padding: 0.75rem 0.75rem;
  }
  .b-sidebar-outer{
    position: static !important;
    height: 50rem !important;
    width: auto !important;
  }
</style>