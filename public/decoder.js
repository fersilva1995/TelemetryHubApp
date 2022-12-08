class Decoder {

    constructor() {}
    static decode(topic, message) {

        var sn = topic.split("/")[0];
        var module = topic.split("/")[1];

        //header
        var pr = message[0];
        var id = message[1];
        var version = message[2];
        var cmd = message[3];
        var varSize =  message[4] * 256 + message[5];
        var dataSize = message[6] * 256 + message[7];

        //payload
        var startVar = 8; 
        var startData = startVar + varSize * 2; 
        var dataCounter = startData;

        if(varSize > 0) {
            for(var counter = startVar; counter < startData; counter = counter+2){
                var variableCode = VarCode.varMap.get(message[counter]*256+message[counter+1]);
                var variableValueSize = VarCode.getVarSize(variableCode);
                var value = 0;
                var shiftCounter = variableValueSize-1;
                for(var varDataCounter = dataCounter; varDataCounter < dataCounter + variableValueSize; varDataCounter++) {
                    value += message[varDataCounter] << 8 * shiftCounter;
                    shiftCounter--;
                }
                const key = sn + "/" + module + "/" + variableCode
                dataCounter += variableValueSize;
                Variable.UpdateVariable(key, value);
            } 
        }
    }
}

class VarCode {
    constructor() {

    }

