import {
    createSolidDataset,
    getSolidDataset,
    getThingAll,
    saveSolidDatasetAt
  } from "@inrupt/solid-client";
  
export async function getOrCreateHolderList(indexUrl, fetch) {
  //finds all holder files of certif issued to holders
  //if no folder found -> create 1
  try {
    //finds the given dataset if available
    const certifFolder = await getSolidDataset(indexUrl, { fetch })
    //creates array of all found items ttl url's
    const ttlArray = getThingAll(certifFolder)

    //slice first as its no real ttl
    return ttlArray.slice(1);

  } catch (error) {
    if (error.statusCode === 404) {
      //if no folder found, create one
      const indexUrlDefault = `${indexUrl}`
      const certifList = await saveSolidDatasetAt(
        indexUrlDefault,
        createSolidDataset(),
        {
          fetch,
        }
      );
      return certifList;
    }
  }
}