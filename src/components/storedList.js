import React from 'react';
import { 
    getThingAll, 
    getUrl, 
    getDatetime,
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

    // const thingsArray = certifThings
    //     //filters for todo-type predicates, (don't think this is needed in current version) but it can be an extra check
    //     .filter((t) => getUrl(t, TYPE_PREDICATE) === CERTIFICATION_CLASS)
    //     .map((t) => {
    //         return { dataset: certifListStored, thing: t }; 
        
    //     });

   
    return(
        <div className="table-container">
            <span className="tasks-message">
            There {certifThings.length === 1 ? "is" : "are"} {certifThings.length} certificate{certifThings.length === 1 ? "" : "s"} ready to be stored.
            </span>
            <table className="table">
                <thead>
                    <tr>
                        <th>Certificate</th>
                        <th>WebID</th>
                        <th>Validation Hash</th>
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