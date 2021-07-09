import {
    getSolidDatasetWithAcl,
    getResourceAcl,
    setAgentResourceAccess,
    saveAclFor,
    hasAcl,
    getThing,
    getUrlAll,
    getSolidDataset
  } from "@inrupt/solid-client";

  
export async function AddReadAccess(certifListStored, session, userId){
    const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

    try {
        const profileDataset = await getSolidDataset(session.info.webId, {
            fetch: session.fetch,
        });
          const profileThing = getThing(profileDataset, session.info.webId);
          const podsUrls = getUrlAll(profileThing, STORAGE_PREDICATE);
          const pod = podsUrls[0];
          const containerUri = `${pod}certificates-issued/`
        //had to do these steps to get correct link, might be able to get it from session tho
        
        console.log('urltest', containerUri, certifListStored)
        // Fetch the SolidDataset and its associated ACLs, if available:
        const myDatasetWithAcl = await getSolidDatasetWithAcl(containerUri, {
            fetch: session.fetch
        });
        console.log("myDatasetWithAcl :", myDatasetWithAcl)

        const resourceAcl = getResourceAcl(myDatasetWithAcl);

        const updatedAcl = setAgentResourceAccess(
            resourceAcl,
            userId,
            { read: true, append: false, write: false, control: false }
        );

        await saveAclFor(myDatasetWithAcl, updatedAcl , {
            fetch: session.fetch
        });

        console.log("hasAcl?", hasAcl(myDatasetWithAcl))
        console.log("resourceAcl", resourceAcl)
       
       // const accessByAgent = getAgentAccess(myDatasetWithAcl, "https://ksbuser.solidcommunity.net/profile/card#me");
        //currently testing with reading Access instead of writing new accesses

  
//   // Now save the ACL:
         //await saveAclFor(myDatasetWithAcl, updatedAcl);
        //console.log("accesByGroup test : ", accessByAgent)
    } catch {
        console.log("AddReadAccess has failed")
    }

  return;
}