    static start() {
        this.varMap = new Map([
            [0x000,'SN'],
            [0x007,'INTEGRITY'],
            [0x008,'RT_CPU'],
            [0x00A,'RT_EXP1'],
            [0x00C,'RT_EXP2'],
            [0x00E,'RT_EXP3'],
            [0x010,'VAR_TE01'],
            [0x011,'TE01'],
            [0x013,'VAR_HU01'],
            [0x014,'HU01'],
            [0x016,'AU01_toggle'],
            [0x017,'AP01_port_in'],
            [0x019,'AP02_target_port'],
            [0x01B,'IP_D'],
            [0x01F,'IP_M'],
            [0x023,'IP_G'],
            [0x027,'IP_S'],
            [0x02B,'IP_audio_target'],
            [0x02F,'IP_Reset'],
            [0x030,'DEVICE_RESET'],
            [0x031,'RESET_COUNTER'],
            [0x032,'RESET_PULSE'],
            [0x033,'RESET_LIMIT'],
            [0x034,'RESET_STATUS'],
            [0x035,'TUNNEL_MODE'],
            [0x040,'SR01_MODE'],
            [0x041,'SR01_RX_LEVEL'],
            [0x042,'SR01_TX_LEVEL'],
            [0x043,'SR01_PARITY_STATUS'],
            [0x044,'SR01_PARITY_MODE'],
            [0x045,'SR01_BAUDRATE'],
            [0x046,'SR01_STATUS'],
            [0x047,'SR02_MODE'],
            [0x048,'SR02_RX_LEVEL'],
            [0x049,'SR02_TX_LEVEL'],
            [0x04A,'SR02_PARITY_STATUS'],
            [0x04B,'SR02_PARITY_MODE'],
            [0x04C,'SR02_BAUDRATE'],
            [0x04D,'SR02_STATUS'],
            [0x04E,'SR03_MODE'],
            [0x04F,'SR03_RX_LEVEL'],
            [0x050,'SR03_TX_LEVEL'],
            [0x051,'SR03_PARITY_STATUS'],
            [0x052,'SR03_PARITY_MODE'],
            [0x053,'SR03_BAUDRATE'],
            [0x054,'SR03_STATUS'],
            [0x055,'SR04_MODE'],
            [0x056,'SR04_RX_LEVEL'],
            [0x057,'SR04_TX_LEVEL'],
            [0x058,'SR04_PARITY_STATUS'],
            [0x059,'SR04_PARITY_MODE'],
            [0x05A,'SR04_BAUDRATE'],
            [0x05B,'SR04_STATUS'],
            [0x05C,'SR05_MODE'],
            [0x05D,'SR05_RX_LEVEL'],
            [0x05E,'SR05_TX_LEVEL'],
            [0x05F,'SR05_PARITY_STATUS'],
            [0x060,'SR05_PARITY_MODE'],
            [0x061,'SR05_BAUDRATE'],
            [0x062,'SR05_STATUS'],
            [0x0C4, 'VAR_PH01'], 
            [0x0C5, 'PH01'], 
            [0x0C7, 'VAR_FQ01'], 
            [0x0C8, 'FQ01'], 
            [0x0CA, 'VAR_PH02'], 
            [0x0CB, 'PH02'], 
            [0x0CD, 'VAR_FQ02'], 
            [0x0CE, 'FQ02'], 
            [0x0D0, 'VAR_PH03'], 
            [0x0D1, 'PH03'], 
            [0x0D3, 'VAR_FQ03'], 
            [0x0D4, 'FQ03'], 
            [0x0D6, 'VAR_PH04'], 
            [0x0D7, 'PH04'], 
            [0x0D9, 'VAR_FQ04'], 
            [0x0DA, 'FQ04'], 
            [0x0DC, 'VAR_PH05'], 
            [0x0DD, 'PH05'], 
            [0x0DF, 'VAR_FQ05'], 
            [0x0E0, 'FQ05'], 
            [0x0E2, 'VAR_PH06'], 
            [0x0E3, 'PH06'], 
            [0x0E5, 'VAR_FQ06'], 
            [0x0E6, 'FQ06'], 
            [0x0E8, 'VAR_PH07'], 
            [0x0E9, 'PH07'], 
            [0x0EB, 'VAR_FQ07'], 
            [0x0EC, 'FQ07'], 
            [0x0EE, 'VAR_PH08'], 
            [0x0EF, 'PH08'], 
            [0x0F1, 'VAR_FQ08'], 
            [0x0F2, 'FQ08'], 
            [0x0F4, 'VAR_PH09'], 
            [0x0F5, 'PH09'], 
            [0x0F7, 'VAR_FQ09'], 
            [0x0F8, 'FQ09'], 
            [0x0FA, 'VAR_PH10'], 
            [0x0FB, 'PH10'], 
            [0x0FD, 'VAR_FQ10'], 
            [0x0FE, 'FQ10'], 
            [0x100,'DO01'],
            [0x101,'DO02'],
            [0x102,'DO03'],
            [0x103,'DO04'],
            [0x104,'DO05'],
            [0x105,'DO06'],
            [0x106,'DO07'],
            [0x107,'DO08'],
            [0x108,'DO09'],
            [0x109,'DO10'],
            [0x10A,'DO11'],
            [0x10B,'DO12'],
            [0x10C,'DO13'],
            [0x10D,'DO14'],
            [0x10E,'DO15'],
            [0x10F,'DO16'],
            [0x110,'DO17'],
            [0x111,'DO18'],
            [0x112,'DO19'],
            [0x113,'DO20'],
            [0x114,'DO21'],
            [0x115,'DO22'],
            [0x116,'DO23'],
            [0x117,'DO24'],
            [0x118,'DO25'],
            [0x119,'DO26'],
            [0x11A,'DO27'],
            [0x11B,'DO28'],
            [0x11C,'DO29'],
            [0x11D,'DO30'],
            [0x11E,'DO31'],
            [0x11F,'DO32'],
            [0x120,'DO33'],
            [0x121,'DO34'],
            [0x122,'DO35'],
            [0x123,'DO36'],
            [0x124,'DO37'],
            [0x125,'DO38'],
            [0x126,'DO39'],
            [0x127,'DO40'],
            [0x128,'DO41'],
            [0x129,'DO42'],
            [0x12A,'DO43'],
            [0x12B,'DO44'],
            [0x12C,'DO45'],
            [0x12D,'DO46'],
            [0x12E,'DO47'],
            [0x12F,'DO48'],
            [0x130,'DO49'],
            [0x131,'DO50'],
            [0x132,'DO51'],
            [0x133,'DO52'],
            [0x134,'DO53'],
            [0x135,'DO54'],
            [0x136,'DO55'],
            [0x137,'DO56'],
            [0x138,'DO57'],
            [0x139,'DO58'],
            [0x13A,'DO59'],
            [0x13B,'DO60'],
            [0x13C,'DO61'],
            [0x13D,'DO62'],
            [0x13E,'DO63'],
            [0x13F,'DO64'],
            [0x140,'DI01'],
            [0x141,'DI02'],
            [0x142,'DI03'],
            [0x143,'DI04'],
            [0x144,'DI05'],
            [0x145,'DI06'],
            [0x146,'DI07'],
            [0x147,'DI08'],
            [0x148,'DI09'],
            [0x149,'DI10'],
            [0x14A,'DI11'],
            [0x14B,'DI12'],
            [0x14C,'DI13'],
            [0x14D,'DI14'],
            [0x14E,'DI15'],
            [0x14F,'DI16'],
            [0x150,'DI17'],
            [0x151,'DI18'],
            [0x152,'DI19'],
            [0x153,'DI20'],
            [0x154,'DI21'],
            [0x155,'DI22'],
            [0x156,'DI23'],
            [0x157,'DI24'],
            [0x158,'DI25'],
            [0x159,'DI26'],
            [0x15A,'DI27'],
            [0x15B,'DI28'],
            [0x15C,'DI29'],
            [0x15D,'DI30'],
            [0x15E,'DI31'],
            [0x15F,'DI32'],
            [0x160,'DI33'],
            [0x161,'DI34'],
            [0x162,'DI35'],
            [0x163,'DI36'],
            [0x164,'DI37'],
            [0x165,'DI38'],
            [0x166,'DI39'],
            [0x167,'DI40'],
            [0x168,'DI41'],
            [0x169,'DI42'],
            [0x16A,'DI43'],
            [0x16B,'DI44'],
            [0x16C,'DI45'],
            [0x16D,'DI46'],
            [0x16E,'DI47'],
            [0x16F,'DI48'],
            [0x170,'DI49'],
            [0x171,'DI50'],
            [0x172,'DI51'],
            [0x173,'DI52'],
            [0x174,'DI53'],
            [0x175,'DI54'],
            [0x176,'DI55'],
            [0x177,'DI56'],
            [0x178,'DI57'],
            [0x179,'DI58'],
            [0x17A,'DI59'],
            [0x17B,'DI60'],
            [0x17C,'DI61'],
            [0x17D,'DI62'],
            [0x17E,'DI63'],
            [0x17F,'DI64'],
            [0x180,'VAR_DC01'],
            [0x181,'CAL_DC01'],
            [0x183,'DC01'],
            [0x185,'VAR_DC02'],
            [0x186,'CAL_DC02'],
            [0x188,'DC02'],
            [0x18A,'VAR_DC03'],
            [0x18B,'CAL_DC03'],
            [0x18D,'DC03'],
            [0x18F,'VAR_DC04'],
            [0x190,'CAL_DC04'],
            [0x192,'DC04'],
            [0x194,'VAR_DC05'],
            [0x195,'CAL_DC05'],
            [0x197,'DC05'],
            [0x199,'VAR_DC06'],
            [0x19A,'CAL_DC06'],
            [0x19C,'DC06'],
            [0x19E,'VAR_DC07'],
            [0x19F,'CAL_DC07'],
            [0x1A1,'DC07'],
            [0x1A3,'VAR_DC08'],
            [0x1A4,'CAL_DC08'],
            [0x1A6,'DC08'],
            [0x1A8,'VAR_DC09'],
            [0x1A9,'CAL_DC09'],
            [0x1AB,'DC09'],
            [0x1AD,'VAR_DC10'],
            [0x1AE,'CAL_DC10'],
            [0x1B0,'DC10'],
            [0x1B2,'VAR_DC11'],
            [0x1B3,'CAL_DC11'],
            [0x1B5,'DC11'],
            [0x1B7,'VAR_DC12'],
            [0x1B8,'CAL_DC12'],
            [0x1BA,'DC12'],
            [0x1BC,'VAR_DC13'],
            [0x1BD,'CAL_DC13'],
            [0x1BF,'DC13'],
            [0x1C1,'VAR_DC14'],
            [0x1C2,'CAL_DC14'],
            [0x1C4,'DC14'],
            [0x1C6,'VAR_DC15'],
            [0x1C7,'CAL_DC15'],
            [0x1C9,'DC15'],
            [0x1CB,'VAR_DC16'],
            [0x1CC,'CAL_DC16'],
            [0x1CE,'DC16'],
            [0x1D0,'VAR_DC17'],
            [0x1D1,'CAL_DC17'],
            [0x1D3,'DC17'],
            [0x1D5,'VAR_DC18'],
            [0x1D6,'CAL_DC18'],
            [0x1D8,'DC18'],
            [0x1DA,'VAR_DC19'],
            [0x1DB,'CAL_DC19'],
            [0x1DD,'DC19'],
            [0x1DF,'VAR_DC20'],
            [0x1E0,'CAL_DC20'],
            [0x1E2,'DC20'],
            [0x1E4,'VAR_DC21'],
            [0x1E5,'CAL_DC21'],
            [0x1E7,'DC21'],
            [0x1E9,'VAR_DC22'],
            [0x1EA,'CAL_DC22'],
            [0x1EC,'DC22'],
            [0x1EE,'VAR_DC23'],
            [0x1EF,'CAL_DC23'],
            [0x1F1,'DC23'],
            [0x1F3,'VAR_DC24'],
            [0x1F4,'CAL_DC24'],
            [0x1F6,'DC24'],
            [0x1F8,'VAR_DC25'],
            [0x1F9,'CAL_DC25'],
            [0x1FB,'DC25'],
            [0x1FD,'VAR_DC26'],
            [0x1FE,'CAL_DC26'],
            [0x200,'DC26'],
            [0x202,'VAR_DC27'],
            [0x203,'CAL_DC27'],
            [0x205,'DC27'],
            [0x207,'VAR_DC28'],
            [0x208,'CAL_DC28'],
            [0x20A,'DC28'],
            [0x20C,'VAR_DC29'],
            [0x20D,'CAL_DC29'],
            [0x20F,'DC29'],
            [0x211,'VAR_DC30'],
            [0x212,'CAL_DC30'],
            [0x214,'DC30'],
            [0x216,'VAR_DC31'],
            [0x217,'CAL_DC31'],
            [0x219,'DC31'],
            [0x21B,'VAR_DC32'],
            [0x21C,'CAL_DC32'],
            [0x21E,'DC32'],
            [0x220,'VAR_DC33'],
            [0x221,'CAL_DC33'],
            [0x223,'DC33'],
            [0x225,'VAR_DC34'],
            [0x226,'CAL_DC34'],
            [0x228,'DC34'],
            [0x22A,'VAR_DC35'],
            [0x22B,'CAL_DC35'],
            [0x22D,'DC35'],
            [0x22F,'VAR_DC36'],
            [0x230,'CAL_DC36'],
            [0x232,'DC36'],
            [0x234,'VAR_DC37'],
            [0x235,'CAL_DC37'],
            [0x237,'DC37'],
            [0x239,'VAR_DC38'],
            [0x23A,'CAL_DC38'],
            [0x23C,'DC38'],
            [0x23E,'VAR_DC39'],
            [0x23F,'CAL_DC39'],
            [0x241,'DC39'],
            [0x243,'VAR_DC40'],
            [0x244,'CAL_DC40'],
            [0x246,'DC40'],
            [0x248,'VAR_DC41'],
            [0x249,'CAL_DC41'],
            [0x24B,'DC41'],
            [0x24D,'VAR_DC42'],
            [0x24E,'CAL_DC42'],
            [0x250,'DC42'],
            [0x252,'VAR_DC43'],
            [0x253,'CAL_DC43'],
            [0x255,'DC43'],
            [0x257,'VAR_DC44'],
            [0x258,'CAL_DC44'],
            [0x25A,'DC44'],
            [0x25C,'VAR_DC45'],
            [0x25D,'CAL_DC45'],
            [0x25F,'DC45'],
            [0x261,'VAR_DC46'],
            [0x262,'CAL_DC46'],
            [0x264,'DC46'],
            [0x266,'VAR_DC47'],
            [0x267,'CAL_DC47'],
            [0x269,'DC47'],
            [0x26B,'VAR_DC48'],
            [0x26C,'CAL_DC48'],
            [0x26E,'DC48'],
            [0x270,'VAR_DC49'],
            [0x271,'CAL_DC49'],
            [0x273,'DC49'],
            [0x275,'VAR_DC50'],
            [0x276,'CAL_DC50'],
            [0x278,'DC50'],
            [0x27A,'VAR_DC51'],
            [0x27B,'CAL_DC51'],
            [0x27D,'DC51'],
            [0x27F,'VAR_DC52'],
            [0x280,'CAL_DC52'],
            [0x282,'DC52'],
            [0x284,'VAR_DC53'],
            [0x285,'CAL_DC53'],
            [0x287,'DC53'],
            [0x289,'VAR_DC54'],
            [0x28A,'CAL_DC54'],
            [0x28C,'DC54'],
            [0x28E,'VAR_DC55'],
            [0x28F,'CAL_DC55'],
            [0x291,'DC55'],
            [0x293,'VAR_DC56'],
            [0x294,'CAL_DC56'],
            [0x296,'DC56'],
            [0x298,'VAR_DC57'],
            [0x299,'CAL_DC57'],
            [0x29B,'DC57'],
            [0x29D,'VAR_DC58'],
            [0x29E,'CAL_DC58'],
            [0x2A0,'DC58'],
            [0x2A2,'VAR_DC59'],
            [0x2A3,'CAL_DC59'],
            [0x2A5,'DC59'],
            [0x2A7,'VAR_DC60'],
            [0x2A8,'CAL_DC60'],
            [0x2AA,'DC60'],
            [0x2AC,'VAR_DC61'],
            [0x2AD,'CAL_DC61'],
            [0x2AF,'DC61'],
            [0x2B1,'VAR_DC62'],
            [0x2B2,'CAL_DC62'],
            [0x2B4,'DC62'],
            [0x2B6,'VAR_DC63'],
            [0x2B7,'CAL_DC63'],
            [0x2B9,'DC63'],
            [0x2BB,'VAR_DC64'],
            [0x2BC,'CAL_DC64'],
            [0x2BE,'DC64'],
            [0x2C0,'VAR_AC01'],
            [0x2C1,'CAL50_AC01'],
            [0x2C3,'CAL127_AC01'],
            [0x2C5,'CAL220_AC01'],
            [0x2C7,'AC01'],
            [0x2C9,'VAR_AC02'],
            [0x2CA,'CAL50_AC02'],
            [0x2CC,'CAL127_AC02'],
            [0x2CE,'CAL220_AC02'],
            [0x2D0,'AC02'],
            [0x2D2,'VAR_AC03'],
            [0x2D3,'CAL50_AC03'],
            [0x2D5,'CAL127_AC03'],
            [0x2D7,'CAL220_AC03'],
            [0x2D9,'AC03'],
            [0x2DB,'VAR_AC04'],
            [0x2DC,'CAL50_AC04'],
            [0x2DE,'CAL127_AC04'],
            [0x2E0,'CAL220_AC04'],
            [0x2E2,'AC04'],
            [0x2E4,'VAR_AC05'],
            [0x2E5,'CAL50_AC05'],
            [0x2E7,'CAL127_AC05'],
            [0x2E9,'CAL220_AC05'],
            [0x2EB,'AC05'],
            [0x2ED,'VAR_AC06'],
            [0x2EE,'CAL50_AC06'],
            [0x2F0,'CAL127_AC06'],
            [0x2F2,'CAL220_AC06'],
            [0x2F4,'AC06'],
            [0x2F6,'VAR_AC07'],
            [0x2F7,'CAL50_AC07'],
            [0x2F9,'CAL127_AC07'],
            [0x2FB,'CAL220_AC07'],
            [0x2FD,'AC07'],
            [0x2FF,'VAR_AC08'],
            [0x300,'CAL50_AC08'],
            [0x302,'CAL127_AC08'],
            [0x304,'CAL220_AC08'],
            [0x306,'AC08'],
            [0x308,'VAR_AC09'],
            [0x309,'CAL50_AC09'],
            [0x30B,'CAL127_AC09'],
            [0x30D,'CAL220_AC09'],
            [0x30F,'AC09'],
            [0x311,'VAR_AC10'],
            [0x312,'CAL50_AC10'],
            [0x314,'CAL127_AC10'],
            [0x316,'CAL220_AC10'],
            [0x318,'AC10'],
            [0x31A,'VAR_AC11'],
            [0x31B,'CAL50_AC11'],
            [0x31D,'CAL127_AC11'],
            [0x31F,'CAL220_AC11'],
            [0x321,'AC11'],
            [0x323,'VAR_AC12'],
            [0x324,'CAL50_AC12'],
            [0x326,'CAL127_AC12'],
            [0x328,'CAL220_AC12'],
            [0x32A,'AC12'],
            [0x32C,'VAR_AC13'],
            [0x32D,'CAL50_AC13'],
            [0x32F,'CAL127_AC13'],
            [0x331,'CAL220_AC13'],
            [0x333,'AC13'],
            [0x335,'VAR_AC14'],
            [0x336,'CAL50_AC14'],
            [0x338,'CAL127_AC14'],
            [0x33A,'CAL220_AC14'],
            [0x33C,'AC14'],
            [0x33E,'VAR_AC15'],
            [0x33F,'CAL50_AC15'],
            [0x341,'CAL127_AC15'],
            [0x343,'CAL220_AC15'],
            [0x345,'AC15'],
            [0x347,'VAR_AC16'],
            [0x348,'CAL50_AC16'],
            [0x34A,'CAL127_AC16'],
            [0x34C,'CAL220_AC16'],
            [0x34E,'AC16'],
            [0x350,'VAR_AC17'],
            [0x351,'CAL50_AC17'],
            [0x353,'CAL127_AC17'],
            [0x355,'CAL220_AC17'],
            [0x357,'AC17'],
            [0x359,'VAR_AC18'],
            [0x35A,'CAL50_AC18'],
            [0x35C,'CAL127_AC18'],
            [0x35E,'CAL220_AC18'],
            [0x360,'AC18'],
            [0x362,'VAR_AC19'],
            [0x363,'CAL50_AC19'],
            [0x365,'CAL127_AC19'],
            [0x367,'CAL220_AC19'],
            [0x369,'AC19'],
            [0x36B,'VAR_AC20'],
            [0x36C,'CAL50_AC20'],
            [0x36E,'CAL127_AC20'],
            [0x370,'CAL220_AC20'],
            [0x372,'AC20'],
            [0x374,'VAR_AC21'],
            [0x375,'CAL50_AC21'],
            [0x377,'CAL127_AC21'],
            [0x379,'CAL220_AC21'],
            [0x37B,'AC21'],
            [0x37D,'VAR_AC22'],
            [0x37E,'CAL50_AC22'],
            [0x380,'CAL127_AC22'],
            [0x382,'CAL220_AC22'],
            [0x384,'AC22'],
            [0x386,'VAR_AC23'],
            [0x387,'CAL50_AC23'],
            [0x389,'CAL127_AC23'],
            [0x38B,'CAL220_AC23'],
            [0x38D,'AC23'],
            [0x38F,'VAR_AC24'],
            [0x390,'CAL50_AC24'],
            [0x392,'CAL127_AC24'],
            [0x394,'CAL220_AC24'],
            [0x396,'AC24'],
            [0x398,'VAR_AC25'],
            [0x399,'CAL50_AC25'],
            [0x39B,'CAL127_AC25'],
            [0x39D,'CAL220_AC25'],
            [0x39F,'AC25'],
            [0x3A1,'VAR_AC26'],
            [0x3A2,'CAL50_AC26'],
            [0x3A4,'CAL127_AC26'],
            [0x3A6,'CAL220_AC26'],
            [0x3A8,'AC26'],
            [0x3AA,'VAR_AC27'],
            [0x3AB,'CAL50_AC27'],
            [0x3AD,'CAL127_AC27'],
            [0x3AF,'CAL220_AC27'],
            [0x3B1,'AC27'],
            [0x3B3,'VAR_AC28'],
            [0x3B4,'CAL50_AC28'],
            [0x3B6,'CAL127_AC28'],
            [0x3B8,'CAL220_AC28'],
            [0x3BA,'AC28'],
            [0x3BC,'VAR_AC29'],
            [0x3BD,'CAL50_AC29'],
            [0x3BF,'CAL127_AC29'],
            [0x3C1,'CAL220_AC29'],
            [0x3C3,'AC29'],
            [0x3C5,'VAR_AC30'],
            [0x3C6,'CAL50_AC30'],
            [0x3C8,'CAL127_AC30'],
            [0x3CA,'CAL220_AC30'],
            [0x3CC,'AC30'],
            [0x3CE,'VAR_AC31'],
            [0x3CF,'CAL50_AC31'],
            [0x3D1,'CAL127_AC31'],
            [0x3D3,'CAL220_AC31'],
            [0x3D5,'AC31'],
            [0x3D7,'VAR_AC32'],
            [0x3D8,'CAL50_AC32'],
            [0x3DA,'CAL127_AC32'],
            [0x3DC,'CAL220_AC32'],
            [0x3DE,'AC32'],
            [0x400,'SR01'],
            [0x600,'SR02'],
            [0x800,'SR03'],
            [0xA00,'SR04'],
            [0xC00,'SR05']
        ])
    }

