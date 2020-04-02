import React, { useState } from "react";
import PropertyDefinitionPotter from "../Potter/PropertyDefinitionPotter";
import PropertyDefinitionRepository from "../Potter/PropertyDefinitionRepository";
import PropertyDefinition from "../Potter/PropertyDefinition";
import PropertyDefinitionState from "../Potter/PropertyDefinitionState";
import PotterStarter from "../../../Shared/Utility/Potter/PotterStarter";
import PropertyDefinitionForm from "./PropertyDefinitionForm";
import PropertyDefinitionList from "./PropertyDefinitionList";
import PropertySignature from "../Data/PropertySignature";

interface IProps{
    onPropertiesChange: (propertyDefinitions: PropertySignature[]) => void;
}

let potter: PropertyDefinitionPotter;
export default function PropertyDefinitionIndex(props: IProps){
    const[contextId,setContextId] = useState(0);
    return  <>
                <PotterStarter
                    currentPotter={potter as PropertyDefinitionPotter}
                    newPotter={new PropertyDefinitionPotter(new PropertyDefinitionRepository(),new PropertyDefinition(),new PropertyDefinitionState())}
                    onStarted={(startedPotter: PropertyDefinitionPotter) => {
                         potter = startedPotter
                         potter.state.onPropertiesChange = props.onPropertiesChange;
                    }}
                    onRerender={() => setContextId(potter.context.changeId)}/>
                {contextId ? render() : null}
            </>
}



const render = () => {
    return  <>
                <PropertyDefinitionForm
                    potter={potter} />
                <PropertyDefinitionList
                    style={{width:'50%',marginTop:"20px"}}
                    potter={potter} />
            </>
}
