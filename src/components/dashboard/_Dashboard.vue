
<template>
    <div>
        <main>
            <div class="containerFixed">
                <div class="componentSelect">
					<DashboardButton class="toggleButton" />
                    <div id="componentSelectList" class="componentsHidden">
                        <h4 class="dashboardTitle"><b>COMPONENTS</b></h4>
                        <div class="componentsTmHub">
                            <div class="componentList" v-for="element in displays"
                            :key="element.id">
                                <div :componentType="element.id" @drag="drag" @dragend="dragend"  draggable="true" unselectable="on">
                                    <cardComponent :component="false" :element="element"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboardArea">
                    <h4 class="dashboardTitle"><b>DASHBOARD</b></h4>
                    <div class="dashboardContent">
                        <div id="content" style="padding:2rem; padding-bottom:1rem">
                        </div>

                        <!-- Grupos -->
                        <div style="padding:2rem; padding-top:0">
							<draggable v-model="groups" handle=".handle">
								<GroupComponent 
								v-for="group in groups" 
								:key="group.id" 
								:groupName="'Group' + group.id"
								:title="group.title"
								:color="group.color"
								:id="'Group' + group.id" 
								class="grupo"
								@changeName="changeName"
								@changeColor="changeColor"
								@deleteGroup="deleteGroup(groups.indexOf(group))">
									<grid-layout 
									style=" background:transparent; "
									:layout.sync="group.layout"
									:col-num="3"
									:ref="'Group' + group.id"
									:row-height="180"
									:is-draggable="true"
									:is-resizable="true"
									:vertical-compact="true"
									:use-css-transforms="true">
										<grid-item
										style="border:none;background:transparent" 
										:key="group.layout[index].i" v-for="(item, index) in group.loadedDisplayList"
										:x="group.layout[index].x"
										:y="group.layout[index].y"
										:w="group.layout[index].w"
										:h="group.layout[index].h"
										:i="group.layout[index].i"
										:min-h="1"
										:max-h="3"
										:preserveAspectRatio="false"
										>
											<cardComponent  
											:component="true" 
											:element="item.Component"  
											:config="item.Config" 
											:value="item.Value" 
											:cardId="item.Config.id"
											@edit="edit(group, index)" 
											@deleteDisplay="deleteDisplay(group, index)"
											@changeDisplay="changeDisplay(group, index, ...arguments)"/> 
										</grid-item>
									</grid-layout>
								</GroupComponent>
							</draggable>
                        </div>
                    </div>
                </div>
            </div>
			<OffcanvasComponent :edit="editDisplay"/>
        </main>
    </div>
</template>

<script>
/* eslint-disable */
import {
	GridLayout,
	GridItem
} from "vue-grid-layout"
import cardComponent from './componetDashboard/cardComponent.vue';
import DashboardButton from './componetDashboard/ButtonComponent.vue'
import GroupComponent from './componetDashboard/GroupComponent.vue'
import OffcanvasComponent from './componetDashboard/OffcanvasComponent.vue'
import draggable from 'vuedraggable'

//Armazena quais são as posições do mouse na hora que está arrastando o componente
let mouseXY = {
	"x": null,
	"y": null
};
//Armazena qual é a posição onde o componente for arrastado em referencia ao grid-layout
let DragPos = {
	"x": null,
	"y": null,
	"w": 1,
	"h": 1,
	"i": null
};


