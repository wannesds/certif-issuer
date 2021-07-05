import React, {useState, useEffect} from 'react';
import CreateHash  from '../utils/createHash';
import reactDom from 'react-dom';
import { FetchTxns } from '../utils/fetchTxns';

async function CheckIfValid(data){
    try {
        const array = await FetchTxns(res => res)
        //console.log('checkIfValid :' , chainData, chainData.txnList)
        const hash = CreateHash(data, (resHash => resHash))
        //checks if qued certificate hash is included in a Txn on-chain
        //this means the certif is stored succesfully on-chain
        const validTxn = array.result.find((resTxn) => resTxn.input === '0x' + hash)
        const state = validTxn ? true : false

        return {state: state, validTxn: validTxn}
    } catch {

    }
    
}

export default CheckIfValid;