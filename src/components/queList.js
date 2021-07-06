import React, {useEffect, useState} from 'react';
import QueItem from '../components/queItem';

function QueList({certifListQue, setCertifListQue, certifListStored, setCertifListStored, session}){
   

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
                        : certifListQue.map( (item) => 
                            <QueItem 
                                id={item.id} 
                                data={item} 
                                certifListStored={certifListStored}
                                setCertifListStored={setCertifListStored}
                                certifListQue={certifListQue}
                                setCertifListQue={setCertifListQue}
                                session={session}
                            />
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default QueList;