    static getVarSize(varCode) {
        switch (varCode)
        {
            case 'SN':
                return 7;
            case 'RT_CPU':
                return 2;
            case 'RT_EXP1':
                return 2;
            case 'RT_EXP2':
                return 2;
            case 'RT_EXP3':
                return 2;
            case 'VAR_TE01':
                return 1;
            case 'TE01':
                return 2;
            case 'VAR_HU01':
                return 1;
            case 'HU01':
                return 2;
            case 'AU01_toggle':
                return 1;
            case 'AP01_port_in':
                return 2;
            case 'AP02_target_port':
                return 2;
            case 'IP_D':
                return 4;
            case 'IP_M':
                return 4;
            case 'IP_G':
                return 4;
            case 'IP_S':
                return 4;
            case 'IP_audio_target':
                return 4;
            case 'IP_Reset':
                return 1;
            case 'VARIABLES.VAR_PH01':
            case 'VARIABLES.VAR_FQ01':
            case 'VARIABLES.VAR_PH02':
            case 'VARIABLES.VAR_FQ02':
            case 'VARIABLES.VAR_PH03':
            case 'VARIABLES.VAR_FQ03':
                return 1;
            case 'VARIABLES.PH01':
            case 'VARIABLES.FQ01':
            case 'VARIABLES.PH02':
            case 'VARIABLES.FQ02':
            case 'VARIABLES.PH03':
            case 'VARIABLES.FQ03':
                return 2;
            case 'DO01':
            case 'DO02':
            case 'DO03':
            case 'DO04':
            case 'DO05':
            case 'DO06':
            case 'DO07':
            case 'DO08':
            case 'DO09':
            case 'DO10':
            case 'DO11':
            case 'DO12':
            case 'DO13':
            case 'DO14':
            case 'DO15':
            case 'DO16':
            case 'DO17':
            case 'DO18':
            case 'DO19':
            case 'DO20':
            case 'DO21':
            case 'DO22':
            case 'DO23':
            case 'DO24':
            case 'DO25':
            case 'DO26':
            case 'DO27':
            case 'DO28':
            case 'DO29':
            case 'DO30':
            case 'DO31':
            case 'DO32':
            case 'DO33':
            case 'DO34':
            case 'DO35':
            case 'DO36':
            case 'DO37':
            case 'DO38':
            case 'DO39':
            case 'DO40':
            case 'DO41':
            case 'DO42':
            case 'DO43':
            case 'DO44':
            case 'DO45':
            case 'DO46':
            case 'DO47':
            case 'DO48':
            case 'DO49':
            case 'DO50':
            case 'DO51':
            case 'DO52':
            case 'DO53':
            case 'DO54':
            case 'DO55':
            case 'DO56':
            case 'DO57':
            case 'DO58':
            case 'DO59':
            case 'DO60':
            case 'DO61':
            case 'DO62':
            case 'DO63':
            case 'DO64':
            case 'DI01':
            case 'DI02':
            case 'DI03':
            case 'DI04':
            case 'DI05':
            case 'DI06':
            case 'DI07':
            case 'DI08':
            case 'DI09':
            case 'DI10':
            case 'DI11':
            case 'DI12':
            case 'DI13':
            case 'DI14':
            case 'DI15':
            case 'DI16':
            case 'DI17':
            case 'DI18':
            case 'DI19':
            case 'DI20':
            case 'DI21':
            case 'DI22':
            case 'DI23':
            case 'DI24':
            case 'DI25':
            case 'DI26':
            case 'DI27':
            case 'DI28':
            case 'DI29':
            case 'DI30':
            case 'DI31':
            case 'DI32':
            case 'DI33':
            case 'DI34':
            case 'DI35':
            case 'DI36':
            case 'DI37':
            case 'DI38':
            case 'DI39':
            case 'DI40':
            case 'DI41':
            case 'DI42':
            case 'DI43':
            case 'DI44':
            case 'DI45':
            case 'DI46':
            case 'DI47':
            case 'DI48':
            case 'DI49':
            case 'DI50':
            case 'DI51':
            case 'DI52':
            case 'DI53':
            case 'DI54':
            case 'DI55':
            case 'DI56':
            case 'DI57':
            case 'DI58':
            case 'DI59':
            case 'DI60':
            case 'DI61':
            case 'DI62':
            case 'DI63':
            case 'DI64':
                return 1;
            case 'VAR_DC01':
            case 'VAR_DC02':
            case 'VAR_DC03':
            case 'VAR_DC04':
            case 'VAR_DC05':
            case 'VAR_DC06':
            case 'VAR_DC07':
            case 'VAR_DC08':
            case 'VAR_DC09':
            case 'VAR_DC10':
            case 'VAR_DC11':
            case 'VAR_DC12':
            case 'VAR_DC13':
            case 'VAR_DC14':
            case 'VAR_DC15':
            case 'VAR_DC16':
            case 'VAR_DC17':
            case 'VAR_DC18':
            case 'VAR_DC19':
            case 'VAR_DC20':
            case 'VAR_DC21':
            case 'VAR_DC22':
            case 'VAR_DC23':
            case 'VAR_DC24':
            case 'VAR_DC25':
            case 'VAR_DC26':
            case 'VAR_DC27':
            case 'VAR_DC28':
            case 'VAR_DC29':
            case 'VAR_DC30':
            case 'VAR_DC31':
            case 'VAR_DC32':
            case 'VAR_DC33':
            case 'VAR_DC34':
            case 'VAR_DC35':
            case 'VAR_DC36':
            case 'VAR_DC37':
            case 'VAR_DC38':
            case 'VAR_DC39':
            case 'VAR_DC40':
            case 'VAR_DC41':
            case 'VAR_DC42':
            case 'VAR_DC43':
            case 'VAR_DC44':
            case 'VAR_DC45':
            case 'VAR_DC46':
            case 'VAR_DC47':
            case 'VAR_DC48':
            case 'VAR_DC49':
            case 'VAR_DC50':
            case 'VAR_DC51':
            case 'VAR_DC52':
            case 'VAR_DC53':
            case 'VAR_DC54':
            case 'VAR_DC55':
            case 'VAR_DC56':
            case 'VAR_DC57':
            case 'VAR_DC58':
            case 'VAR_DC59':
            case 'VAR_DC60':
            case 'VAR_DC61':
            case 'VAR_DC62':
            case 'VAR_DC63':
            case 'VAR_DC64':
            case 'VAR_AC01':
            case 'VAR_AC02':
            case 'VAR_AC03':
            case 'VAR_AC04':
            case 'VAR_AC05':
            case 'VAR_AC06':
            case 'VAR_AC07':
            case 'VAR_AC08':
            case 'VAR_AC09':
            case 'VAR_AC10':
            case 'VAR_AC11':
            case 'VAR_AC12':
            case 'VAR_AC13':
            case 'VAR_AC14':
            case 'VAR_AC15':
            case 'VAR_AC16':
            case 'VAR_AC17':
            case 'VAR_AC18':
            case 'VAR_AC19':
            case 'VAR_AC20':
            case 'VAR_AC21':
            case 'VAR_AC22':
            case 'VAR_AC23':
            case 'VAR_AC24':
            case 'VAR_AC25':
            case 'VAR_AC26':
            case 'VAR_AC27':
            case 'VAR_AC28':
            case 'VAR_AC29':
            case 'VAR_AC30':
            case 'VAR_AC31':
            case 'VAR_AC32':
                return 1;
            case 'CAL_DC01':
            case 'DC01':
            case 'CAL_DC02':
            case 'DC02':
            case 'CAL_DC03':
            case 'DC03':
            case 'CAL_DC04':
            case 'DC04':
            case 'CAL_DC05':
            case 'DC05':
            case 'CAL_DC06':
            case 'DC06':
            case 'CAL_DC07':
            case 'DC07':
            case 'CAL_DC08':
            case 'DC08':
            case 'CAL_DC09':
            case 'DC09':
            case 'CAL_DC10':
            case 'DC10':
            case 'CAL_DC11':
            case 'DC11':
            case 'CAL_DC12':
            case 'DC12':
            case 'CAL_DC13':
            case 'DC13':
            case 'CAL_DC14':
            case 'DC14':
            case 'CAL_DC15':
            case 'DC15':
            case 'CAL_DC16':
            case 'DC16':
            case 'CAL_DC17':
            case 'DC17':
            case 'CAL_DC18':
            case 'DC18':
            case 'CAL_DC19':
            case 'DC19':
            case 'CAL_DC20':
            case 'DC20':
            case 'CAL_DC21':
            case 'DC21':
            case 'CAL_DC22':
            case 'DC22':
            case 'CAL_DC23':
            case 'DC23':
            case 'CAL_DC24':
            case 'DC24':
            case 'CAL_DC25':
            case 'DC25':
            case 'CAL_DC26':
            case 'DC26':
            case 'CAL_DC27':
            case 'DC27':
            case 'CAL_DC28':
            case 'DC28':
            case 'CAL_DC29':
            case 'DC29':
            case 'CAL_DC30':
            case 'DC30':
            case 'CAL_DC31':
            case 'DC31':
            case 'CAL_DC32':
            case 'DC32':
            case 'CAL_DC33':
            case 'DC33':
            case 'CAL_DC34':
            case 'DC34':
            case 'CAL_DC35':
            case 'DC35':
            case 'CAL_DC36':
            case 'DC36':
            case 'CAL_DC37':
            case 'DC37':
            case 'CAL_DC38':
            case 'DC38':
            case 'CAL_DC39':
            case 'DC39':
            case 'CAL_DC40':
            case 'DC40':
            case 'CAL_DC41':
            case 'DC41':
            case 'CAL_DC42':
            case 'DC42':
            case 'CAL_DC43':
            case 'DC43':
            case 'CAL_DC44':
            case 'DC44':
            case 'CAL_DC45':
            case 'DC45':
            case 'CAL_DC46':
            case 'DC46':
            case 'CAL_DC47':
            case 'DC47':
            case 'CAL_DC48':
            case 'DC48':
            case 'CAL_DC49':
            case 'DC49':
            case 'CAL_DC50':
            case 'DC50':
            case 'CAL_DC51':
            case 'DC51':
            case 'CAL_DC52':
            case 'DC52':
            case 'CAL_DC53':
            case 'DC53':
            case 'CAL_DC54':
            case 'DC54':
            case 'CAL_DC55':
            case 'DC55':
            case 'CAL_DC56':
            case 'DC56':
            case 'CAL_DC57':
            case 'DC57':
            case 'CAL_DC58':
            case 'DC58':
            case 'CAL_DC59':
            case 'DC59':
            case 'CAL_DC60':
            case 'DC60':
            case 'CAL_DC61':
            case 'DC61':
            case 'CAL_DC62':
            case 'DC62':
            case 'CAL_DC63':
            case 'DC63':
            case 'CAL_DC64':
            case 'DC64':
            case 'CAL50_AC01':
            case 'CAL127_AC01':
            case 'CAL220_AC01':
            case 'AC01':
            case 'CAL50_AC02':
            case 'CAL127_AC02':
            case 'CAL220_AC02':
            case 'AC02':
            case 'CAL50_AC03':
            case 'CAL127_AC03':
            case 'CAL220_AC03':
            case 'AC03':
            case 'CAL50_AC04':
            case 'CAL127_AC04':
            case 'CAL220_AC04':
            case 'AC04':
            case 'CAL50_AC05':
            case 'CAL127_AC05':
            case 'CAL220_AC05':
            case 'AC05':
            case 'CAL50_AC06':
            case 'CAL127_AC06':
            case 'CAL220_AC06':
            case 'AC06':
            case 'CAL50_AC07':
            case 'CAL127_AC07':
            case 'CAL220_AC07':
            case 'AC07':
            case 'CAL50_AC08':
            case 'CAL127_AC08':
            case 'CAL220_AC08':
            case 'AC08':
            case 'CAL50_AC09':
            case 'CAL127_AC09':
            case 'CAL220_AC09':
            case 'AC09':
            case 'CAL50_AC10':
            case 'CAL127_AC10':
            case 'CAL220_AC10':
            case 'AC10':
            case 'CAL50_AC11':
            case 'CAL127_AC11':
            case 'CAL220_AC11':
            case 'AC11':
            case 'CAL50_AC12':
            case 'CAL127_AC12':
            case 'CAL220_AC12':
            case 'AC12':
            case 'CAL50_AC13':
            case 'CAL127_AC13':
            case 'CAL220_AC13':
            case 'AC13':
            case 'CAL50_AC14':
            case 'CAL127_AC14':
            case 'CAL220_AC14':
            case 'AC14':
            case 'CAL50_AC15':
            case 'CAL127_AC15':
            case 'CAL220_AC15':
            case 'AC15':
            case 'CAL50_AC16':
            case 'CAL127_AC16':
            case 'CAL220_AC16':
            case 'AC16':
            case 'CAL50_AC17':
            case 'CAL127_AC17':
            case 'CAL220_AC17':
            case 'AC17':
            case 'CAL50_AC18':
            case 'CAL127_AC18':
            case 'CAL220_AC18':
            case 'AC18':
            case 'CAL50_AC19':
            case 'CAL127_AC19':
            case 'CAL220_AC19':
            case 'AC19':
            case 'CAL50_AC20':
            case 'CAL127_AC20':
            case 'CAL220_AC20':
            case 'AC20':
            case 'CAL50_AC21':
            case 'CAL127_AC21':
            case 'CAL220_AC21':
            case 'AC21':
            case 'CAL50_AC22':
            case 'CAL127_AC22':
            case 'CAL220_AC22':
            case 'AC22':
            case 'CAL50_AC23':
            case 'CAL127_AC23':
            case 'CAL220_AC23':
            case 'AC23':
            case 'CAL50_AC24':
            case 'CAL127_AC24':
            case 'CAL220_AC24':
            case 'AC24':
            case 'CAL50_AC25':
            case 'CAL127_AC25':
            case 'CAL220_AC25':
            case 'AC25':
            case 'CAL50_AC26':
            case 'CAL127_AC26':
            case 'CAL220_AC26':
            case 'AC26':
            case 'CAL50_AC27':
            case 'CAL127_AC27':
            case 'CAL220_AC27':
            case 'AC27':
            case 'CAL50_AC28':
            case 'CAL127_AC28':
            case 'CAL220_AC28':
            case 'AC28':
            case 'CAL50_AC29':
            case 'CAL127_AC29':
            case 'CAL220_AC29':
            case 'AC29':
            case 'CAL50_AC30':
            case 'CAL127_AC30':
            case 'CAL220_AC30':
            case 'AC30':
            case 'CAL50_AC31':
            case 'CAL127_AC31':
            case 'CAL220_AC31':
            case 'AC31':
            case 'CAL50_AC32':
            case 'CAL127_AC32':
            case 'CAL220_AC32':
            case 'AC32':
                return 2;
        }

        return 0;
    
    }

}