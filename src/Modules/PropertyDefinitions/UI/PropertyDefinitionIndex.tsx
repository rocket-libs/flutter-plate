import React from "react";
import PropertyDefinitionPotter from "../Potter/PropertyDefinitionPotter";
import PropertyDefinitionRepository from "../Potter/PropertyDefinitionRepository";
import PropertyDefinition from "../Potter/PropertyDefinition";
import PropertyDefinitionState from "../Potter/PropertyDefinitionState";
import PotterStarter from "../../../Shared/Utility/Potter/PotterStarter";

let potter: PropertyDefinition;
export default function PropertyDefinitionIndex(){
    if(!potter){
        return potterStarter();
    }else{
        return render();
    }
}


const potterStarter = () => {
    return  <>
                <PotterStarter
                    potter={new PropertyDefinitionPotter(new PropertyDefinitionRepository(),new PropertyDefinition(),new PropertyDefinitionState())}
                    onStarted={(ptr: PropertyDefinitionPotter) => potter = ptr} />
            </>
}

const render = () => {
    return  <div>
                Yokohama
            </div>
}
