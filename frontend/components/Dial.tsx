import React from 'react';
import dialsContent from "../resources/dialsContent.json";
function Dial({winner}) {
    let url = "";
    if (winner == "defender") {
        url = dialsContent['defender']['url'];
    } else if (winner == "attacker") {
        url = dialsContent['attacker']['url'];
    } else {
        url = dialsContent['equal']['url'];
    }
    return (
        <div className='flex justify-center items-center mb-10'>
            <div className='flex flex-col items-center justify-center'>
                <img src={url} width={150}/>
            </div>
        </div>
    );
};

export default Dial;