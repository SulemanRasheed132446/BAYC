import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"

describe("Bored Ape", () => {
    const deployBAYCfixture = async () => {
        const BoredApeFactory = await ethers.getContractFactory("BoredApeYachtClub");
        const boredApeContract = await BoredApeFactory.deploy(
            "Bored Ape Yacht Club",
            "BAYC",
            10000,
            1
        );
        const [owner] = await ethers.getSigners()
        return { boredApeContract, owner }
    }
    it("Should initiliaze the smart contract", async () => {
        const { boredApeContract } = await loadFixture(deployBAYCfixture);
        expect(await boredApeContract.MAX_APES()).to.equal(10000)
    })

    it("Should initiliaze the smart contract", async () => {
        const { boredApeContract, owner } = await loadFixture(deployBAYCfixture);
        expect(await boredApeContract.owner()).to.equal(owner.address)
    })

    it("Should mint an ape", async () => {
        const { boredApeContract, owner } = await loadFixture(deployBAYCfixture);
        await boredApeContract.flipSaleState();
        const apePrice = await boredApeContract.apePrice();
        const tokenId = await boredApeContract.totalSupply();
        expect(
            await boredApeContract.mintApe(1, {
                value: apePrice
            })
        ).to.emit(boredApeContract, "Transfer")
            .withArgs(ethers.constants.AddressZero, owner.address, tokenId);
    })
})