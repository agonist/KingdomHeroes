// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "../lib/ERC20Permit.sol";
import "../Interfaces.sol";

/// @title CreethGold Token contract
/// @author agonist (https://github.com/agonist)
contract CreethGold is ICreethGold, ERC20Permit, Ownable {

    // multiple minters enabled since mint can happens from staking or from game backend to convert in-game CGLD to on-chain
    mapping(address => bool) public minters;

    modifier onlyMinter() {
        require(minters[msg.sender], 'CGLD: Only minter is authorized');
        _;
    }

    constructor() ERC20Permit('CreethGold', 'CGLD', 18) {
    }

    function mint(address _account, uint256 _amount) external override onlyMinter {
        _mint(_account, _amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function setMinter(address _minter, bool isMinter) external onlyOwner {
        minters[_minter] = isMinter;
    }
}
