import ClassDefinition from "./ClassDefinition";
import { PotterState } from "potter-nf";
import ClassDefinitionRepository from "./ClassDefinitionRepository";

export default class ClassDefinitionState extends PotterState<ClassDefinitionRepository,ClassDefinition>{
    onFileContentChanged = (fileContent: string) => {
        const classDefintion = JSON.parse(fileContent) as ClassDefinition;
        this.potter.pushToModel({propertySignatures: classDefintion.propertySignatures, name: classDefintion.name});
        this.onClassDefinitionChanged(this.context.model);
    }

    onClassDefinitionChanged = (_classDefinition: ClassDefinition) => { };
}