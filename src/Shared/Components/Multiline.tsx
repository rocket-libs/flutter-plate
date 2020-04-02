import React from "react";

interface IProps{
    text: string;
}



export default function Multiline(props: IProps){
    return  <div>
                <textarea style={{width: "100%"}}>
                    {props.text}
                </textarea>
                <input type="button" value="Copy To Clipboard" onClick={() => copyToClipboard(props)} />
            </div>
}


const copyToClipboard = (props: IProps) => {
    const el = document.createElement('textarea');
    el.value = props.text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("Copied");
  };