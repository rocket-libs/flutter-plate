import React, { CSSProperties, useState } from 'react';
import PotterStarter from "../../../Shared/Utility/Potter/PotterStarter";
import ClassNamePotter from '../Bloc/ClassNamePotter';
import ClassName from '../Bloc/ClassName';
import ClassNameState from '../Bloc/ClassNameState';
import ClassNameRepository from '../Bloc/ClassNameRepository';

interface IProps{
    style?: CSSProperties;
    onNameChange: (name: string) => void;
}

let potter: ClassNamePotter;
export default function ClassNameIndex(props: IProps){
    const[changeId,setChangeId] = useState(0);
    return  <div style={props.style}>
                <PotterStarter
                    currentPotter={potter}
                    newPotter={new ClassNamePotter(new ClassNameRepository(),new ClassName(),new ClassNameState())}
                    onStarted={(ptr) => potter = ptr}
                    onRerender={() => setChangeId(potter.context.changeId)} />
                {changeId ? render(props) : null}
            </div>
    
}

const render = (props: IProps) => {
    return  <div>
                Class Name:
                <input type="text" onChange={e => {
                    potter.pushToModel({name: e.target.value})
                    props.onNameChange(e.target.value);
                }} />
            </div>
}