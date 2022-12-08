<template>
  <div id="app">
    <header>
      <HeadNav />
    </header>
    <main>
      <Sidebar />
    </main>
  </div>
</template>

<script>
import HeadNav from './components/shared/HeadNav.vue'
import Sidebar from './components/shared/_Sidebar.vue'

import { routes } from './routes'

export default {

components: {
  'Sidebar': Sidebar,
  'HeadNav': HeadNav
},
data() {
  return {
    routes
  }
}
}

</script>

<style>
@import './assets/css/cores.css';

#app {
font-family: 'Avenir', Helvetica, Arial, sans-serif;
color: white;
text-align: center;
}

body {
height: 100%;
background-color: #273136;
background-image: linear-gradient(180deg,rgba(50,70,80,.9) 0,#0d101b 100%);
}

body::before {
content: "";
position: fixed;
top: 0;
left: 0;
right: 0;
height: 100%;
z-index: -1;
background-image: linear-gradient(180deg,rgba(50,70,80,.9) 0,#0d101b 100%);
}

body::after {
  content: "";
  position: fixed;
  top: 0;
  height: 100%;
  left: 0;
  right: 0;
  z-index: -5;
  background-color: #273136;
  background-image: linear-gradient(180deg,rgba(50,70,80,.9) 0,#0d101b 100%);
  background-image: url("/src/assets/bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: initial;
  height: 100%;
  transition: background .2s linear;
  background-size: cover;
}
.vue-grid-item.vue-resizable.cssTransforms{
touch-action:none;
}
body {
background-color:transparent;
}
</style>
