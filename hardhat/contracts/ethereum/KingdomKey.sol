// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol';
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

/// @title Royal Kingdom Key NFT contract
/// @author agonist (https://github.com/agonist)
contract KingdomKey is ERC1155Pausable, Ownable {

    uint256 public constant KINGDOM_KEY = 1;

    bool public presaleActive;
    bool public saleActive;
    uint256 public immutable maxSupply;
    uint256 _totalSupply;
    uint256 public price = 0.05 ether;
    uint256 public presalePrice = 0.03 ether;
    bytes32 public whitelistMerkleRoot = 0x0;

    mapping(address => bool) public claimed;

    constructor(
        string memory baseTokenURI_,
        uint256 maxSupply_
    ) ERC1155(baseTokenURI_) {
        maxSupply = maxSupply_;
    }

    /// @notice main mint function of the contract
    function mint() external payable {
        require(saleActive, "Sale inactive");
        require(_totalSupply + 1 <= maxSupply, "Mint exceed max supply");
        require(!claimed[msg.sender], "Max mint exceeded");
        require(price == msg.value, "Value sent is incorrect");

        _totalSupply += 1;
        claimed[msg.sender] = true;
        _mint(msg.sender, KINGDOM_KEY, 1, "");
    }

    /// @notice presale mint function of the contract
    /// @param _merkleProof Merkle proof coming from the frontend
    function mintPresale(bytes32[] calldata _merkleProof) external payable {
        require(presaleActive, "Presale inactive");
        require(_totalSupply + 1 <= maxSupply, "Mint exceed max supply");
        require(!claimed[msg.sender], "Whitelist mint exceeded");
        require(presalePrice == msg.value, "Value sent is incorrect");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof, whitelistMerkleRoot, leaf), "Not whitelisted");

        _totalSupply += 1;
        claimed[msg.sender] = true;
        _mint(msg.sender, KINGDOM_KEY, 1, "");
    }

    /// @notice toggle the main sale on or off
    function toggleSale() external onlyOwner {
        saleActive = !saleActive;
    }

    /// @notice toggle the presale on or off
    function togglePresale() external onlyOwner {
        presaleActive = !presaleActive;
    }

    /// @notice set the base URI of the NFT
    /// @param _baseTokenURI The new URI
    function setBaseURI(
        string calldata _baseTokenURI
    ) external onlyOwner {
        _setURI(_baseTokenURI);
    }

    function totalSupply() external view returns (uint256){
        return _totalSupply;
    }

    /// @notice set the merkle hash root for whitelist check
    /// @param _merkleRoot The root hash
    function setWhitelistMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        whitelistMerkleRoot = _merkleRoot;
    }

    /// @notice for marketing / team
    /// @param _quantity Amount to mint
    function reserve(uint256 _quantity) external onlyOwner {
        require(_totalSupply + _quantity <= maxSupply, "Mint exceed max supply");
        _mint(msg.sender, KINGDOM_KEY, _quantity, "");
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }


    function withdraw() public onlyOwner {
        address payable to = payable(msg.sender);
        to.transfer(address(this).balance);
    }
}
