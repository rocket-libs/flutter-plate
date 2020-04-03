import React, { useState } from "react";
import PropertyDefinitionPotter from "../Potter/ClassDefinitionPotter";
import PropertyDefinitionRepository from "../Potter/ClassDefinitionRepository";
import ClassDefinition from "../Potter/ClassDefinition";
import PropertyDefinitionState from "../Potter/ClassDefinitionState";
import PotterStarter from "../../../Shared/Utility/Potter/PotterStarter";
import FileContentFetcher from "../../../Shared/Components/FileContentFetcher";

interface IProps{
    onClassDefinitionChanged: (classDefinition: ClassDefinition) => void;
}

let potter: PropertyDefinitionPotter;
export default function PropertyDefinitionIndex(props: IProps){
    const[contextId,setContextId] = useState(0);
    return  <>
                <PotterStarter
                    currentPotter={potter as PropertyDefinitionPotter}
                    newPotter={new PropertyDefinitionPotter(new PropertyDefinitionRepository(),new ClassDefinition(),new PropertyDefinitionState())}
                    onStarted={(startedPotter: PropertyDefinitionPotter) => {
                         potter = startedPotter
                         potter.state.onClassDefinitionChanged = props.onClassDefinitionChanged;
                    }}
                    onRerender={() => setContextId(potter.context.changeId)}/>
                {contextId ? render() : null}
            </>
}



const render = () => {
    return  <>
                <FileContentFetcher
                    onFileContentsFetched={(contents: string) => potter.state.onFileContentChanged(contents)} />
            </>
}
