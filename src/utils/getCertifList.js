import {
    createSolidDataset,
    getSolidDataset,
    getThingAll,
    saveSolidDatasetAt,
  } from "@inrupt/solid-client";
  
export async function getCertifList(Url, session) {
  try {
    //finds the given dataset if available
    const certifList = await getSolidDataset(Url, { fetch: session.fetch })

    return certifList;
    //return certifFolder;

  } catch (error) {
    console.log("getCertifList error", error)
  }
}