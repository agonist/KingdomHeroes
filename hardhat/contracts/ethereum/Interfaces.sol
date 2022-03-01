// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

interface ICreethGold is IERC20 {

    function mint(address _account, uint256 _amount) external;

}