import React, {useEffect, useState} from 'react';
import QueItem from '../components/queItem';

function QueList({certifListQue}){
   

    return(
        <div className="table-container">
            <span className="tasks-message">
            There are {certifListQue.length} certificates ready to be stored.
            </span>
            <table className="table">
                <thead>
                    <tr>
                        <th>Certificate</th>
                        <th>WebID</th>
                    </tr>
                </thead>
                <tbody>
                    { !certifListQue ? <span>There are no certificates ready to be stored.</span> 
                        : certifListQue.map( item => 
                            <QueItem data={item}/>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default QueList;