export default {
	components: {
		GridLayout,
		GridItem,
		cardComponent,
		DashboardButton,
		GroupComponent,
		OffcanvasComponent,
		draggable
	},

	data() {
		return {
			//Lista de displays de visualização de dados
			displays: [{
					name: "Gauge",
					id: 1,
				},
				{
					name: "Digital",
					id: 2
				},
				{
					name: "Grafico",
					id: 3
				},
				{
					name: "Texto",
					id: 4
				},
				{
					name: "Semáforo",
					id: 5
				},
				{
					name: "Vertical",
					id: 6
				},
			],

			// Lista de displays soltos dentro da dashboard (fora de um grupo)
			dashboardComponentList: [],

			// Lista do layout da dashboard, displays fora de um grupo
			layout: [],

			counter: 0,

			// Lista de grupos
			groups: [],

			// Lista de displays que serão carregados ao iniciar a página
			loadedDisplayList: undefined,

			// Variavel booleana que alterna de estados quando um display é solto na dashboard/grupo
			wasDropped: false,

			//Objeto que armazena informações que auxiliarão na hora de adicionar um display para a dashboard/grupo. Nele, são armazenados a lista de displays que terá 
			//uma adição, o contexto, e a referencia do grid-layout
			addHelper: {},

			//Index do grupo onde o Display que será editado
			groupEditIndex: undefined,

			//Index do isplay que será editado
			displayEditIndex: undefined,

			//Display a ser editado
			editDisplay: undefined,

			//variavel que verifica se um display foi configurado corretamente depois de ser solto em uma dashboard/grupo
			isDisplaySetted: false,

			//Configurações do novo displa
			newDisplaySettings: {},
		}
	}, 

	created() {},
	mounted() {

		//FIXME: TODO: DELETAR!!
		const APAGAR = setTimeout(() => {
			console.error("vvvvvvvvvvvvv -= APAGAR!! =- vvvvvvvvvvvvv")
			MqttClient.send_message("mensagem teste", "SNTESTE");
			clearTimeout(APAGAR)
			console.error("^^^^^^^^^^^^^ -= APAGAR!! =- ^^^^^^^^^^^^^")
		}, 1000)

		//recebe grupos que foram criados
		const groupsList = this.$group.GetGroups()
		//recebe os displays que já foram criados
		this.loadedDisplayList = this.$display.GetDisplays();
		this.listSize = this.loadedDisplayList.length
		//variavel que irá armazenar os displays presentes em grupos
		this.listOfDisplaysInGroup = undefined

		if (groupsList.length > 0) {
			//separa os displays que estão soltos na dashboard daqueles que estão dentro de grupos
			this.listOfDisplaysInGroup = this.loadGroups(groupsList, this.loadedDisplayList)
		}

		//Verifica se existe algum display presente dentro de um grupo
		if (this.listOfDisplaysInGroup.length > 0) {

			//Carrega os displays em seus respectivos grupos
			this.loadDiplayInGroup(this.listOfDisplaysInGroup)
		}

		//Função que verifica se um display está sendo arrastado pela tela
		document.addEventListener("dragover", function (e) {

			//Armazena a posição X do mouse
			mouseXY.x = e.clientX;

			//Armazena a posição Y do mouse
			mouseXY.y = e.clientY;


		}, false);

		setInterval(() => {
			try {
				this.updateValues(Variable.GetVariableMap())

			} catch {}
		}, 2000)

	},

	methods: {

		// =-=-=-=-=-=-=-=-=-=-=- MÉTODOS CHAMADOS NO MOUNTED -=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

		//Essa função carrega todos os grupos já iniciados no carregamento da tela
		loadGroups: function (groupList, displayList) {
			//armazena todos os displays dentro de um grupo
			const displaysInGroup = []
			// itera a lista de grupos carregados
			groupList.forEach(groupItem => {
				//objeto com variáveis padrão de um grupo

				const group = {
					id: groupItem.id,
					left: undefined,
					right: undefined,
					bottom: undefined,
					top: undefined,
					component: undefined,
					loadedDisplayList: [],
					layout: groupItem.layout,
					color: groupItem.color,
					title: groupItem.name
				}

				//Adiciona o grupo à lista geeral de grupos
				this.groups.push(group)

				//Objeto que relaciona o id do grupo com todos os displays presente nele
				const groupValues = {
					'id': group.id,
					'displays': []
				}

				displaysInGroup.push(groupValues)

				//Itera todos os displays carregados
				displayList.forEach(disp => {
					//Verifica se o id de um display carregado é o masasaesmo id de um display presente dentro de um grupo
					if (groupItem.groupDisplays.includes(disp.id)) {

						//Adiciona o display na lista de display daquele grupo
						displaysInGroup.slice(-1)[0].displays.push(disp)

					}
				})
			})
			// Retorna o todos os displays e os displays que estão dentro de um grupo
			return displaysInGroup

		},
		//Função que adiciona e renderiza os displays dentro da dashboard
		loadDisplay: function (list) {

			//posição do display em relação ao eixo X
			var x = 0;

			//posição do display em relação ao eixo Y
			var y = 0;

			//Itera todos os displays
			list.forEach(display => {

				// Pega o tipo de visualização que esse display possui através do nome
				var component = this.getComponentByName(display.Name)
				//Configura o display com os dados carregados e o tipo de visualização


				const displayObject = {
					'Config': display,
					'Component': component,
					'Ratio': component.id == 3
				}

				// Adiciona a lista de displays do dashboard
				this.dashboardComponentList.push(displayObject)

				// posiciona o display dinamicamente conforme a quantidade de displays na dashboard aumentam
				if (x == 3) {
					x = 0
					y += 5
				}

				this.layout.push({
					x: x,
					y: y,
					w: 1, // largura
					h: 1, // altura
					i: list.indexOf(display) //id para o plugin vue-grid-layout 
				})

				//próximo display será adicionado a direita
				x += 1

			})
		},

		getVariableValue: function (variable) {
			try {
				const varlist = Variable.GetVariableMap()
				const value = varlist.filter(v => v.name == variable)[0].value
				return value
			} catch {}
		},

		// Função que itera sob todos os itens presentes na lista ade visualizção (displays) e seleciona aquele que se refere através do nome
		getComponentByName: function (name) {
			var component = undefined
			this.displays.forEach(item => {
				if (item.name == name) {
					component = item
				}
			})
			return component
		},

		//Função que adiciona e renderiza os displays dentro dos grupos
		loadDiplayInGroup: function (groupAndDisplayList) {

			// Itera cada um dos grupos
			groupAndDisplayList.forEach(groupSelected => {
				// Seleciona o grupo referente dentro lista de grupos
				const group = this.groups[groupSelected.id - 1]

				// Itera todos os displays de cada grupao
				groupSelected.displays.forEach(display => {
					var value = this.getVariableValue(display.slot)
					const displayObject = {
						'Config': display,
						'Component': this.getComponentByName(display.Name),
						"Value": value
					}
					group.loadedDisplayList.push(displayObject)
				})
			})

		},

		updateValues(varlist) {
			var varNameList = []
			varlist.forEach(v => {
				varNameList.push(v.name)
			})
			this.groups.forEach(group => {
				group.loadedDisplayList.forEach(display => {
					var index = varNameList.indexOf(display.Config.slot)
					if (index != -1) {
						display.Value = varlist[index].value
					} else {
						display.Value = 0
					}
				})
			})
		},

		// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

		// Método que abre e fecha a aba de visualizadores
		showComponents(isOpen) {
			//aba de visualizador

			const components = document.querySelector("#componentSelectList")

			//dashboard
			const dashboard = document.querySelector(".dashboardContent")

			//Se estiver fechada:
			if (!isOpen) {
				//esconde todos os visualizadores
				components.classList.add('componentsHidden')
				components.classList.remove('componentsVisible')

				//Redimenciona o dashboard para não precisar do scroll
				dashboard.classList.remove("dashboardScroll")

			} else {
				//mostra todos os visualizadores
				components.classList.remove('componentsHidden')
				components.classList.add('componentsVisible')

				//Redimenciona o dashboard para poder scrollar 
				dashboard.classList.add("dashboardScroll")
			}
		},

		//Adiciona novo grupo
		newGroup: function () {
			//inicializa o id do grupo e as arrays de layout e variáveis relacionadas a posição do grupo na tela
			const group = {
				id: this.groups.length + 1,
				left: undefined,
				right: undefined,
				bottom: undefined,
				top: undefined,
				component: undefined,
				loadedDisplayList: [],
				layout: [],
				color: undefined,
				title: undefined,
			}
			//adiciona ele na lista de grupos
			this.groups.push(group)
		},

		//Função que adapta a posição do grupo conforme novos itens são adicionados e consequentemente redimencionando a tela
		addGroupPos: function (groupId) {

			const name = "Group" + groupId
			//Seleciona o array com as posições
			const group = this.groups[groupId - 1]
			try {
				// Encontra o container do grupo pelo seu id e obtem um objeto que mostra ass posições dele em relação a tela
				let groupElement = document.getElementById(name + '-espaco').getBoundingClientRect()

				//Adapta o grupo com as novas posições
				group.top = groupElement.top
				group.right = groupElement.right
				group.left = groupElement.left
				group.bottom = groupElement.bottom
				group.component = groupElement;
			} catch {}

		},

		// Função que é chamada quando um display é arrastado 
		drag: function () {
			if (this.layout.length > (this.dashboardComponentList.lenght + 1)) this.layout.pop()

			// seleciona a área do dashboard e as posições em relação a tela
			if (false) {} else {
				//Itera todos os grupos na lista de grupo
				this.groups.forEach(group => {
					const groupId = "Group" + group.id

					//Atualiza as posições do grupo 
					this.addGroupPos(group.id)

					//Verifica se o mouse está dentro dos limites de area do grupo
					if (this.mouseInArea(group)) {

						// indica onde o display será adicionado
						this.dragPos(group.component, group.layout, this.$refs[groupId][0])
					}
				})
			}
		},

		//Função que retorna um bool dizendo se o mouse está dentro da area passada como argumento
		mouseInArea: function (area) {
			if (((mouseXY.x > area.left) && (mouseXY.x < area.right)) && ((mouseXY.y > area.top) && (mouseXY.y < area.bottom))) return true;
			else return false;

		},

		//Adiciona um espaço no local onde o display foi solto
		dragPos: function (dropArea, layout, ref) {

			// Verifica se existe algum espaço que foi reservado mas não ocupado
			if ((layout.findIndex(item => item.i === 'drop')) === -1) {
				try {
					// 'Reserva' o espaço no layout
					layout.push({
						x: (layout.length * 2) % (this.colNum || 3),
						y: layout.length + (this.colNum || 3),
						w: 1,
						h: 1,
						i: 'drop',
					});
				} catch {}
			}

			//não sei
			let index = layout.findIndex(item => item.i === 'drop');
			if (index !== -1) {
				try {
					ref.$children[layout.length].$refs.item.style.display = "none";
				} catch {}
				let el = ref.$children[index];
				el.dragging = {
					"top": mouseXY.y - dropArea.top,
					"left": mouseXY.x - dropArea.left
				};
				let new_pos = el.calcXY(mouseXY.y - dropArea.top, mouseXY.x - dropArea.left);
				ref.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1);
				DragPos.i = String(index);
				DragPos.x = layout[index].x;
				DragPos.y = layout[index].y;
			}

		},

		// Função chamada quando o display é solto
		dragend: function (e) {

			//Verirfica se tá dentro dos limites do dashboard

			this.groups.forEach(group => {
					const groupId = "Group" + group.id

					//atualiza as posições do grupo
					this.addGroupPos(groupId)

					//Verirfica se tá dentro dos limites do grupo
					if (this.mouseInArea(group)) {
						if (group.layout.length > (group.loadedDisplayList.lenght + 1)) group.layout.pop()

						//avisa o watcher que o display foi solto
						this.wasDropped = true

						//adiciona no helper as condições onde o display foi solto	
						this.addHelper.event = e
						this.addHelper.context = group
						this.addHelper.list = group.loadedDisplayList
						this.addHelper.ref = this.$refs[groupId][0]
					}
				})

		},

		// Função chamada quando a configuração do display é feita com sucesso
		dragAdd: function (e, context, list, settings, ref) {
			ref.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
			context.layout = context.layout.filter(obj => obj.i !== 'drop');
			const componentType = e.srcElement.getAttribute('componentType');
			const component = this.displays.filter(c => c.id == componentType)[0]

			const displayObject = {
				'Config': {
					'id': this.listSize + 1,
					'Unit': settings.Unit,
					'Multiplier': settings.Multiplier,
					'Constant': settings.Constant,
					'Minimum': settings.Minimum,
					'Subtitle': settings.Subtitle,
					'Maximum': settings.Maximum,
					'slot': settings.slot,
					'Name': component.name
				},
				'Component': component,
				'Value': 0,
				'Ratio': component.id == 3
			}


			this.listSize += 1
			list.push(displayObject)
			context.layout.push({
				x: DragPos.x,
				y: DragPos.y,
				w: 1,
				h: 1,
				maxH: 3,
				minH: 1,
				i: DragPos.i,
			});
		},

		dragDisplay: function (e) {
			this.counter += 1
		},

		//função que abre as configurações do display
		openOffcanvas() {
			this.$root.$emit('bv::toggle::collapse', 'sidebar-right')
		},

		//Função que recebe as configurações do display
		getInfo(e) {
			//armazena as configurações
			this.newDisplaySettings = e

			if (this.groupEditIndex == undefined) { //verifica se as informações não são para edição
				this.isDisplaySetted = true; // avisa o watcher que o display foi configurado com sucesso
			} else {
				this.groups[this.groupEditIndex].loadedDisplayList[this.displayEditIndex].Config = this.newDisplaySettings // atualiza as novas configurações
			}

			//Limpa os campos de edição e adição
			this.groupEditIndex = undefined
			this.displayEditIndex = undefined
		},

		edit(group, index) {

			this.groupEditIndex = this.groups.indexOf(group)
			this.displayEditIndex = index

			this.editDisplay = this.groups[this.groupEditIndex].loadedDisplayList[this.displayEditIndex].Config
			this.openOffcanvas()

		},
		deleteDisplay(group, index) {
			const groupIndex = this.groups.indexOf(group)
			var dispList = this.groups[groupIndex].loadedDisplayList
			var layoutList = this.groups[groupIndex].layout
			this.groups[groupIndex].layout = layoutList.filter(pos => layoutList.indexOf(pos) != index)
			this.groups[groupIndex].loadedDisplayList = dispList.filter(disp => dispList.indexOf(disp) != index)
		},
		changeName(info) {
			console.log(this.groups[info.id - 1])
			this.groups[info.id - 1].title = info.newName
		},
		changeColor(info){
			console.log(this.groups[info.id - 1])
			this.groups[info.id - 1].color = info.newColor
		},
		deleteGroup(id){
			this.groups.splice(id , 1)
		},
		changeDisplay(group, index, displayID) {
			const groupIndex = this.groups.indexOf(group)
			const element = this.displays[displayID - 1]
			this.groups[groupIndex].loadedDisplayList[index].Config.Name = element.name
			this.groups[groupIndex].loadedDisplayList[index].Component = element
			console.log(this.groups[groupIndex].loadedDisplayList[index])
		},
	},
	watch: {
		//função que abre a sidebar de configurações quando display é 
		wasDropped() {
			if (this.wasDropped) {
				this.openOffcanvas()
			}
			this.wasDropped = false
		},
		//Função que verifica se o display foi configurado e o adiciona 
		isDisplaySetted() {
			if (this.isDisplaySetted) this.dragAdd(this.addHelper.event, this.addHelper.context, this.addHelper.list, this.newDisplaySettings, this.addHelper.ref)
			this.isDisplaySetted = false
		},

		//Atualiza lista de gurpo
		groups: {
			handler() {
				const updatedGroups = []
				const updatedDisplays = []
				var count = 1
				this.groups.forEach(group => {
					const layoutList = []
					const displayIdList = []
					const groupObject = {
						id: count,
						// id: group.id,
						color: 1,
						groupDisplays: undefined,
						layout: group.layout,
						color: group.color,
						name: group.title
					}
					group.loadedDisplayList.forEach(display => {
						displayIdList.push(display.Config.id)
						updatedDisplays.push(display.Config)
					})
					groupObject.groupDisplays = displayIdList
					updatedGroups.push(groupObject)
					count += 1;
				})

				this.$display.Update(updatedDisplays)
				this.$group.Update(updatedGroups)
			},
			deep: true
		},

	}
}
</script>

