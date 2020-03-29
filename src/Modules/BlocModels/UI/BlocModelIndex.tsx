import React from 'react';
import BlocModelPotter from '../Potter/BlocModelPotter';
import BlocModelRepository from '../Potter/BlocModelRepository';
import BlocModel from '../Potter/BlocModel';
import BlocModelState from '../Potter/BlocModelState';
import PotterStarter from '../../../Shared/Utility/Potter/PotterStarter';
import PropertyDefinitionIndex from '../../PropertyDefinitions/UI/PropertyDefinitionIndex';

interface IProps{

}

let potter: BlocModelPotter;

export default function BlocModelIndex(_props: IProps){
    console.log(3434);
    
    
    if(!potter){
        potterStarter();
    }
    return render();
}

const potterStarter = () => {
    return  <>
                <PotterStarter
                    potter={new BlocModelPotter(new BlocModelRepository(),new BlocModel(),new BlocModelState())}
                    onStarted={(ptr: BlocModelPotter) => {
                        potter = ptr
                    }} />
            </>
}

const render = () => {
    return  <div>
                Hi
            </div>
}