import React from 'react';
import { 
    getThingAll, 
    getUrl, 
    getDatetime,
    getResourceUrl,
    getResourceInfo
} from "@inrupt/solid-client";
import StoredItem from './storedItem';

const TEXT_PREDICATE = "http://schema.org/text";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";
const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";
const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const CERTIFICATION_CLASS = "http://data.europa.eu/snb/credential/e34929035b";

function StoredList({certifListStored}){
    
    //const { fetch } = useSession();
    

    const certifThings = certifListStored ? getThingAll(certifListStored) : [];
    certifThings.sort((a, b) => {
        return (
          getDatetime(a, CREATED_PREDICATE) - getDatetime(b, CREATED_PREDICATE)
        );
    });

    let user = '';
    if (certifListStored) {
        const rawUrl = certifThings[0].url.split("/")[4];
        user = rawUrl.split("#")[0].slice(0, -4);
    }
    console.log("TEST", user)

    // const thingsArray = certifThings
    //     //filters for todo-type predicates, (don't think this is needed in current version) but it can be an extra check
    //     .filter((t) => getUrl(t, TYPE_PREDICATE) === CERTIFICATION_CLASS)
    //     .map((t) => {
    //         return { dataset: certifListStored, thing: t }; 
        
    //     });

   
    return(
        <div className="table-container">
            <span className="table-message">
            {!user ? "No Holder selected" : 
                `${user} has ${certifThings.length} certificate${certifThings.length === 1 ? "" : "s"} issued.`
            }
            </span>
            <table className="table">
                <thead>
                    <tr>
                        <th>Certificate</th>
                        <th>WebID</th>
                        {/* <th>Validation Hash</th> */}
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    { !certifThings ? <span>No certificates stored</span>
                        : certifThings.map( (item, index) => 
                            <StoredItem 
                                thing={item}
                                key={index}
                            />
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default StoredList;