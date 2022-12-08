class Variable {

    constructor() {}

    static UpdateVariable(variable, value) {
        if(this.variablesMap === undefined) {
            this.variablesMap = new Map();
        }
        
        if (this.variablesMap.has(variable)) {
            this.variablesMap.set(variable, value);
        }
        else{
            this.variablesMap.set(variable, value);
        }
        //console.log(this.variablesMap)
    }
    
    
    static GetVariableMap() {
        return Array.from(this.variablesMap, ([name, value]) => ({ name, value }));
    }
}
