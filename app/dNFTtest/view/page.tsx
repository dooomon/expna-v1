"use client"

import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import contractABI from '../../../abi/DynamicNFT.json'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ""
const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)

export default function ViewNFT() {
  const [tokenId, setTokenId] = useState("")
  const [metadata, setMetadata] = useState<any>(null)
  const [error, setError] = useState("")

  const fetchNFT = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, contractABI.abi, provider)
      const tokenURI = await contract.tokenURI(tokenId)
      const response = await fetch(tokenURI)
      const data = await response.json()
      setMetadata(data)
      setError("")
    } catch (err) {
      console.error("Error fetching NFT:", err)
      setError("Failed to fetch NFT")
      setMetadata(null)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">View NFT</h1>
        <input
          type="text"
          placeholder="Enter Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="mt-4 p-2 border rounded"
        />
        <button
          onClick={fetchNFT}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Fetch NFT
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {metadata && (
          <div className="mt-8">
            <h2 className="text-4xl font-bold">{metadata.name}</h2>
            <p className="mt-2">{metadata.description}</p>
            {metadata.image && <img src={metadata.image} alt={metadata.name} className="mt-4" />}
            {metadata.attributes && (
              <div className="mt-4">
                <h3 className="text-2xl font-bold">Attributes</h3>
                <ul>
                  {metadata.attributes.map((attr, index) => (
                    <li key={index}>{attr.trait_type}: {attr.value}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
