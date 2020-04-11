import React from 'react';
import Multiline from '../../../Shared/Components/Multiline';
import BlocContextPotter from '../Potter/BlocContextPotter';

interface IProps{
    potter: BlocContextPotter;
}

export default function BlocModelClass(props: IProps){
    return <Multiline
                text={props.potter.state.classDefinition()}
                rows={50} />

}