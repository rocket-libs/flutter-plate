import React, { useState, useEffect, CSSProperties } from 'react';
import NavigationPotter from "../Bloc/NavigationPotter";
import NavigationRepository from '../Bloc/NavigationRepository';
import NavigationInformation from '../Bloc/NavigationInformation';
import NavigationState from '../Bloc/NavigationState';
import NavigationStrings from '../Data/NavigationStrings';
import BlocModelIndex from '../../BlocModels/UI/BlocModelIndex';
import ModelIndex from '../../Model/UI/ModelIndex';

interface IProps{

}

let potter: NavigationPotter;

export default function NavigationIndex(props: IProps){
    const [potterChangeId, setPotterChangeId] = useState(0);
    potter = potter ?? new NavigationPotter(new NavigationRepository(), new NavigationInformation(), new NavigationState());
    useEffect(() => {
        const initializePotter = () : () => void => {
            const potterCleanup = potter.subscribe(() => setPotterChangeId(potter.context.changeId));
            /*if(!potter.state.mounted){
                potter.pushToState({mounted: true});
            }*/
            return function cleanup() {
                potterCleanup();
            }
        }
        return initializePotter();
    },[potterChangeId])
    
    return render(props);
}

const render = (_props: IProps) => {
    const contentStyle = {
        marginLeft: '10px',
        borderLeft: '1px #DDD solid'
    } as CSSProperties;

    const gridStyle={
        margin: '10px'
    } as CSSProperties;

    return <div className="flex-grid" style={gridStyle}>
        <div className="col-1">
            {sideBar()}
        </div>
        <div className="col-20" style={contentStyle}>
            {content()}
        </div>
    </div>
};


const content = () => {
    if(!potter.context.repository.activeRoute){
        return <div>Pick a Route</div>
    }else{
        switch(potter.context.repository.activeRoute){
            case NavigationStrings.blocModel:
                return <BlocModelIndex />
            case NavigationStrings.model:
                return <ModelIndex />
            default:
                throw new Error(`Unknown route '${potter.context.repository.activeRoute}'`);
        }
    }
}

const sideBar = () => {
    return potter.context.repository.routes.map((singleRoute) => {
        return  <div key={singleRoute} style={{borderTop:'1px #DDD solid',borderBottom:'1px #DDD solid', marginTop:'7px'}}>
                    <input type="button" value={singleRoute} onClick={() => potter.pushToRepository({activeRoute: singleRoute})} />
                </div>
    });
}