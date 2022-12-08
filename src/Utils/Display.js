export class Display{
    static start(){
        this.displays = [
            // {
            //     Name: 'Gauge',
            //     Unit: 'ºC',
            //     Multiplier: 0.125,
            //     Constant: 4,
            //     Minimum: 0.0,
            //     Maximum: 100.0,
            //     Subtitle: 'Medidor de temperatura',
            // },

            {
                id: 1,
                Name: 'Semáforo',
                Unit: 'V',
                Multiplier: 1.05,
                Constant: 0.0,
                Minimum: 0,
                Maximum: 6000,
                Subtitle: 'Tensão DC',
                slot: "Awq2B31/0/DC01"
            },

            // {
            //     Name: 'Grafico',
            //     Unit: 'V',
            //     Multiplier: 1,
            //     Constant: 0.0,
            //     Minimum: 0.0,
            //     Maximum: 25.0,
            //     Subtitle: 'Medidor de tensão',
            // },

            {
                id: 2,
                Name: 'Texto',
                Unit: 'km/h',
                Multiplier: 1,
                Constant: 2.0,
                Minimum: 1.0,
                Maximum: 120.0,
                Subtitle: 'Medidor de velocidade',
                slot: "Awq2B31/3/FQ02"
            },

            {
                id: 3,
                Name: 'Vertical',
                Unit: '°C',
                Multiplier: 1,
                Constant: 4,
                Minimum: 0.0,
                Maximum: 5500.0,
                Subtitle: 'Termometro DC02',
                slot: "Awq2B31/0/DC02"
            },

            // {
            //     Name: 'Grafico',
            //     Unit: 'm/s',
            //     Multiplier: 3.6,
            //     Constant: 0.0,
            //     Minimum: 0.0,
            //     Maximum: 360,
            //     Subtitle: 'Histórico de aceleração',
            // },

            // {
            //     Name: 'Gauge',
            //     Unit: 'm/s',
            //     Multiplier: 3.6,
            //     Constant: 0.0,
            //     Minimum: 0.0,
            //     Maximum: 360,
            //     Subtitle: 'Medidor de velocidade (metros por segundo)',
            // },

            {
                id: 4,
                Name: 'Digital',
                Unit: '',
                Multiplier: 0.02,
                Constant: 0.0,
                Minimum: 0.0,
                Maximum: 1.0,
                Subtitle: 'Luz Ligada',
                slot: "Awq2B31/3/FQ03"
            },
            {
                id: 5,
                Name: 'Vertical',
                Unit: 'oi',
                Multiplier: 1,
                Constant: 1,
                Minimum: 0.0,
                Maximum: 1000.0,
                Subtitle: 'Teste',
                slot: "Awq2B31/3/AC02"
            },

            // {
            //     Name: 'Grafico',
            //     Unit: '°C',
            //     Multiplier: 0.125,
            //     Constant: 4.0,
            //     Minimum: 0.0,
            //     Maximum: 100.0,
            //     Subtitle: 'Historico de temperatura',
            // },

        ]
    }


    static GetDisplays(){
        return this.displays;
    }

    static Update(arr){
        this.displays = arr
    }
}


// {
//     Name: ,
//     Unit: ,
//     Multiplier: ,
//     Constant: ,
//     Minimum: ,
//     Maximum: ,
//     Subtitle: ,
// }