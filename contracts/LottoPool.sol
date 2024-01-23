// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/ICustomERC20.sol";
import "./interfaces/ILottoPool.sol";

contract LottoPool is ILottoPool, Ownable, ReentrancyGuard {
    using SafeERC20 for ICustomERC20;

    ICustomERC20 token;

    constructor(address tokenAddr) {
        token = ICustomERC20(tokenAddr);
    }

    /**
     * @dev Deposit token
     */
    function deposit(uint256 amount) external returns (address, uint256) {
        require(amount >= 30 * 1e18, "deposit amount not enough");

        SafeERC20.safeTransferFrom(token, msg.sender, address(this), amount);

        emit Deposit(msg.sender, amount);
        return (msg.sender, amount);
    }

    /**
     * @dev Withdraw token
     */
    function withdraw(
        uint256 amount
    ) external nonReentrant returns (address, uint256) {
        require(
            token.balanceOf(address(this)) >= amount,
            "pool don't have enough token"
        );
        require(amount > 0, "withdraw amount should not be zero");
        require(
            amount <= 100 * 1e18,
            "withdraw amount should be smaller than 100"
        );

        SafeERC20.safeTransfer(token, msg.sender, amount);

        emit Withdraw(msg.sender, amount);
        return (msg.sender, amount);
    }

    function updateLottoToken(
        address newTokenAddr
    ) external onlyOwner returns (address) {
        require(
            newTokenAddr != address(0x0),
            "Lotto token address should not be null"
        );
        token = ICustomERC20(newTokenAddr);

        return newTokenAddr;
    }
}
