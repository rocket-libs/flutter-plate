import React, { useState } from 'react';
import BlocContextPotter from '../Potter/BlocContextPotter';
import BlocContextRepository from '../Potter/BlocContextRepository';
import BlocContext from '../Potter/BlocContext';
import BlocContextState from '../Potter/BlocContextState';
import PotterStarter from '../../../Shared/Utility/Potter/PotterStarter';
import PropertyDefinitionIndex from '../../ClassDefinitions/UI/ClassDefinitionIndex';
import BlocModelClass from './BlocModelClass';
import ClassDefinition from '../../ClassDefinitions/Potter/ClassDefinition';

interface IProps{

}

let potter: BlocContextPotter;

export default function BlocModelIndex(_props: IProps){
    const[changeId,setChangeId] = useState(0);
    return  <>
                <PotterStarter
                    currentPotter={potter}
                    newPotter={new BlocContextPotter(new BlocContextRepository(),new BlocContext(),new BlocContextState())}
                    onStarted={(ptr: BlocContextPotter) => {
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