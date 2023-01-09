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

<style lang="scss">
@import './assets/css/cores.css';
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
#app {
font-family: "Chakra Petch", 'Avenir', Helvetica, Arial, sans-serif;
color: white;
/* text-align: center; */
letter-spacing: 0.05rem;
overflow-x: hidden;
opacity: 0.85;

}

body {
height: 100%;
background-color: #273136;
background-image: linear-gradient(180deg,rgba(50,70,80,.9) 0,#0d101b 100%);
font-family: "Chakra Petch, sans-serif";
}

body::before {
content: "";
position: fixed;
top: 0;
left: 0;
right: 0;
height: 100%;
z-index: -1;
/* background-image: linear-gradient(180deg,rgba(50,70,80,.9) 0,#0d101b 100%); */
background-image: url("/src/assets/pattern.png");
background-repeat: repeat;
background-size: 80px 80px;
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
  background-image: linear-gradient(180deg,rgba(50,70,80,.9) 0,#0d101b 100%), url("/src/assets/bg.jpg");
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

@mixin borderInCorners{
  background:
				linear-gradient(to right, white 4px, transparent 4px) 0 0,
				linear-gradient(to right, white 4px, transparent 4px) 0 100%,
				linear-gradient(to left, white 4px, transparent 4px) 100% 0,
				linear-gradient(to left, white 4px, transparent 4px) 100% 100%,
				linear-gradient(to bottom, white 4px, transparent 4px) 0 0,
				linear-gradient(to bottom, white 4px, transparent 4px) 100% 0,
				linear-gradient(to top, white 4px, transparent 4px) 0 100%,
				linear-gradient(to top, white 4px, transparent 4px) 100% 100%;
}
</style>
