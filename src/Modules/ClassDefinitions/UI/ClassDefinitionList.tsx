import React, { CSSProperties } from 'react';
import PropertyDefinitionPotter from "../Potter/ClassDefinitionPotter";
import PropertySignature from '../Data/PropertySignature';

interface IProps{
    potter: PropertyDefinitionPotter;
    style: CSSProperties;
}
let potter: PropertyDefinitionPotter;

export default function PropertyDefinitionList(props: IProps){
    potter = props.potter;
    return  <div style={props.style}>
                {table()}
            </div>
}

const table = () => {
    return  <table>
                <thead>
                    <tr>
                        <th>
                            Property Name
                        </th>
                        <th>
                            Property Type
                        </th>
                    </tr>
                </thead>
                {tableRows()}
            </table>
}

const tableRows = () => {
    return potter.context.model.propertySignatures.map((propertySignature: PropertySignature) => {
        return tableCells(propertySignature)
    })
}

const tableCells = (propertySignature: PropertySignature) => {
    const cellStyle = {padding:'5px',border:'solid 1px'} as CSSProperties;
    return  <tr key={propertySignature.name}>
                <td style={cellStyle}>{propertySignature.name}</td>
                <td style={cellStyle}>{propertySignature.type}</td>
            </tr>
}