const hre = require("hardhat");
const { legos } = require("@studydefi/money-legos");
const { ethers } = require("ethers");

//Set Provider
const provider = ethers.getDefaultProvider();

const DAI_ABI = legos.erc20.dai.abi;
const DAI_ADDRESS = legos.erc20.dai.address;

const daiContract = new ethers.Contract(DAI_ADDRESS, DAI_ABI, provider)


const daiHolder = '0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503';

tx = {
  gasLimit: 6000000,
  gasPrice: 78860410240,
  to: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  value: ethers.utils.parseEther("1.0")
}


async function main() {

  //Get Ether holder balance for use gas
  balance = await provider.getBalance(daiHolder);
  balance = ethers.utils.formatEther(balance);
  console.log(`Dai Holder - Ether balance ${balance} ETH`)

  //Get Dai holder balance
  balance = await daiContract.balanceOf(daiHolder);
  balance = ethers.utils.formatEther(balance);
  console.log(`Dai Holder - Dai balance ${balance} DAI`)

  //get recipient
  const accounts = await hre.ethers.getSigners();
  const recipient = accounts[0];

  //Get recipient balance
  balance = await daiContract.balanceOf(recipient.address);
  balance = ethers.utils.formatEther(balance);
  console.log(`Recipient - Dai balance ${balance} DAI`)

  //Send Dai
  console.log("Sending....");
  console.log(".....");

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [daiHolder],
  });

  const signer = await hre.ethers.getSigner(daiHolder)
  const daiWithSigner = daiContract.connect(signer);
  const amount = ethers.utils.parseUnits("10.0", 18);
  tx = await daiWithSigner.transfer(recipient.address, amount)

  console.log("Ready!.");
  console.log("---------------------------");

  //Get Dai holder balance 
  balance = await daiContract.balanceOf(daiHolder);
  balance = ethers.utils.formatEther(balance);
  console.log(`Dai Holder - Ether balance ${balance} DAI`)

  //Get recipient balance
  balance = await daiContract.balanceOf(recipient.address);
  balance = ethers.utils.formatEther(balance);
  console.log(`Recipient - Dai balance ${balance} DAI`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
