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
    potterStarter();
    return render();
}

const potterStarter = () => {
    return  <>
                <PotterStarter
                    currentPotter={potter}
                    newPotter={new BlocModelPotter(new BlocModelRepository(),new BlocModel(),new BlocModelState())}
                    onStarted={(ptr: BlocModelPotter) => {
                        potter = ptr
                    }} />
                    
            </>
}

const render = () => {
    return  <div>
                <PropertyDefinitionIndex />
            </div>
}