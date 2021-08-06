import React, {useEffect, useState} from 'react';
import QueItem from '../components/queItem';

function QueList({certifListQue, setCertifListQue, setCertifListStored, setUserListStored, session}){
   
    console.log("quelist certifListQue : ", certifListQue)
    return(
        <div className="table-container">
            <span className="table-message">
            There {certifListQue.length === 1 ? "is" : "are"} {certifListQue.length} certificate{certifListQue.length === 1 ? "" : "s"} ready to be stored.
            </span>
            <table className="table">
                <thead>
                    <tr>
                        <th>Certificate</th>
                        <th>WebID</th>
                        <th>Valid</th>
                    </tr>
                </thead>
                <tbody>
                    { !certifListQue ? []
                        : certifListQue.map( (item, index) => 
                            <QueItem 
                                id={index} 
                                data={item} 
                                setCertifListStored={setCertifListStored}
                                certifListQue={certifListQue}
                                setCertifListQue={setCertifListQue}
                                setUserListStored={setUserListStored}
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