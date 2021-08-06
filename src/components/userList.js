import React from 'react';
import { 
    getThingAll, 
    getUrl, 
    getDatetime,
} from "@inrupt/solid-client";
import {getCertifList} from '../utils/getCertifList'
import {getOrCreateHolderList} from '../utils/getOrCreateHolderList'

// const TEXT_PREDICATE = "http://schema.org/text";
// const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
// const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";
// const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";
// const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
// const CERTIFICATION_CLASS = "http://data.europa.eu/snb/credential/e34929035b";

function UserList({userListStored, setCertifListStored, session}){


    const handleClick = async (item) => {
        const list = await getCertifList(item.url, session)
        setCertifListStored(list)
    }

   
    return(
        <div className="table-container">
            <span className="tasks-message">
            Holders: {userListStored.length}
            </span>
            <table className="table">
                <thead>
                    <tr>
                        <th>Holders</th>
                    </tr>
                </thead>
                <tbody>
                    { !userListStored ? <span>No holders found</span>
                        : userListStored.map( (item, index) => 
                            <div>
                                <tr>
                                    <td>{(item.url.split("/")[4]).slice(0, -4)}</td>
                                    <button onClick={() => handleClick(item)}>Open</button>
                                </tr>
                                
                                {console.log(item.url)}
                            </div>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default UserList;