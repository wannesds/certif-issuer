import Web3 from 'web3';
import CreateHash from './createHash'

export async function SendTxn(data){ 
    console.log("sendTxn data :", data)
    const web3 = new Web3("https://eth-rinkeby.alchemyapi.io/v2/aOmf3RlJunKUJcRWbVXWMdZukj_SMvTl");
    if (window.ethereum) {
        window.web3 = new Web3("https://eth-rinkeby.alchemyapi.io/v2/aOmf3RlJunKUJcRWbVXWMdZukj_SMvTl");
        const txHash = "";//not nessecary?

        try {
                const toBeStoredHash = CreateHash(data, (res => res));
                //parameters will have to be optimised for easier usage, especially GAS
                const transactionParameters = {
                    //nonce: '0x00', // ignored by MetaMask
                    gasPrice: "0x5633", // customizable by user during MetaMask confirmation.
                    gas: '0x6710', // customizable by user during MetaMask confirmation.
                    //to: an empty dummy address, could later on resemble a specific Issuer
                    to: "0x69ce25019cF12de7f78f489cD413A868e44e251c", // Required except during contract publications.
                    from: window.ethereum.selectedAddress, // must match user's active address.
                    value: '1000', //could be 0 // Only required to send ether to the recipient from the initiating external account.
                    data: toBeStoredHash, // Optional, but used for defining smart contract creation and interaction.
                    chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
                };
                // txHash is a hex string
                // "As with any RPC call, it may throw an error"
                const resTxHash = window.ethereum.request({
                    //transaction gets signed with Browser Wallet
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                })//callback hash passed down
                
                .then(txHash => {
                    //transaction gets send to on-chain 
                    window.ethereum.request({
                    method: 'eth_sendRawTransaction',
                    params: [txHash],
                    })
                    //console.log('sendTxn ends with tx hash : ', txHash);
                    
                    return txHash;
                    //await/promises?
                });
                
                //Show transaction processing progress, NEEDED UX feature 

        } catch (error) {
                console.log(error, 'failed')
        }
        //return (resTxHash);
    }
    
    //console.log('sendTxn ends+ with res tx hash : ', resTxHash);

}