import React, {useState} from 'react';
import { SendTxn } from '../utils/sendTxn';
import  CheckIfValid  from '../utils/checkIfValid';
import StoreCertif from '../utils/storeCertif';

function QueItem({id, data, certifListStored, setCertifListStored, certifListQue, setCertifListQue, session}){
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
            await StoreCertif(data, validTxn, certifListStored, setCertifListStored, session)
        } catch {
            console.log("Storing to Pod has Failed (handleStoreCertif)")
        }
        deleteQueItem();
    }

    return(
        <tr>
            <td>{data.certifID}</td>
            <td>{data.webID}</td>
            <td>{chainValid ? "yes" : "no"}</td> {/*temporary*/
            <button hidden={chainValid} onClick={handleSendTxn}>Store on chain</button>}
            <button hidden={chainValid} onClick={handleCheckIfValid}>Verify on chain</button>{/* show only when stored on chain */}
            <button hidden={!validTxn} onClick={handleStoreCertif}>Store on pod</button> {/* show only when verified on chain */}
            <button onClick={deleteQueItem}>X</button>
        </tr>
    );
}

export default QueItem;