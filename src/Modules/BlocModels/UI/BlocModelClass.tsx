import React from 'react';
import Multiline from '../../../Shared/Components/Multiline';
import BlocModelPotter from '../Potter/BlocModelPotter';

interface IProps{
    potter: BlocModelPotter;
}

export default function BlocModelClass(props: IProps){
    return <Multiline
                text={props.potter.context.model.classDefinition} />

}