// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Royal Kingdom token stats.
/// @notice This is where all on chain stats of the NFTs are stored
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
    address gameMaster;

    modifier onlyGM() {
        require(gameMaster == msg.sender, "RoyalKingdomPoly: caller is not the gameMaster");
        _;
    }

    function levelUp(uint256 _id, uint256 _levelAmount) external onlyGM {
        Stats memory current = tokenStats[_id];

        uint64 finalAttack = current.attack;
        for (uint16 i = 0; i < _levelAmount; i++) {
            uint256 attackBump = current.attack / 10;


        }


        uint256 attackBump = current.attack / 10;
        uint256 defenseBump = current.defense / 10;
        uint256 speedBump = current.speed / 10;


    }


    /// ----- Admin functions ----- ///


    // @notice Used to setup tokens initial stats
    // Once done the boolean initialStatsFrozen will be set to true
    // to ensure we can't alter the stats anymore
    // @param _stats array of stats
    // @param _ids corresponding tokens ids for _stats
    function initStats(Stats[] calldata _stats, uint256[] calldata _ids) external onlyOwner {
        require(!initialStatsFrozen, "init frozen");

        for (uint16 i = 0; i < _stats.length; i++) {
            tokenStats[_ids[i]] = _stats[i];
        }
    }

    // @notice freeze the initial stats. This can't be undone.
    function frozeInitialStats() external onlyOwner {
        initialStatsFrozen = true;
    }



    /// ----- Useful view functions ----- ///


    // @notice returns an array of stats for particular ids
    // @param _ids array of ids to return stats for
    function getStatsFor(uint256[] calldata _ids) public view returns (Stats[] memory) {
        Stats[] memory stats = new Stats[](_ids.length);

        for (uint16 i = 0; i < _ids.length; i++) {
            stats[i] = tokenStats[_ids[i]];
        }

        return stats;
    }

}
