
<template>
    <div class="cardContainer" v-if="element!=undefined">
        <div class="cardSize" v-if="component" draggable="true">
            <div style="display:flex;justify-content:flex-end; height:1rem; ">
                <b-dropdown dropup @click="$emit('changeDisplay')" id="dropdown">
                    <template #button-content>
                        <b-icon icon="eye-fill" id="changeIcon"/>
                    </template>
                    <b-dropdown-item @click="$emit('changeDisplay', 1)">Gauge</b-dropdown-item>
                    <b-dropdown-item @click="$emit('changeDisplay', 3)">Gráfico</b-dropdown-item>
                    <b-dropdown-item @click="$emit('changeDisplay', 4)">Texto</b-dropdown-item>
                    <b-dropdown-item @click="$emit('changeDisplay', 5)">Semáforo</b-dropdown-item>
                    <b-dropdown-item @click="$emit('changeDisplay', 6)">Vertical</b-dropdown-item>
                </b-dropdown>
            </div>
            <div v-if="element.id==1" class="elementContainer" ref="card">
                <CardConfigIcons @edit="$emit('edit')" @deleteDisplay="$emit('deleteDisplay')"/>
                <GaugeComponent :data="value" :config="config"/>
            </div>
            <div v-if="element.id==2" class="elementContainer" ref="card">
                <CardConfigIcons @edit="$emit('edit')" @deleteDisplay="$emit('deleteDisplay')"/>
                <toggle-button :value="toggle"
                color="#82C7EB"
                @change="changeToggle"
                :sync="true"
                :labels="true"/>
            </div>

            <div v-if="element.id==3" :id="'card-' + (cardId != undefined ? cardId : 0)" class="elementContainer" ref="card">
                <CardConfigIcons @edit="$emit('edit')" @deleteDisplay="$emit('deleteDisplay')"/>
                <ChartComponent :data="value" :config="config" :maxWidth="maxWidth" :maxHeight="maxHeight"/>
            </div>
            
            <div v-if="element.id==4" class="elementContainer" ref="card">
                <CardConfigIcons @edit="$emit('edit')" @deleteDisplay="$emit('deleteDisplay')"/>
                <TextComponent :data="value" :config="config"/>
            </div>
            <div v-if="element.id==5" class="elementContainer" ref="card">
                <CardConfigIcons @edit="$emit('edit')" @deleteDisplay="$emit('deleteDisplay')"/>
                <SemafaroComponent :data="value" :config="config"/>
            </div>
            <div v-if="element.id==6" class="elementContainer" ref="card">
                <CardConfigIcons @edit="$emit('edit')" @deleteDisplay="$emit('deleteDisplay')"/>
                <Vertical :data="value" :config="config"/>
            </div>
            <h4 style="margin-top:0.5rem"><b>{{config.Subtitle}}</b></h4>
        </div>
        <div class="componentGalery" v-else>
            <div v-if="element.id==1">
                <svg width="110" height="71.5"><path d="M-38.5,-4.7148901767173095e-15A38.5,38.5,0,0,1,22.629732213260212,-31.147154283435476L16.97229915994516,-23.36036571257661A28.875,28.875,0,0,0,-28.875,-3.5361676325379825e-15Z" fill="#85a3ca" transform="translate(55, 46.75)" style="opacity: 1;"></path><path d="M-42.35,-5.186379194389041e-15A42.35,42.35,0,0,1,24.892705434586233,-34.26186971177903L22.629732213260212,-31.147154283435476A38.5,38.5,0,0,0,-38.5,-4.7148901767173095e-15Z" fill="rgba(133, 163, 202, 0)" opacity="0.2" transform="translate(55, 46.75)"></path><path d="M22.629732213260212,-31.147154283435476A38.5,38.5,0,0,1,38.5,0L28.875,0A28.875,28.875,0,0,0,16.97229915994516,-23.36036571257661Z" fill="#d3d3d3" transform="translate(55, 46.75)" style="opacity: 1;"></path><path d="M24.892705434586233,-34.26186971177903A42.35,42.35,0,0,1,42.35,0L38.5,0A38.5,38.5,0,0,0,22.629732213260212,-31.147154283435476Z" fill="rgba(211, 211, 211, 0)" opacity="0.2" transform="translate(55, 46.75)"></path><path d="M16.463130185146802,-22.659554741199308L-1.5573577141717738,-1.1314866106630106L-1.1314866106630106,1.5573577141717738L1.5573577141717738,1.1314866106630106L16.463130185146802,-22.659554741199308" stroke="#f76c57" stroke-width="2" fill="#f76c57" transform="translate(55, 46.75)"></path><path d="M-3.85,-4.71489017671731e-16A3.85,3.85,0,1,1,3.85,4.71489017671731e-16A3.85,3.85,0,1,1,-3.85,-4.71489017671731e-16Z" fill="#f76c57" transform="translate(55, 46.75)" class="bar"></path></svg>
            </div>
            <div v-if="element.id==2">
                <toggle-button :value="false"
                style="cursor: default !important;"
                color="#82C7EB"
                :sync="true"
                :labels="true"/>
            </div>
            <div v-if="element.id==3">
                <svg id="SvgjsSvg1076" width="208" height="129.1925465838509" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev" class="apexcharts-svg" xmlns:data="ApexChartsNS" transform="translate(0, 0)" style="background: transparent;"><g id="SvgjsG1078" class="apexcharts-inner apexcharts-graphical" transform="translate(39.25, 35)"><defs id="SvgjsDefs1077"><clipPath id="gridRectMask1yc5gbks"><rect id="SvgjsRect1085" width="165.75" height="82.19254658385091" x="-3.5" y="-1.5" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><clipPath id="forecastMask1yc5gbks"></clipPath><clipPath id="nonForecastMask1yc5gbks"></clipPath><clipPath id="gridRectMarkerMask1yc5gbks"><rect id="SvgjsRect1086" width="202.75" height="123.19254658385091" x="-22" y="-22" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><linearGradient id="SvgjsLinearGradient1100" x1="0" y1="0" x2="0" y2="1"><stop id="SvgjsStop1101" stop-opacity="0.65" stop-color="blue" offset="0"></stop><stop id="SvgjsStop1102" stop-opacity="0.5" stop-color="" offset="1"></stop><stop id="SvgjsStop1103" stop-opacity="0.5" stop-color="" offset="1"></stop></linearGradient></defs><line id="SvgjsLine1084" x1="-0.5" y1="0" x2="-0.5" y2="79.19254658385091" stroke="#b6b6b6" stroke-dasharray="3" stroke-linecap="butt" class="apexcharts-xcrosshairs" x="-0.5" y="0" width="1" height="79.19254658385091" fill="#b1b9c4" filter="none" fill-opacity="0.9" stroke-width="1"></line><g id="SvgjsG1106" class="apexcharts-xaxis" transform="translate(0, 0)"><g id="SvgjsG1107" class="apexcharts-xaxis-texts-g" transform="translate(0, -4)"></g><line id="SvgjsLine1113" x1="0" y1="80.19254658385091" x2="158.75" y2="80.19254658385091" stroke="#e0e0e0" stroke-dasharray="0" stroke-width="1" stroke-linecap="butt"></line></g><g id="SvgjsG1131" class="apexcharts-grid"><g id="SvgjsG1132" class="apexcharts-gridlines-horizontal"></g><g id="SvgjsG1133" class="apexcharts-gridlines-vertical"></g><line id="SvgjsLine1134" x1="0" y1="80.19254658385091" x2="0" y2="86.19254658385091" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1135" x1="39.6875" y1="80.19254658385091" x2="39.6875" y2="86.19254658385091" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1136" x1="79.375" y1="80.19254658385091" x2="79.375" y2="86.19254658385091" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1137" x1="119.0625" y1="80.19254658385091" x2="119.0625" y2="86.19254658385091" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1138" x1="158.75" y1="80.19254658385091" x2="158.75" y2="86.19254658385091" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1140" x1="0" y1="79.19254658385091" x2="158.75" y2="79.19254658385091" stroke="transparent" stroke-dasharray="0" stroke-linecap="butt"></line><line id="SvgjsLine1139" x1="0" y1="1" x2="0" y2="79.19254658385091" stroke="transparent" stroke-dasharray="0" stroke-linecap="butt"></line></g><g id="SvgjsG1087" class="apexcharts-area-series apexcharts-plot-series"><g id="SvgjsG1088" class="apexcharts-series" seriesName="series-1" data:longestSeries="true" rel="1" data:realIndex="0"><path id="SvgjsPath1104" d="M0 79.19254658385091L0 39.596273291925456C13.890625 39.596273291925456 25.796875 59.394409937888184 39.6875 59.394409937888184C53.578125 59.394409937888184 65.484375 31.677018633540364 79.375 31.677018633540364C93.265625 31.677018633540364 105.171875 7.9192546583851 119.0625 7.9192546583851C132.953125 7.9192546583851 144.859375 19.798136645962728 158.75 19.798136645962728C158.75 19.798136645962728 158.75 19.798136645962728 158.75 79.19254658385091M158.75 19.798136645962728C158.75 19.798136645962728 158.75 19.798136645962728 158.75 19.798136645962728 " fill="url(#SvgjsLinearGradient1100)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-area" index="0" clip-path="url(#gridRectMask1yc5gbks)" pathTo="M 0 79.19254658385091L 0 39.596273291925456C 13.890625 39.596273291925456 25.796875 59.394409937888184 39.6875 59.394409937888184C 53.578125 59.394409937888184 65.484375 31.677018633540364 79.375 31.677018633540364C 93.265625 31.677018633540364 105.171875 7.9192546583851 119.0625 7.9192546583851C 132.953125 7.9192546583851 144.859375 19.798136645962728 158.75 19.798136645962728C 158.75 19.798136645962728 158.75 19.798136645962728 158.75 79.19254658385091M 158.75 19.798136645962728z" pathFrom="M -1 79.19254658385091L -1 79.19254658385091L 39.6875 79.19254658385091L 79.375 79.19254658385091L 119.0625 79.19254658385091L 158.75 79.19254658385091"></path><path id="SvgjsPath1105" d="M0 39.596273291925456C13.890625 39.596273291925456 25.796875 59.394409937888184 39.6875 59.394409937888184C53.578125 59.394409937888184 65.484375 31.677018633540364 79.375 31.677018633540364C93.265625 31.677018633540364 105.171875 7.9192546583851 119.0625 7.9192546583851C132.953125 7.9192546583851 144.859375 19.798136645962728 158.75 19.798136645962728C158.75 19.798136645962728 158.75 19.798136645962728 158.75 19.798136645962728 " fill="none" fill-opacity="1" stroke="#003cff" stroke-opacity="1" stroke-linecap="butt" stroke-width="3" stroke-dasharray="0" class="apexcharts-area" index="0" clip-path="url(#gridRectMask1yc5gbks)" pathTo="M 0 39.596273291925456C 13.890625 39.596273291925456 25.796875 59.394409937888184 39.6875 59.394409937888184C 53.578125 59.394409937888184 65.484375 31.677018633540364 79.375 31.677018633540364C 93.265625 31.677018633540364 105.171875 7.9192546583851 119.0625 7.9192546583851C 132.953125 7.9192546583851 144.859375 19.798136645962728 158.75 19.798136645962728" pathFrom="M -1 79.19254658385091L -1 79.19254658385091L 39.6875 79.19254658385091L 79.375 79.19254658385091L 119.0625 79.19254658385091L 158.75 79.19254658385091" fill-rule="evenodd"></path><g id="SvgjsG1089" class="apexcharts-series-markers-wrap" data:realIndex="0"><g id="SvgjsG1091" class="apexcharts-series-markers" clip-path="url(#gridRectMarkerMask1yc5gbks)"><circle id="SvgjsCircle1092" r="3" cx="0" cy="39.596273291925456" class="apexcharts-marker no-pointer-events wlk47o4em" stroke="white" fill="#4972b366" fill-opacity="1" stroke-width="1" stroke-opacity="0.9" rel="0" j="0" index="0" default-marker-size="3"></circle><circle id="SvgjsCircle1093" r="3" cx="39.6875" cy="59.394409937888184" class="apexcharts-marker no-pointer-events wmm65tap" stroke="white" fill="#4972b366" fill-opacity="1" stroke-width="1" stroke-opacity="0.9" rel="1" j="1" index="0" default-marker-size="3"></circle></g><g id="SvgjsG1094" class="apexcharts-series-markers" clip-path="url(#gridRectMarkerMask1yc5gbks)"><circle id="SvgjsCircle1095" r="3" cx="79.375" cy="31.677018633540364" class="apexcharts-marker no-pointer-events wsjoa5euu" stroke="white" fill="#4972b366" fill-opacity="1" stroke-width="1" stroke-opacity="0.9" rel="2" j="2" index="0" default-marker-size="3"></circle></g><g id="SvgjsG1096" class="apexcharts-series-markers" clip-path="url(#gridRectMarkerMask1yc5gbks)"><circle id="SvgjsCircle1097" r="3" cx="119.0625" cy="7.9192546583851" class="apexcharts-marker no-pointer-events wbe76qcbo" stroke="white" fill="#4972b366" fill-opacity="1" stroke-width="1" stroke-opacity="0.9" rel="3" j="3" index="0" default-marker-size="3"></circle></g><g id="SvgjsG1098" class="apexcharts-series-markers" clip-path="url(#gridRectMarkerMask1yc5gbks)"><circle id="SvgjsCircle1099" r="3" cx="158.75" cy="19.798136645962728" class="apexcharts-marker no-pointer-events w3nz1br2ll" stroke="white" fill="#4972b366" fill-opacity="1" stroke-width="1" stroke-opacity="0.9" rel="4" j="4" index="0" default-marker-size="3"></circle></g></g></g><g id="SvgjsG1090" class="apexcharts-datalabels" data:realIndex="0"></g></g><line id="SvgjsLine1141" x1="0" y1="0" x2="158.75" y2="0" stroke="#b6b6b6" stroke-dasharray="0" stroke-width="1" stroke-linecap="butt" class="apexcharts-ycrosshairs"></line><line id="SvgjsLine1142" x1="0" y1="0" x2="158.75" y2="0" stroke-dasharray="0" stroke-width="0" stroke-linecap="butt" class="apexcharts-ycrosshairs-hidden"></line><g id="SvgjsG1143" class="apexcharts-yaxis-annotations"></g><g id="SvgjsG1144" class="apexcharts-xaxis-annotations"></g><g id="SvgjsG1145" class="apexcharts-point-annotations"></g></g><text id="SvgjsText1080" font-family="Helvetica, Arial, sans-serif" x="104" y="16.5" text-anchor="middle" dominant-baseline="auto" font-size="14px" font-weight="900" fill="#373d3f" class="apexcharts-title-text" style="font-family: Helvetica, Arial, sans-serif; opacity: 1;">Gráfico de teste</text><rect id="SvgjsRect1083" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe"></rect><g id="SvgjsG1114" class="apexcharts-yaxis" rel="0" transform="translate(9.25, 0)"><g id="SvgjsG1115" class="apexcharts-yaxis-texts-g"><text id="SvgjsText1117" font-family="Helvetica, Arial, sans-serif" x="20" y="36.4" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="white" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1118">20</tspan><title>20</title></text><text id="SvgjsText1120" font-family="Helvetica, Arial, sans-serif" x="20" y="56.19813664596273" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="white" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1121">15</tspan><title>15</title></text><text id="SvgjsText1123" font-family="Helvetica, Arial, sans-serif" x="20" y="75.99627329192546" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="white" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1124">10</tspan><title>10</title></text><text id="SvgjsText1126" font-family="Helvetica, Arial, sans-serif" x="20" y="95.79440993788819" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="white" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1127">5</tspan><title>5</title></text><text id="SvgjsText1129" font-family="Helvetica, Arial, sans-serif" x="20" y="115.59254658385092" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="white" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1130">0</tspan><title>0</title></text></g></g><g id="SvgjsG1079" class="apexcharts-annotations"></g></svg>
            </div>
            <div v-if="element.id==4">
                <TextComponent :value="23.33" :config="placeholder"/>
            </div>
            <div v-if="element.id==5">
                <SemafaroComponent :data="55" :config="placeholder"/>
            </div>
            <div v-if="element.id==6">
                <Vertical :data="66" :config="placeholder"/>
            </div>
            <h4><b>{{element.name}}</b></h4>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
