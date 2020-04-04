import { PotterState } from "potter-nf";
import ModelRepository from "./ModelRepository";
import Model from "./Model";

export default class ModelState extends PotterState<ModelRepository,Model>{
    onFileContentChanged = (fileContent: string) => {
        const model = JSON.parse(fileContent) as Model;
        this.potter.pushToModel({propertySignatures: model.propertySignatures, name: model.name});
    }

    classDefinition = () => {
        if(this.hasClassDeclaration()){
            let block = this.imports();
            block += `\n\nclass ${this.nameOfClass()} extends Model<${this.nameOfClass()}>{`
            block += this.propertyDeclarations();
            block += this.classConstructor();
            block += this.classMerger();
            block += "\n\n" + this.singleFromMapMethod();
            block += "\n\n" + this.toJsonMethod();
            block += "\n}";
            block += this.fieldNamesClass();
            return block;
        }else{
            return "";
        }
    }

    private imports = () : string => {
        return "import 'package:hello_dailies/Mk2/Shared/Data/Database/Model.dart';"
            + "\nimport 'package:hello_dailies/Shared/Data/Guid.dart';"
            + "\nimport 'package:hello_dailies/services/utility/MapReader.dart';"
            + "\nimport 'package:hello_dailies/Shared/Structure/Mergeable.dart';"
    }

    private propertyDeclarations = () : string => {
        let declarations = "";
        for (const propertySignature of this.context.model.propertySignatures) {
            declarations += `\n\tfinal ${propertySignature.type} ${propertySignature.name};`;
        }
        return declarations;
    }

    private classConstructor = () : string => {
        
        let constructorString = `\n\n\t${this.nameOfClass()}({Guid id, `;
        for (const propertySignature of this.context.model.propertySignatures) {
            constructorString += `this.${propertySignature.name}, `;
        }
        
        constructorString = constructorString.substr(0,constructorString.length - 2);
        constructorString += "}){";
        constructorString += "\n\t\tthis.id = id;\n\t}";
        return constructorString;
    }

    private nameOfClass = () : string => {
        return `${this.context.model.name}`;
    }

    private classMerger = () : string => {
        if(this.hasProperties()){
            let mergerString = "\n\n\t@override\n\tmerge({";
            let newModelString = `\n\t\tfinal newModel = new ${this.nameOfClass()}(`;
            for (const propertySignature of this.context.model.propertySignatures) {
                const newPropertyName = this.newPropertyNameGetter(propertySignature.name);
                mergerString += `${newPropertyName}, `;

                newModelString += `\n\t\t\t${propertySignature.name}: resolveValue(${propertySignature.name},${newPropertyName}),`;
            }
            newModelString = newModelString.substr(0,newModelString.length - 1);
            newModelString += `\n\t\t);`
            
            mergerString = mergerString.substr(0,mergerString.length - 2);
            mergerString += "}){";
            mergerString += newModelString;
            mergerString += `\n\t\treturn newModel;`;
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

    private fieldNamesClass = () : string => {
        let block = `\n\nclass ${this.nameOfFieldsClass()}{`;
        for (const propertySignature of this.context.model.propertySignatures) {
            block += `\n\tstatic const String ${propertySignature.name} = "${propertySignature.name}";`
        }
        block += "\n}";
        return block;
    }

    private nameOfFieldsClass = () : string => `_${this.nameOfClass()}FieldNames`;

    private toJsonMethod = () : string => {
        let block = "\t@override\n\tMap<String, dynamic> toJson() {";
        block += "\n\t\treturn <String,dynamic> {";
        block += `\n\t\t\tidFieldName: id,`;
        for (const propertySignature of this.context.model.propertySignatures) {
            block += `\n\t\t\t${this.nameOfFieldsClass()}.${propertySignature.name}: ${propertySignature.name},`
        }
        block = block.substr(0,block.length - 1);
        block += "\n\t\t};"
        block += "\n\t}";
        return block;
    }

    private singleFromMapMethod = () : string => {
        let block = `\t@override\n\t${this.nameOfClass()} singleFromMap(Map<String, dynamic> map) {`;
        block += "\n\t\tfinal mapReader = new MapReader(map);";
        block += `\n\t\treturn new ${this.nameOfClass()}(`;
        block += `\n\t\t\tid: mapReader.getGuid(idFieldName),`;
        for (const propertySignature of this.context.model.propertySignatures) {
            block += `\n\t\t\t${propertySignature.name}: mapReader.get${this.getPascalCased(propertySignature.type)}(${this.nameOfFieldsClass()}.${propertySignature.name}),`
        }
        block = block.substr(0,block.length - 1);
        block += "\n\t\t);"
        block += "\n\t}";
        return block;
    }

    private getPascalCased = (str: string): string => {
        const firstLetter = str.substr(0,1);
        return firstLetter.toUpperCase() + str.substr(1);
    }


    private hasClassDeclaration = () => this.context.model.name && this.hasProperties();
    private hasProperties = () => this.context.model.propertySignatures && this.context.model.propertySignatures.length > 0;
}