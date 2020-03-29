import React, { useState, useEffect } from "react";
import ReactPotterState from "./ReactPotterState";
import Potter from "potter-nf";


interface IProps<TRepository,TModel,TState extends ReactPotterState<TRepository,TModel>, TPotter extends Potter<TRepository,TModel,TState>>{
    potter: TPotter;
    onStarted: (potter: TPotter) => void;
}



export default function PotterStarter<TRepository,TModel,TState extends ReactPotterState<TRepository,TModel>, TPotter extends Potter<TRepository,TModel,TState>>(props: IProps<TRepository,TModel,TState, TPotter>){
    const [potterChangeId, setPotterChangeId] = useState(0);
    useEffect(() => {
        const initializePotter = () : () => void => {
            const potterCleanup = props.potter.subscribe(() => setPotterChangeId(props.potter.context.changeId));
            return function cleanup() {
                potterCleanup();
            }
        }
        return initializePotter();
    },[potterChangeId])
    props.onStarted(props.potter);
    return <></>
}

