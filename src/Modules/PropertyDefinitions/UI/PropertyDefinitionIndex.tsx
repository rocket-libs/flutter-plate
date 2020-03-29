import React, { useState } from "react";
import PropertyDefinitionPotter from "../Potter/PropertyDefinitionPotter";
import PropertyDefinitionRepository from "../Potter/PropertyDefinitionRepository";
import PropertyDefinition from "../Potter/PropertyDefinition";
import PropertyDefinitionState from "../Potter/PropertyDefinitionState";
import PotterStarter from "../../../Shared/Utility/Potter/PotterStarter";

let potter: PropertyDefinitionPotter;
export default function PropertyDefinitionIndex(){
    const[started,setStarted] = useState(false);
    return  <>
                <PotterStarter
                    currentPotter={null as unknown as PropertyDefinitionPotter}
                    newPotter={new PropertyDefinitionPotter(new PropertyDefinitionRepository(),new PropertyDefinition(),new PropertyDefinitionState())}
                    onStarted={(startedPotter: PropertyDefinitionPotter) => {
                        potter = startedPotter;
                        setStarted(true);
                    }} />
                {started ? render() : null}
            </>
}



const render = () => {
    return  <div>
                <div className="flex-grid">
                    <div className="col-1">
                        Property Name:
                        <input type="text" onChange={e => {
                            const signature = potter.context.repository.propertySignature;
                            signature.name = e.target.value;
                            potter.pushToRepository({propertySignature: signature});
                        }} />
                    </div>
                    <div className="col-1">
                        Property Type:
                        <select onChange={e => {
                             const signature = potter.context.repository.propertySignature;
                             signature.type = e.target.value;
                             potter.pushToRepository({propertySignature: signature});
                        }}>
                            <option value="String">String</option>
                            <option value="int">int</option>
                        </select>
                    </div>
                    <div className="col-1">
                        <input type="button" onClick={() => alert(`${potter.context.repository.propertySignature.name} = ${potter.context.repository.propertySignature.type}`)} value="Add" />
                    </div>
                </div>
            </div>
}
