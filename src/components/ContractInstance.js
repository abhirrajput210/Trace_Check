import contractABI from "../contract/TheProof.json";
import { ethers } from "ethers";
export const CONTRACT_ADDRESS = "0x656A4B0d5C4B3c1e92b75895dB1AbC03498F46d7";
// 0x63175ae632478eecdd05d841d282ec9c508c732c;
// 0x2005C050259422B99eaaE9e923062e54876Bd681;
//0x84fD4c116694FBEa13EF18c7E3048EBD6Cbc697e;
//0xDD0f431EAD96896b28Fea850100501884eb07bDD

export const contractInstance = async () => {
  const { ethereum } = window;
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    if (!provider) {
      console.log("Metamask is not installed, please install!");
    }

    const { chainId } = await provider.getNetwork();
    console.log("switch case for this case is: " + chainId);

    if (chainId === 1029) {
      const con = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      console.log(con);
      return con;
    } else {
      alert("Please connect to the BTTC test network!");
    }
  } else {
    console.log("error");
  }
};
