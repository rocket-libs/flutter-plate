import React from 'react';
import PropertyDefinitionPotter from '../Potter/PropertyDefinitionPotter';
interface IProps{
    potter: PropertyDefinitionPotter
}

export default function PropertyDefinitionForm(props: IProps){
    return  <div>
                <div className="flex-grid">
                    <div className="col-1">
                        Property Name:
                        <input type="text" onChange={e => {
                            const signature = props.potter.context.repository.propertySignature;
                            signature.name = e.target.value;
                            props.potter.pushToRepository({propertySignature: signature});
                        }}
                        value={props.potter.context.repository.propertySignature.name} />
                    </div>
                    <div className="col-1">
                        Property Type:
                        <select onChange={e => {
                             const signature = props.potter.context.repository.propertySignature;
                             signature.type = e.target.value;
                             props.potter.pushToRepository({propertySignature: signature});
                        }}>
                            {props.potter.state.sortedDataTypes().map((datatype) => {
                                return <option key={datatype} value={datatype}>{datatype}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-1">
                        <input disabled={props.potter.state.addButtonDisabled()} type="button" onClick={() => props.potter.state.addToList()} value="Add" />
                    </div>
                </div>
            </div>
}