<style lang="scss" scoped>
	::-webkit-scrollbar {
	width: 5px;
	}

	/* Track */
	::-webkit-scrollbar-track {
	box-shadow: inset 0 0 5px grey; 
	border-radius: 10px;
	}
	
	/* Handle */
	::-webkit-scrollbar-thumb {
	background: rgb(171, 198, 255);
	border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
	background: rgb(133, 170, 250);; 
	}

	.vue-grid-item.vue-grid-placeholder {
		background:#a373ff !important;
	}
    .dashboardContent{
        overflow-y: auto;
		overflow-x: hidden;
        height:auto;
    }
    .dashboardScroll{
		height: 31vh !important;
    }
    #content{
        height:auto;
    }

	.toggleButton{
		position: absolute;
    	top: 4.2rem;
    	right: 0;
    	margin-right: 1.8rem;
    	z-index: 3;
	}
    .componentsTmHub {
		display: grid;
		grid-template-columns: repeat(3, 33%);
		row-gap: 50px;
		margin: 15px 100px;
	}
    .componentList{
        justify-self: center;
    }
    .containerFixed{
		padding: 1rem;
		margin: 1rem;
    	background-color: rgba(17, 27, 40, 0.712);
    	border-radius: 12px;
    	border: 1px solid rgb(255, 255, 255);
		outline: 2px solid rgba(19, 253, 242, 0.25);
		min-height: 90vh;
		height: auto;

	}
    .componentsHidden{
		transform: scaleY(0);    
  		transform-origin: top;
  		transition: transform 0.25s ease;
		height: 0;
	}
	.componentsVisible{
		height: auto;
		transform-origin: top;
		transition: transform 0.25s ease;
	}
	.dashboardArea{
		// min-height: 10rem;
		overflow-y: auto;
	}
	.dashboardScroll{
		height: 21rem;
	}
	.dashboardTitle{
		background: #0000003b;
		padding:0.2rem; 
		// position:fixed; 
		// width:95%;
		z-index:2
	}
</style>
