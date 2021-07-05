import React, {useState} from 'react';
import { SendTxn } from '../utils/sendTxns';
import  CheckIfValid  from '../utils/checkIfValid';

function QueItem({data}){
    const [chainValid, setChainValid] = useState("");
    const [validTxn, setValidTxn] = useState("");

    const handleSendTxn = () => {
        SendTxn(data)
    }

    const handleCheckIfValid = async () => {
        try {
            const result = await CheckIfValid(data, (res => res))
        console.log('validcheck result : ', result)
        setChainValid(result.state)
        setValidTxn(result.validTxn)
        } catch {
            
        }
        
    }

    return(
        <tr>
            <td>{data.certifID}</td>
            <td>{data.webID}</td>
            <button onClick={handleSendTxn}>Store on chain</button>
            <span>On chain? : {chainValid ? "yes" : "no"}</span> {/*temporary*/}
            <button hidden={chainValid} onClick={handleCheckIfValid}>Verify on chain</button>{/* show only when stored on chain */}
            <button hidden={!validTxn}>Store on pod</button> {/* show only when verified on chain */}
        </tr>
    );
}

export default QueItem;