pragma solidity ^0.8.0;

import "../tunnel/FxBaseRootTunnel.sol";

contract FxRootMock is IFxStateSender{

    function sendMessageToChild(address _receiver, bytes calldata _data) external {}

}
