//// SPDX-License-Identifier: MIT
//
//pragma solidity ^0.8.0;
//
//import '@solidstate/contracts/token/ERC20/ERC20.sol';
//
///// @title CreethGold Token contract
///// @author agonist (https://github.com/agonist)
//contract CreethGold is ERC20 {
//
//    address public minter;
//
//    modifier onlyMinter() {
//        require(msg.sender == minter, 'RTK: Only minter is authorized');
//        _;
//    }
//
//    constructor(address _minter) ERC20('CreethGold', 'CGLD') {
//        minter = _minter;
//    }
//
//    function mint(address _account, uint256 _amount) public onlyMinter {
//        _mint(_account, _amount);
//    }
//
//    function setMinter(address _minter) external onlyMinter {
//        minter = _minter;
//    }
//}
