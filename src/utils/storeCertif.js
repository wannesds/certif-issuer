import {
    addDatetime,
    addUrl,
    addStringNoLocale,
    createThing,
    getSourceUrl,
    saveSolidDatasetAt,
    setThing,
    getSolidDataset,
    getThing,
    getUrlAll
  } from "@inrupt/solid-client";
import { AddReadAccess } from './addReadAccess';
import { getOrCreateCertifList } from '../utils/getOrCreateCertifList';
import { getOrCreateHolderList } from '../utils/getOrCreateHolderList';

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";
const TEXT_PREDICATE = "http://schema.org/text";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";
const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";
const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const CERTIFICATION_CLASS = "http://data.europa.eu/snb/credential/e34929035b";


function StoreCertif(data, validTxn, setCertifListStored, setUserListStored, session) {
    const store = async () => {
        try {
            
        const profileDataset = await getSolidDataset(session.info.webId, {
            fetch: session.fetch,
        });
        const profileThing = getThing(profileDataset, session.info.webId);
        const podsUrls = getUrlAll(profileThing, STORAGE_PREDICATE);
        const pod = podsUrls[0];
        const ttlUri = `${pod}certificates-issued/${data.webID.split("/")[2]}.ttl`
        const certifList = await getOrCreateCertifList(ttlUri, session.fetch)


        //gets the chosen dataset to store things in
        const indexUrl = getSourceUrl(certifList);
        
        //creates a thing and adds triples to it each time needed using solid-client functions
        const certifWithText = addStringNoLocale(createThing(), TEXT_PREDICATE, data.certifID);
        const certifWithDate = addDatetime(certifWithText, CREATED_PREDICATE, new Date() );
        const certifWithHash = addStringNoLocale(certifWithDate, SHA1_PREDICATE, validTxn.hash);
        const certifWithPerson = addStringNoLocale(certifWithHash, PERSON_PREDICATE, data.webID);
        //adds correct class
        const certifWithType = addUrl(certifWithPerson, TYPE_PREDICATE, CERTIFICATION_CLASS);
        //updates certification list with newly added thing
        const updatedCertifList = setThing(certifList, certifWithType);
        //saves dataset on Pod
        
        const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedCertifList, {
            fetch: session.fetch,
        });
        
        AddReadAccess(session, data.webID, ttlUri);
        setCertifListStored(updatedDataset)

        const holders = await getOrCreateHolderList(`${pod}certificates-issued/`, session.fetch)
        setUserListStored(holders);

        console.log("Certif added to pod :", data.certifID);
        } catch {
            return null;
        }
    return true;
    } 
    const res = store();
    return res;  
}

export default StoreCertif;