/* eslint-disable */
<template>
  <!-- <div class="textComponent">
    <h3>{{ nome }}</h3>
    <div>
        <expand />
    </div>

    <div class="iconBar">
      <icon />
    </div>

    <div>
      <span class="textValue">{{ valueText }}</span>
    </div>

    <div>
      <p>{{ unidade }}</p>
    </div>
  </div> -->
  <div class="textComponent">
    <div v-resize-text="{ratio:2, minFontSize: '30px', maxFontSize: '300px', delay: 0}" :style="textColor">{{config.Unit == undefined ? 'VALOR' :value}}</div >
    <small :style="textColor">{{config.Unit == undefined ? 'unidade' : config.Unit}}</small>
  </div>
</template>

<script>
// import icon from "./componentWidget/Icons.vue";
// import expand from "./componentWidget/fullScream.vue";
// export default {
//   components: { icon, expand },
//   data() {
//     return {
//       valueText: 0,
//       //   colorNow: this.cores[0],
//     };
//   },
//   props: {
//     nome: {
//       type: String,
//       default: "example",
//     },
//     multiplicador: {
//       type: Number,
//       default: 1,
//     },
//     constante: {
//       type: Number,
//       default: 0,
//     },
//     cores: {
//       type: Array,
//       default() {
//         new Array("darkgreen", "goldenrod", "firebrick");
//       },
//     },
//     limites: {
//       type: Array,
//       default() {
//         new Array(0.3, 0.6);
//       },
//     },
//     unidade: {
//       type: String,
//       default: "unit",
//     },
//   },
//   created() {
//     // this.value = this.value * this.multiplicador + this.constante;
//   },
// };
import ResizeText from 'vue-resize-text';

export default{
	props:{
		data: Number,
    config: Object
	},
  directives:{
    ResizeText
  },
  mounted(){
        // setInterval(()=>{
        //     this.data = Math.floor(Math.random() * 25);
        // }, 3000);
    },
	computed:{
    value(){
      return (this.data * this.config.Multiplier) + parseInt(this.config.Constant) 
    },
		textColor(){
      const diference = this.config.Maximum - this.config.Minimum
			if(this.value < (diference * 0.33)){
				return{
					'--text-color': 'red'
				}
			}
			else if(this.value > (diference * 0.66)){
				return{
					'--text-color': 'yellowgreen'
				}
			}
			else{
				return{
					'--text-color': 'yellow'
				}
			}

		}
	}
}

</script>
<style scoped>

.textComponent{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
div{
  color: var(--text-color);
}





/* .textComponent {
  display: flex;
  color: #bbb3b3;
  flex-direction: column;
}
.textdata {
  font-size: 5em;
}
.iconBar {
  height: 140px;
  width: 10px;
} */
</style>







