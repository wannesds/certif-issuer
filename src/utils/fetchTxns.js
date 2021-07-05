export async function FetchTxns() {
    const user = window.ethereum.selectedAddress;
    const apiKey = "VG1YJWX62VE7Y1G5JENHKSCASJZ4EJ33ZJ";
    try {
        const response = await fetch(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${user}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`)
        const txnList = await response.json();
        console.log("txnList : ", txnList)
      return txnList;
    } catch (error) {
        console.log("Etherscan API couldn't fetch")

        return null;
    }
}
