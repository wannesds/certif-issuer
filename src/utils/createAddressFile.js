import {
    createSolidDataset,
    getSolidDataset,
    saveSolidDatasetAt,
    addDatetime,
    addUrl,
    addStringNoLocale,
    createThing,
    getSourceUrl,
    setThing
  } from "@inrupt/solid-client";

const CERT_CLASS = 'http://www.w3.org/ns/auth/cert#';
const TEXT_PREDICATE = "http://schema.org/text";
const PUBLICKEY_PREDICATE = 'http://www.w3.org/ns/auth/cert#publickey'
const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const DEFAULT_CLASS = 'https://schema.org/defaultValue';
  
export async function createAddressFile(indexUrl, fetch) {
  try {
    //finds the given dataset if available
    const addressFile = await getSolidDataset(indexUrl, { fetch });
    return addressFile; //not rlly needed
    
  } catch (error) {
    if (error.statusCode === 404) {
      //if not found, then create new dataset
      const addressFile = await saveSolidDatasetAt(
        indexUrl,
        createSolidDataset(),
        {
          fetch,
        }
      );


      //add here the eth address
      return addressFile;
    }
  }
}