class MqttClient {

    constructor() {

    }

    static start() {
        this.reconnectTimeout = 2000;
        this.cname = "orderform-"+Math.floor(Math.random() * 10000); 
        this.host = "172.16.2.218";
        this.port = 9001; 
        VarCode.start();

    }

    static client() {
        return this;
    }

    static onConnectionLost(){
        console.log("connection lost");
    }

    static onFailure(message) {
        console.log("Failed");
        setTimeout(MQTTconnect, this.reconnectTimeout);
    }

    static onMessageArrived(message){
        Decoder.decode(message.destinationName, message.payloadBytes);
    }

    static onConnected(recon,url){
        console.log(" in onConnected ");
    }


    static onConnect() {

        console.log("Connected");
    }

    static disconnect() {
        this.mqtt.disconnect();
    }

    static  mqttConnect() {

        console.log(MqttClient.host);
        console.log(MqttClient.port);
        console.log(MqttClient.cname);
        localStorage.connected = false
        this.mqtt = new Paho.MQTT.Client(MqttClient.host,MqttClient.port,MqttClient.cname);
        var options = {
            timeout: 3,
            onSuccess: MqttClient.onConnect,
            onFailure: MqttClient.onFailure
        
        };
        
        this.mqtt.onConnectionLost = MqttClient.onConnectionLost;
        this.mqtt.onMessageArrived = MqttClient.onMessageArrived;
        this.mqtt.onConnected = MqttClient.onConnected;
        this.mqtt.connect(options);

    }


    static sub_topics(){
        var stopic="Awq2B31/#";
        var sqos   = 0;
        console.log("here");
        console.log(stopic);
        console.log("Subscribing to topic " + stopic + " QOS "+sqos);

        var soptions={
            qos:sqos,
        };

        this.mqtt.subscribe(stopic,soptions);
        return false;
    }

    static send_message(msg, topic) { 
        var pqos=0;
        var retain_flag=true;
        var message = new Paho.MQTT.Message(msg);
      
        if (topic=="")
            message.destinationName = "test-topic";
        else
            message.destinationName = topic;

        message.qos=pqos;
        message.retained=retain_flag;
        this.mqtt.send(message);
        MqttClient.sub_topics();
        return false;
    }
}