// import VueGauge       from 'vue-gauge';
import Vertical from "./verticalComponent.vue"
import TextComponent from './TextComponent.vue'
import SemafaroComponent from './semafaroComponent.vue'
import ChartComponent from './ChartComponent.vue'
import GaugeComponent from './GaugeComponent.vue'
import {
    ToggleButton
} from 'vue-js-toggle-button'
import CardConfigIcons from './CardConfigIcons.vue'
import {
    GridLayout,
    GridItem
} from "vue-grid-layout"



export default {

    components: {
        // VueGauge,
        Vertical,
        TextComponent,
        SemafaroComponent,
        ToggleButton,
        ChartComponent,
        GaugeComponent,
        CardConfigIcons,
        GridLayout,
        GridItem
    },
    data() {
        return {
            toggle: false,
            minW: 320, //constante
            gaugeW: 320, //variavel que será armazenada o valor da largura do card
            placeholder: {
                'Unit': undefined,
                'Multiplier': undefined,
                'Constant': undefined,
                'Minimum': undefined,
                'Subtitle': undefined,
                'Maximum': undefined
            },
            maxWidth: undefined,
            maxHeight: undefined
        }
    },
    methods: {
        changeToggle: function () {
            this.toggle = !this.toggle
        },
    },
    mounted() {
        setInterval(() => {
            if (this.element.id == 3 && this.component) {
                const card = document.querySelector("#card-" + this.cardId)
                try {
                    this.maxWidth = card.offsetWidth
                    this.maxHeight = card.offsetHeight
                } catch {}
            }
        }, 2000);
    },
    props: {
        component: {
            type: Boolean,
            required: true
        },
        element: {
            type: Object,
            required: false
        },
        config: {
            type: Object,
            required: false
        },
        value: {
            type: Number,
            required: false
        },
        cardId: {
            type: Number,
            required: false
        }
    },

}
</script>

<style  scoped lang="scss">
    .cardSize{
        height:100%
    }
    .elementContainer{
        display: grid;
        height:80%;
        width: 100%;
        grid-template-rows: 100%;
        grid-template-columns: 5% 90%;
        place-items: center;
        padding-left: 0.125rem;
    }
    .componentGalery{
        height: 10rem;
        width:15rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        color: white;
        background-color: rgba(14, 27, 44, 0.83); 
        border-radius: 12px;
        padding: 1rem;
    }
    .cardContainer{
        height: 100%;
        width: 100%;
        display: flex;
        overflow-x:hidden;
        flex-direction: column;
        justify-content: space-evenly;
        align-content: center;
        color: white;
        background-color: rgba(14, 27, 44, 0.83); 
        border: 1px solid #2d5daa;
        border-radius: 12px;
        padding: 1rem 1rem 2rem;
    }
    .btn-group > .btn, .btn-group-vertical > .btn{
        text-align: end;
    }
</style>

<style>
.dropup .dropdown-toggle::after{
        display:none !important;
}

</style>