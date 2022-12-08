export class Groups{
    static start(){
        this.groups = [
            {
                id: 1,
                name: "Grupo de teste 01 ",
                color: '#7f03fc',
                groupDisplays: [1, 3, 5],
                layout: [
                    {
                        "x": 0,
                        "y": 0,
                        "h": 2,
                        "w": 1,
                        "i": 0,
                        "moved": false
                    },
                    {
                        "x": 1,
                        "y": 0,
                        "h": 3,
                        "w": 1,
                        "i": 1,
                        "moved": false
                    },
                    {
                        "x": 2,
                        "y": 0,
                        "h": 1,
                        "w": 1,
                        "i": 2,
                        "moved": false
                    }
                ]
            },
            {
                id: 2,
                name: "Grupo Teste",
                color: '#074b78',
                groupDisplays: [2, 4],
                layout: [
                    {
                        "x": 0,
                        "y": 0,
                        "h": 3,
                        "w": 2,
                        "i": 3,
                        "moved": false
                    },
                    {
                        "x": 2,
                        "y": 0,
                        "h": 3,
                        "w": 1,
                        "i": 4,
                        "moved": false
                    }
                ]
            },
            {
                id: 3,
                name: "Grupo DESGRAÇADO",
                color: '#C21E1E',
                groupDisplays: [],
                layout: []
            },
        ]
    }

    static GetGroups(){
        return this.groups
    }

    static Update(arr){
        // console.log(arr)
        this.groups = arr
    }
}