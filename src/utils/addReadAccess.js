import {
    getSolidDatasetWithAcl,
    getResourceAcl,
    setAgentResourceAccess,
    saveAclFor,
    hasAcl,
    getThing,
    getUrlAll,
    getSolidDataset,
    hasResourceAcl,
    createAclFromFallbackAcl
  } from "@inrupt/solid-client";

  
export async function AddReadAccess(session, userID, ttlUri){
    const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

    try {
  
        const myDataset = await getSolidDatasetWithAcl(ttlUri, {
            fetch: session.fetch,
        }); 
        let resourceAcl = "";
        if (hasResourceAcl(myDataset)) {
            resourceAcl = getResourceAcl(myDataset)
        } else {
            resourceAcl = createAclFromFallbackAcl(myDataset)
        }
        
        const updatedAcl = setAgentResourceAccess(
            resourceAcl,
            userID,
            { read: true, append: false, write: false, control: false }
        );

        await saveAclFor(myDataset, updatedAcl , {
            fetch: session.fetch,
        });
        /////// VVVVV to be deleted VVVVV
        // console.log('urltest', containerUri, certifListStored)
        // // Fetch the SolidDataset and its associated ACLs, if available:
        // const myDatasetWithAcl = await getSolidDatasetWithAcl(containerUri, {
        //     fetch: session.fetch
        // });
        // console.log("myDatasetWithAcl :", myDatasetWithAcl)

        // const resourceAcl = getResourceAcl(myDatasetWithAcl);
        // //console.log("resourceAcl", resourceAcl)
        // console.log("hasAcl?", hasAcl(myDatasetWithAcl))
        // console.log("userId", userId)
        // console.log("session", session)
        // const updatedAcl = setAgentResourceAccess(
        //     resourceAcl,
        //     userId,
        //     { read: true, append: false, write: false, control: false }
        // );
        // console.log("updatedAcl : ", updatedAcl)
        // await saveAclFor(myDatasetWithAcl, updatedAcl , {
        //     fetch: session.fetch
        // });

       
    } catch {
        console.log("AddReadAccess has failed")
    }

  return;
}