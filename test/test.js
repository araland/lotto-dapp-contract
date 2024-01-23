const { expect } = require("chai");
const { utils } = require("ethers");
const { ethers } = require("hardhat");

let owner;
let user;
let anotherUser;
let lottoTokenIns;
let lottoPoolIns;

describe("\n\n1. Smart Contract Deploy", function () {
  beforeEach(async () => {
    [owner, user, anotherUser] = await ethers.getSigners();
  });
  it("🟢 Lotto Token Deploy", async function () {
    const LottoToken = await ethers.getContractFactory("LottoToken");
    lottoTokenIns = await LottoToken.deploy();
    await lottoTokenIns.deployed();
    console.log("Lotto Token contract address: ", lottoTokenIns.address);

    const transferAmount = 1000;
    await expect(() =>
      lottoTokenIns.transfer(user.address, transferAmount)
    ).to.changeTokenBalances(
      lottoTokenIns,
      [owner, user],
      [-transferAmount, transferAmount]
    );
    await expect(() =>
      lottoTokenIns.connect(user).transfer(anotherUser.address, transferAmount)
    ).to.changeTokenBalances(
      lottoTokenIns,
      [user, anotherUser],
      [-transferAmount, transferAmount]
    );
    await expect(() =>
      lottoTokenIns.connect(anotherUser).transfer(owner.address, transferAmount)
    ).to.changeTokenBalances(
      lottoTokenIns,
      [anotherUser, owner],
      [-transferAmount, transferAmount]
    );
  });
  it("🟢 Lotto Pool Contract Deploy", async function () {
    const LottoPool = await ethers.getContractFactory("LottoPool");
    lottoPoolIns = await LottoPool.deploy(lottoTokenIns.address);
    await lottoPoolIns.deployed();
    console.log("Lotto Pool contract address: ", lottoPoolIns.address);
  });
});

describe("\n\n2. Lotto Pool Contract Testing", function () {
  describe("\n🚀 deposit function test", function () {
    it("🟢 Should deposit token", async () => {
      await lottoTokenIns.approve(lottoPoolIns.address, utils.parseEther("30"));
      await lottoPoolIns.deposit(utils.parseEther("30"));
      expect(await lottoTokenIns.balanceOf(lottoPoolIns.address)).to.be.equal(
        utils.parseEther("30")
      );
    });
    it("🔴 Should not deposit", async () => {
      await lottoTokenIns.approve(lottoPoolIns.address, utils.parseEther("20"));
      expect(lottoPoolIns.deposit(utils.parseEther("20"))).to.be.revertedWith(
        "deposit amount not enough"
      );
    });
  });
  describe("\n🚀 withdraw function test", function () {
    it("🟢 Should withdraw token", async () => {
      await lottoPoolIns.withdraw(utils.parseEther("10"));
      expect(await lottoTokenIns.balanceOf(lottoPoolIns.address)).to.be.equal(
        utils.parseEther("20")
      );
    });
    it("🔴 Should not withdraw", async () => {
      expect(lottoPoolIns.withdraw(utils.parseEther("30"))).to.be.revertedWith(
        "pool don't have enough token"
      );
    });
  });
});
