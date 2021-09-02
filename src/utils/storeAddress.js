import {
    addDatetime,
    addUrl,
    addStringNoLocale,
    createThing,
    getSourceUrl,
    saveSolidDatasetAt,
    setThing
  } from "@inrupt/solid-client";

const TEXT_PREDICATE = "http://schema.org/text";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";
const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";
const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const CERTIFICATION_CLASS = "http://data.europa.eu/snb/credential/e34929035b";


function storeAddress(indexUrl, fetch, addressDataset, selectedAddress) {
    const store = async () => {
        try {              
        const addressWithText = addStringNoLocale(createThing(), TEXT_PREDICATE, selectedAddress);
        const addressWithType = addUrl(addressWithText, TYPE_PREDICATE, CERTIFICATION_CLASS);
        const updatedCertifList = setThing(addressDataset, addressWithType);
        
        const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedCertifList, {
            fetch,
        });

        console.log("Eth address added to pod :", selectedAddress);
        } catch {
            return null;
        }
    return true;
    } 
    const res = store();
    return res;  
}

export default storeAddress;