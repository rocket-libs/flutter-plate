import React, { useState, useEffect } from "react";
import Potter, { PotterState } from "potter-nf";


interface IProps<TRepository,TModel,TState extends PotterState<TRepository,TModel>, TPotter extends Potter<TRepository,TModel,TState>>{
    currentPotter: TPotter;
    newPotter: TPotter;
    onStarted: (potter: TPotter) => void;
    onRerender: () => void;
}



export default function PotterStarter<TRepository,TModel,TState extends PotterState<TRepository,TModel>, TPotter extends Potter<TRepository,TModel,TState>>(props: IProps<TRepository,TModel,TState, TPotter>){
    const [potterChangeId, setPotterChangeId] = useState(0);
    const potterInstance = props.currentPotter ?? props.newPotter;
    useEffect(() => {
        const initializePotter = () : () => void => {
            const potterCleanup = potterInstance.subscribe(() => setPotterChangeId(potterInstance.context.changeId));
            return function cleanup() {
                potterCleanup();
            }
        }
        if(props.onRerender){
            props.onRerender();
        }
        return initializePotter();
    },
    // eslint-disable-next-line 
    [potterChangeId])
    if(!props.currentPotter){
        props.onStarted(potterInstance);
        potterInstance.broadcastContextChanged();
    }
    return <></>
}

