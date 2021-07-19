import React, {useEffect, useState} from 'react';
import QueItem from '../components/queItem';

function QueList({certifListQue, setCertifListQue, certifListStored, setCertifListStored, session}){
   
    console.log("quelist certifListQue : ", certifListQue)
    return(
        <div className="table-container">
            <span className="tasks-message">
            There {certifListQue.length === 1 ? "is" : "are"} {certifListQue.length} certificate{certifListQue.length === 1 ? "" : "s"} ready to be stored.
            </span>
            <table className="table">
                <thead>
                    <tr>
                        <th>Certificate</th>
                        <th>WebID</th>
                    </tr>
                </thead>
                <tbody>
                    { !certifListQue ? <span>no</span>
                        : certifListQue.map( (item, index) => 
                            <QueItem 
                                id={index} 
                                data={item} 
                                certifListStored={certifListStored}
                                setCertifListStored={setCertifListStored}
                                certifListQue={certifListQue}
                                setCertifListQue={setCertifListQue}
                                session={session}
                                key={index}
                            />
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default QueList;