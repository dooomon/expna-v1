"use client"

import React, { useState } from 'react'
import { ethers } from 'ethers'
import contractABI from '../../abi/DynamicNFT.json'
import Link from 'next/link'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ""
const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)

//const signer = provider.getSigner()
//const contract = new ethers.Contract(contractAddress, contractABI.abi, signer)

export default function DNFTtestPage() {
  const [tokenURI, setTokenURI] = useState("")
  const [tokenId, setTokenId] = useState(null)

  const createNFT = async () => {
    try {
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI.abi, signer)
      const tx = await contract.createNFT(tokenURI)
      const receipt = await tx.wait()

      // トランザクションのレシートを詳細にログ出力
      console.log("Transaction receipt:", receipt)
      
      if (receipt.events) {
        receipt.events.forEach((event, index) => {
          console.log(`Event ${index}:`, event)
        })
      }

      // イベントからトークンIDを取得
      let tokenId;
      if (receipt.events) {
        for (const event of receipt.events) {
          if (event.event === "Transfer" && event.args && event.args.tokenId) {
            tokenId = event.args.tokenId.toNumber()
            break;
          }
        }
      }

      if (tokenId !== undefined) {
        setTokenId(tokenId)
        alert(`NFT created successfully! Token ID: ${tokenId}`)
      } else {
        throw new Error("Token ID not found in receipt events")
      }

    } catch (err) {
      console.error("Error creating NFT:",err)
      alert("Failed to create NFT")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Create a Dynamic NFT
        </h1>
        <input
          type="text"
          placeholder="Enter Token URI"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
          className="mt-4 p-2 border rounded"
        />
        <button
          onClick={createNFT}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Create NFT
        </button>
        {tokenId !== null && (
          <div className="mt-4">
            <p>Token ID: {tokenId}</p>
          </div>
        )}
        <Link href="/dNFTtest/view" legacyBehavior>
          <a className="mt-4 text-blue-500">View NFTs</a>
        </Link>
      </main>
    </div>
  )
}
