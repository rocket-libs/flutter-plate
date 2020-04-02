import PropertySignature from "../Data/PropertySignature";

export default class PropertyDefinitionRepository{
    propertySignature: PropertySignature = new PropertySignature();
    datatypes: string[] = [
        "String",
        "int",
        "double",
        "bool",
        "DateTime"
    ]
}