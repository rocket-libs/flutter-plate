import React, { useState } from 'react';
import BlocModelPotter from '../Potter/BlocModelPotter';
import BlocModelRepository from '../Potter/BlocModelRepository';
import BlocModel from '../Potter/BlocModel';
import BlocModelState from '../Potter/BlocModelState';
import PotterStarter from '../../../Shared/Utility/Potter/PotterStarter';
import PropertyDefinitionIndex from '../../PropertyDefinitions/UI/PropertyDefinitionIndex';
import ClassNameIndex from '../../ClassName/UI/ClassNameIndex';
import BlocModelClass from './BlocModelClass';

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
                <ClassNameIndex 
                    style={{margin:'auto',width:'100%',marginBottom:'20px'}}
                    onNameChange={(name: string) => potter.pushToModel({name: name})} />
                <PropertyDefinitionIndex />
                <BlocModelClass
                    potter={potter} />
            </div>
}