export async function FetchEthApi(option) {
    const key = "VG1YJWX62VE7Y1G5JENHKSCASJZ4EJ33ZJ";
    //key should be hidden, back-end or api-credential-token solution  
    try {
        const response = await fetch(option + key);
        const res = await response.json();

        return res;
    } catch (error) {
        console.log("Etherscan API couldn't fetch")

        return null;
    }
}
