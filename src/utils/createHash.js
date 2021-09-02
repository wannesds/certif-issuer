import MerkleTree from 'merkletreejs';
import SHA256 from 'crypto-js/sha256';
import getPodUrl from './getPodUrl';

function CreateHash(data) {
    console.log('createhash from', data.webID, data.certifID, data.issuerID)
    const leaves = [data.webID, data.certifID, data.issuerID].map(x => SHA256(x))
    const tree = new MerkleTree(leaves, SHA256)
    const root = tree.getRoot().toString('hex')

    return(root);
}

export default CreateHash;



