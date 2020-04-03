import React from 'react';

interface IProps{
    onFileContentsFetched: (contents: string) => void;
}

export default function FileContentFetcher(props: IProps){
    return  <div>
                <input type="file" id="files" onChange={e => fileChanged(e,props)} />
            </div>
}

const fileChanged = (e: any, props: IProps) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        if(event && event.target && event.target.result){
            props.onFileContentsFetched(event.target.result.toString());
        }else{
            props.onFileContentsFetched("");
        }
    };
    reader.readAsText(file);
}