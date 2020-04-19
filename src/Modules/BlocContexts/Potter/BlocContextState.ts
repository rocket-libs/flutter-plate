import BlocContextRepository from "./BlocContextRepository";
import BlocContext from "./BlocContext";
import { PotterState } from "potter-nf";

export default class BlocContextState extends PotterState<BlocContextRepository,BlocContext>{
    classDefinition = () : string => {
        if(!this.context.model.name){
            return "";
        }else{
            return this.classBlock();
        }
    }

    private imports = () : string => {
        return "import 'package:blocstar/ActionState.dart';"
            + "\nimport 'package:blocstar/BlocContextBase.dart';"
            + "\nimport 'package:blocstar/DataManagement/Mergeable.dart';"
    }

    private classBlock = () : string => {
        const className = this.nameOfClass();
        let block =`${this.imports()}`;
        block += `\n\nclass ${className} extends BlocContextBase<${className}>{`;
        block += this.propertyDeclarations();
        block += this.classConstructor();
        block += this.classMerger();
        block += `\n}`;
        return block;
    }

    private propertyDeclarations = () : string => {
        let declarations = "";
        for (const propertySignature of this.context.model.propertySignatures) {
            declarations += `\n\tfinal ${propertySignature.type} ${propertySignature.name};`;
        }
        return declarations;
    }

    private nameOfClass = () : string => {
        return this.context.model.name;
    }

    private classConstructor = () : string => {
        
        let constructorString = `\n\n\t${this.nameOfClass()}({`;
        for (const propertySignature of this.context.model.propertySignatures) {
            constructorString += `this.${propertySignature.name}, `;
        }
        

        constructorString += `Function(ActionState) onActionStateChanged`;
        constructorString += "})";
        constructorString += "\n\t: super(onActionStateChanged);"
        return constructorString;
    }

    private classMerger = () : string => {
        if(this.hasProperties()){
            let mergerString = "\n\n\t@override\n\tmerge({";
            let newModelString = `\n\t\tfinal newContext = ${this.nameOfClass()}(`;
            for (const propertySignature of this.context.model.propertySignatures) {
                const newPropertyName = this.newPropertyNameGetter(propertySignature.name);
                mergerString += `${propertySignature.type} ${newPropertyName}, `;

                newModelString += `\n\t\t\t${propertySignature.name}: resolveValue(${propertySignature.name},${newPropertyName}),`;
            }
            newModelString = newModelString.substr(0,newModelString.length - 1);
            newModelString += `\n\t\t);`
            
            mergerString = mergerString.substr(0,mergerString.length - 2);
            mergerString += "}){";
            mergerString += newModelString;
            mergerString += `\n\t\treturn mergeAppState(newContext);`;
            mergerString += "\n\t}";
            return mergerString; 
        }else{
            return "";
        }
    }

    private newPropertyNameGetter = (propertyName: string) : string => {
        const firstChar = propertyName.substr(0,1);
        const tailingChars = propertyName.substr(1);
        return `new${firstChar.toUpperCase()}${tailingChars}`;
    }

    private hasProperties = () => this.context.model.propertySignatures && this.context.model.propertySignatures.length > 0;
}