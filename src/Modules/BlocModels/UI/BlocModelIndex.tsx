import React, { useState } from 'react';
import BlocModelPotter from '../Potter/BlocModelPotter';
import BlocModelRepository from '../Potter/BlocModelRepository';
import BlocModel from '../Potter/BlocModel';
import BlocModelState from '../Potter/BlocModelState';
import PotterStarter from '../../../Shared/Utility/Potter/PotterStarter';
import PropertyDefinitionIndex from '../../ClassDefinitions/UI/ClassDefinitionIndex';
import BlocModelClass from './BlocModelClass';
import ClassDefinition from '../../ClassDefinitions/Potter/ClassDefinition';

interface IProps{

}

let potter: BlocModelPotter;

export default function BlocModelIndex(_props: IProps){
    const[changeId,setChangeId] = useState(0);
    return  <>
                <PotterStarter
                    currentPotter={potter}
                    newPotter={new BlocModelPotter(new BlocModelRepository(),new BlocModel(),new BlocModelState())}
                    onStarted={(ptr: BlocModelPotter) => {
                        potter = ptr
                    }}
                    onRerender={() => setChangeId(potter.context.changeId)} />
                {changeId ? render() : null}
            </>
}


const render = () => {
    return  <div>
                <PropertyDefinitionIndex
                    onClassDefinitionChanged={(classDefinition: ClassDefinition) => {
                        potter.pushToModel({propertySignatures: classDefinition.propertySignatures, name: classDefinition.name});
                    }} />
                <BlocModelClass
                    potter={potter} />
            </div>
}