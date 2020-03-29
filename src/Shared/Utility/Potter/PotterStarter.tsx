import React, { useState, useEffect } from "react";
import Potter, { PotterState } from "potter-nf";


interface IProps<TRepository,TModel,TState extends PotterState<TRepository,TModel>, TPotter extends Potter<TRepository,TModel,TState>>{
    currentPotter: TPotter;
    newPotter: TPotter;
    onStarted: (potter: TPotter) => void;
}



export default function PotterStarter<TRepository,TModel,TState extends PotterState<TRepository,TModel>, TPotter extends Potter<TRepository,TModel,TState>>(props: IProps<TRepository,TModel,TState, TPotter>){
    const [potterChangeId, setPotterChangeId] = useState(0);
    useEffect(() => {
        const initializePotter = () : () => void => {
            const potterCleanup = props.newPotter.subscribe(() => setPotterChangeId(props.newPotter.context.changeId));
            return function cleanup() {
                potterCleanup();
            }
        }
        return initializePotter();
    },
    // eslint-disable-next-line 
    [potterChangeId])
    if(props.currentPotter){
        props.onStarted(props.currentPotter);
    }else{
        props.onStarted(props.newPotter);
    }
    return <></>
}

