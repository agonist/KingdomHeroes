// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Royal Kingdom token stats.
/// @notice This is where all on chain stats of an NFT are stored
/// @author agonist (https://github.com/agonist)
contract TokensStats is Ownable {

    struct Stats {
        uint64 attack;
        uint64 defense;
        uint64 speed;
        uint64 level;
        uint64 hp;
    }

    bool public initialStatsFrozen;

    mapping(uint256 => Stats) public tokenStats;


    // @notice Used to setup tokens initial stats
    // Once done the boolean initialStatsFrozen will be set to true
    // to ensure we can't alter the stats anymore
    // @param _stats array of stats
    // @param _ids corresponding tokens ids for _stats
    function initStats(Stats[] calldata _stats, uint256[] calldata _ids) external onlyOwner {
        require(!initialStatsFrozen, "init already done");

        for (uint16 i = 0; i < _stats.length; i++) {

            tokenStats[_ids[i]] = _stats[i];

        }
    }

    // @notice freeze the initial stats. This can't be undone.
    function frozeInitialStats() external onlyOwner {
        initialStatsFrozen = true;
    }

}
