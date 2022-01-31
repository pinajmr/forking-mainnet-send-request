const hre = require("hardhat");
const { legos } = require("@studydefi/money-legos");
const { ethers } = require("hardhat");
const { networks } = require("../hardhat.config");

//Set Provider
// const network = 'forking'
// const provider = ethers.getDefaultProvider(network);

const DAI_ABI = legos.erc20.dai.abi;
const DAI_ADDRESS = legos.erc20.dai.address;

const daiContract = new ethers.Contract(DAI_ADDRESS, DAI_ABI)

tx = {
  to: "0x4317c44fD3143D8AC5723865CF046238A2cd8FD3",
  value: ethers.utils.parseEther("1.0")
}

async function main() {
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503"],
  });


  const signer = await ethers.getSigner("0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503")
  signer.sendTransaction(tx)

  balance = await ethers.provider.getBalance(tx.to);
  balance = ethers.utils.formatEther(balance);
  console.log(`Ether balance is :${balance}`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
