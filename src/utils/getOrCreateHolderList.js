import {
    createSolidDataset,
    getSolidDataset,
    getThingAll,
    saveSolidDatasetAt
  } from "@inrupt/solid-client";
  
export async function getOrCreateHolderList(containerUri, fetch) {
  const indexUrl = `${containerUri}`
  try {
    //finds the given dataset if available
    const certifFolder = await getSolidDataset(indexUrl, { fetch })

    const ttlArray = getThingAll(certifFolder)


    // const ttlUrlArray = [];
    // //slice, first item is no ttl
    // ttlArray.slice(1).forEach(ttl => {
    //   ttlUrlArray.push(ttl)
    // })
    //creates array of the ttl url's
    //slice first as its no ttl
    console.log(certifFolder)
    return ttlArray.slice(1);
    //return certifFolder;

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