import React from 'react';
import { 
    getThingAll, 
    getUrl, 
    getDatetime,
} from "@inrupt/solid-client";
import {getCertifList} from '../utils/getCertifList'

// const TEXT_PREDICATE = "http://schema.org/text";
// const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
// const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";
// const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";
// const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
// const CERTIFICATION_CLASS = "http://data.europa.eu/snb/credential/e34929035b";

function UserList({userListStored, setCertifListStored, session}){

    const handleClick = async (item) => {
        console.log(item)
        const list = await getCertifList(item.url, session)
        setCertifListStored(list)
        console.log(list)
    }

   
    return(
        <div className="table-container">
            <span className="tasks-message">
            Users: {userListStored.length}
            </span>
            <table className="table">
                <thead>
                    <tr>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    { !userListStored ? <span>No users found</span>
                        : userListStored.map( (item, index) => 
                            // <StoredItem 
                            //     thing={item}
                            //     key={index}
                            // />
                            <div>
                                <tr>
                                    <td>{item.url}</td>
                                </tr>
                                <button onClick={() => handleClick(item)}>Open</button>
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