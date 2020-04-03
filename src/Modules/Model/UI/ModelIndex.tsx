import React, { useState } from "react";
import ModelPotter from "../Potter/ModelPotter";
import PotterStarter from "../../../Shared/Utility/Potter/PotterStarter";
import ModelRepository from "../Potter/ModelRepository";
import ModelState from "../Potter/ModelState";
import Model from "../Potter/Model";
import PropertyDefinitionIndex from "../../ClassDefinitions/UI/ClassDefinitionIndex";
import ClassDefinition from "../../ClassDefinitions/Potter/ClassDefinition";
import Multiline from "../../../Shared/Components/Multiline";

let potter: ModelPotter;

export default function ModelIndex(){
    const[changeId,setChangeId] = useState(0);
    return  <>
                <PotterStarter
                    currentPotter={potter}
                    newPotter={new ModelPotter(new ModelRepository(),new Model(),new ModelState())}
                    onStarted={ptr => potter = ptr}
                    onRerender={() => setChangeId(potter.context.changeId)} />
                {changeId ? render() : null}
            </>
}

const render = () => {
    return  <div>
                <PropertyDefinitionIndex
                    onClassDefinitionChanged={(classDefintion: ClassDefinition) => {
                        potter.pushToModel({propertySignatures: classDefintion.propertySignatures, name: classDefintion.name});
                    }} />
                <Multiline
                    text={potter.state.classDefinition()}
                    rows={50} />
            </div>
}