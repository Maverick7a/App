import { ethers } from "hardhat";

async function main() {
  
  const Age = await ethers.getContractFactory("Age");
  const age = await Age.deploy();

  await age.deployed();

  console.log(`NFT Sanych deployed to ${age.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
