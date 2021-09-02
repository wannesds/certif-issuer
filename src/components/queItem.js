import React, {useState} from 'react';
import { SendTxn } from '../utils/sendTxn';
import  CheckIfValid  from '../utils/checkIfValid';
import StoreCertif from '../utils/storeCertif';
import { getPodUrl } from '../utils/getPodUrl';

import { 
    getThingAll, 
    getSourceUrl, 
    getDatetime,
} from "@inrupt/solid-client";

function QueItem({id, data, setCertifListStored, certifListQue, setCertifListQue, setUserListStored, session}){
    const [chainValid, setChainValid] = useState("");
    const [validTxn, setValidTxn] = useState("");

    const handleSendTxn = () => {
        SendTxn(data)
    }

    const deleteQueItem = () => {
        console.log("certifListQue : ", certifListQue)
        const resCertifList = certifListQue.slice(0, id).concat(certifListQue.slice(id+1, certifListQue.length +1))
        setCertifListQue(resCertifList)
        console.log("resCertifList : " ,resCertifList)
    }

    const handleCheckIfValid = async () => {
        try {
            const result = await CheckIfValid(data)
            setChainValid(result.state)
            setValidTxn(result.validTxn)
        } catch {
            console.log("Hash validation has failed (handleCheckIfValid)")
        }   
    }

    const handleStoreCertif = async () => {
        try {
            await StoreCertif(data, validTxn, setCertifListStored, setUserListStored, session)
        } catch {
            console.log("Storing to Pod has Failed (handleStoreCertif)")
        }
        deleteQueItem();
    }
    //const test = data.webID.split("/")[2] -> good 
    
    // const test = getSourceUrl(certifListStored)
    // console.log("Complex test", test)
    // if (test !== null) {
    //     const test2 = test.split("/")[4]
    //     console.log("complex test2", test2.slice(0, test2.length - 4))

    // }

    return(
        <tr>
            <td>{data.certifID}</td>
            <td>{data.webID}</td>
            <td>{chainValid ? "yes" : "no"}</td>
            <button hidden={chainValid} onClick={handleSendTxn}>Store on chain</button>
            <button hidden={chainValid} onClick={handleCheckIfValid}>Verify on chain</button>{/* show only when stored on chain */}
            <button hidden={!validTxn} onClick={handleStoreCertif}>Store on pod</button> {/* show only when verified on chain */}
            <button onClick={deleteQueItem}>X</button>
        </tr>
    );
}

export default QueItem;