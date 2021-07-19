import React from 'react';
import { 
    getStringNoLocale,
    getDatetime
} from "@inrupt/solid-client";

const TEXT_PREDICATE = "http://schema.org/text";
const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";


function StoredItem({thing}){
    
    const date = getDatetime(thing, CREATED_PREDICATE);
    const certifId = getStringNoLocale(thing, TEXT_PREDICATE);
    const webId = getStringNoLocale(thing, PERSON_PREDICATE);
    const hash = getStringNoLocale(thing, SHA1_PREDICATE);

    return(
        <tr>
            <td>{certifId}</td>
            <td>{webId}</td>
            <td>{hash}</td>
            <td>{date.toDateString()}</td>
        </tr>
    );
}

export default StoredItem;