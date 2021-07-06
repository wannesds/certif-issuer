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
        const resCertifList = certifListQue.splice(id, id + 1)
        setCertifListQue(resCertifList);
    }

    const handleCheckIfValid = async () => {
        try {
            const result = await CheckIfValid(data)
            console.log('validcheck result : ', result)
            setChainValid(result.state)
            setValidTxn(result.validTxn)
        } catch {
            
        }
        
    }

    const handleStoreCertif = async () => {
        try {
            await StoreCertif(data, validTxn, certifListStored, setCertifListStored, session)
        } catch {
            console.log("Storing to Pod has Failed")
        }
        deleteQueItem();
    }

    return(
        <tr>
            <td>{data.certifID}</td>
            <td>{data.webID}</td>
            <button onClick={handleSendTxn}>Store on chain</button>
            <span>On chain? : {chainValid ? "yes" : "no"}</span> {/*temporary*/}
            <button hidden={chainValid} onClick={handleCheckIfValid}>Verify on chain</button>{/* show only when stored on chain */}
            <button hidden={!validTxn} onClick={handleStoreCertif}>Store on pod</button> {/* show only when verified on chain */}
            <button onClick={deleteQueItem}>X</button>
        </tr>
    );
}

export default QueItem;