import PropertyDefinitionRepository from "./PropertyDefinitionRepository";
import PropertyDefinition from "./PropertyDefinition";
import { PotterState } from "potter-nf";
import PropertySignature from "../Data/PropertySignature";

export default class PropertyDefinitionState extends PotterState<PropertyDefinitionRepository,PropertyDefinition>{
    addButtonDisabled = () : boolean => {
        if(!this.context.repository.propertySignature.name || !this.context.repository.propertySignature.type){
            return true;
        }else{
            return false;
        }
    }

    sortedDataTypes = () => this.context.repository.datatypes.sort();

    addToList = () => {
        const propertiesSignatures = this.context.model.propertySignatures;
        propertiesSignatures.push(this.context.repository.propertySignature);
        this.potter.pushToRepository({propertySignature: new PropertySignature()});
        this.potter.pushToModel({propertySignatures: propertiesSignatures});
        this.onPropertiesChange(this.context.model.propertySignatures);
    }

    onPropertiesChange: (propertySignatures: PropertySignature[]) => void = (_) => {};
}