// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface ILottoPool {
    event Deposit(address from, uint256 amount);
    event Withdraw(address to, uint256 amount);
}
