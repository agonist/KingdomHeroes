// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./ERC721ACustom.sol";
import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';

/// @title Kingdom Heroes NFT contract
/// @author agonist (https://github.com/agonist)
contract KingdomHeroes is ERC721ACustom, Ownable {
    // TODO ADD WITHDRAW !!!

    uint256 public immutable maxSupply;
    uint256 public maxMintAtOnce;
    uint256 public maxMintWhitelist;
    uint256 public price = 0.05 ether;
    uint256 public presalePrice = 0.03 ether;
    bool public presaleActive;
    bool public saleActive;
    string public baseTokenURI;
    bytes32 public whitelistMerkleRoot = 0x0;

    mapping(address => uint256) public claimed;
    mapping(address => bool) public keyFreeClaimed;

    IERC1155 keysContract;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseTokenURI_,
        uint256 maxSupply_,
        uint256 maxMintAtOnce_,
        uint256 maxMintWhitelist_,
        address keysContract_
    ) ERC721ACustom(name_, symbol_){
        baseTokenURI = baseTokenURI_;
        maxSupply = maxSupply_;
        maxMintAtOnce = maxMintAtOnce_;
        maxMintWhitelist = maxMintWhitelist_;
        keysContract = IERC1155(keysContract_);
    }

    /// @notice main mint function of the contract
    /// @param _quantity Quantity to mint
    function mint(
        uint256 _quantity
    ) external payable {
        require(saleActive, "Sale inactive");
        require(totalSupply() + _quantity <= maxSupply, "Mint exceed max supply");
        require(_quantity <= maxMintAtOnce, "Max mint exceeded");
        require(price * _quantity == msg.value, "Value sent is incorrect");

        _safeMint(msg.sender, _quantity);
    }

    /// @notice presale mint function of the contract
    /// @param _quantity Quantity to mint
    /// @param _merkleProof Merkle proof coming from the frontend
    function mintPresale(uint256 _quantity, bytes32[] calldata _merkleProof) external payable {
        require(presaleActive, "Presale inactive");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof, whitelistMerkleRoot, leaf), "Not whitelisted");
        require(claimed[msg.sender] + _quantity <= maxMintWhitelist, "Whitelist mint exceeded");
        require(presalePrice * _quantity == msg.value, "Value sent is incorrect");

        uint256 keyBalance = keysContract.balanceOf(msg.sender, 1);
        uint256 keyExtra = 0;
        if (keyBalance > 0) {
            if (!keyFreeClaimed[msg.sender]) {
                keyExtra += keyBalance;
                keyFreeClaimed[msg.sender] = true;
            }
        }

        claimed[msg.sender] += _quantity;
        _safeMint(msg.sender, _quantity + keyExtra);
    }

    /// @notice toggle the main sale on or off
    function toggleSale() external onlyOwner {
        saleActive = !saleActive;
    }

    /// @notice toggle the presale on or off
    function togglePresale() external onlyOwner {
        presaleActive = !presaleActive;
    }

    /// @notice for marketing / team
    /// @param _quantity Amount to mint
    function reserve(uint256 _quantity) external onlyOwner {
        require(totalSupply() + _quantity <= maxSupply, "Mint exceed max supply");
        _safeMint(msg.sender, _quantity);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    /// @notice set the base URI of the NFT
    /// @param _baseTokenURI The new URI
    function setBaseURI(
        string calldata _baseTokenURI
    ) external onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    /// @notice set the merkle hash root for whitelist check
    /// @param _merkleRoot The root hash
    function setWhitelistMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        whitelistMerkleRoot = _merkleRoot;
    }

    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }
    // TODO ADD WITHDRAW !!!

}
