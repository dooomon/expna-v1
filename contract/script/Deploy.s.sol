// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/DynamicNFT.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();
        new DynamicNFT();
        vm.stopBroadcast();
    }
}
