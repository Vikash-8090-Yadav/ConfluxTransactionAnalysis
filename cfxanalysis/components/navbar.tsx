"use client"

import React, { useState, useEffect } from "react"
import Link from 'next/link'
import { ethers } from 'ethers'
import { Web3 } from 'web3'

interface Ethereum {
  isMetaMask?: boolean;
  request?: (args: { method: string; params?: Array<any> }) => Promise<any>;
}

interface ExtendedWindow extends Window {
  ethereum?: Ethereum;
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link href={to} legacyBehavior>
      <a className="text-white hover:text-yellow-300 px-4 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out">
        {children}
      </a>
    </Link>
  )
}

const networks = {
  CFXTestnet: {
    chainId: `0x${Number(71).toString(16)}`,
    chainName: "CFXTestnet",
    nativeCurrency: {
      name: "CFXTestnet",
      symbol: "CFX",
      decimals: 18,
    },
    rpcUrls: ["https://evmtestnet.confluxrpc.com"],
    blockExplorerUrls: ['https://www.confluxscan.io/'],
  },
}

export default function Navbar() {
  const [accountAddress, setAccountAddress] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [balance, setBalance] = useState('0')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const storedAddress = localStorage.getItem("filWalletAddress")
    if (storedAddress) {
      setAccountAddress(storedAddress)
      fetchBalance(storedAddress)
    }
  }, [])

  const fetchBalance = async (address: string) => {
    if (typeof (window as ExtendedWindow).ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum as any)
      const balance = await provider.getBalance(address)
      setBalance(ethers.utils.formatEther(balance))
    }
  }

  const handleLogin = async () => {
    if ((window as ExtendedWindow).ethereum) {
      const web3 = new Web3((window as ExtendedWindow).ethereum as any)

      const chainId = await web3.eth.getChainId()
      const CfxTestnetChainId = parseInt(networks.CFXTestnet.chainId, 16)

      console.log(parseInt(chainId.toString()))
      console.log("The neo testnet chain id is", parseInt(chainId.toString()))

      const chainId1 = parseInt(chainId.toString())
      
      if (chainId1 !== CfxTestnetChainId) {
        const ethereum = (window as ExtendedWindow).ethereum;
      
        if (ethereum && typeof ethereum.request === "function") {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                ...networks["CFXTestnet"]
              }]
            });
          } catch (error) {
            alert("Failed to add Ethereum chain:");
          }
        } else {
          alert("Ethereum provider not detected. Please install MetaMask or a compatible wallet.");
        }
      }


      const accounts = await web3.eth.requestAccounts()

      console.log(accounts)
      const Address = accounts[0]
      if (typeof window !== 'undefined') {
        localStorage.setItem("filWalletAddress", Address)
      }

      console.log(Address)
      setAccountAddress(Address)
      fetchBalance(Address)

      window.location.reload()
    } else {
      alert("Please install the metamask")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("filWalletAddress")
    setAccountAddress('')
    setIsDropdownOpen(false)
    setBalance('0')
  }

  function truncateAddress(address: string) {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getEtherscanLink = (address: string) => {
    return `https://evmtestnet.confluxscan.io/address/${address}`
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-900 via-blue-800 to-indigo-900 shadow-lg">
      <div className="max-w-full mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center space-x-8">
            <Link href="/" legacyBehavior>
              <a className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
                  CFXanalyst
                </h1>
              </a>
            </Link>
            
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            
          </div>
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-md text-white hover:text-yellow-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-2 pb-3 space-y-2">
            <NavLink to="/Market">HOME</NavLink>
            <NavLink to="/sellnft">Create Event</NavLink>
            <NavLink to="/dashboard">DASHBOARD</NavLink>
           
          </div>
          <div className="pt-4 pb-4 border-t border-gray-700">
            <div className="flex items-center px-5">
              {accountAddress ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white text-lg">{truncateAddress(accountAddress)}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium py-2 px-6 rounded-full transition duration-150 ease-in-out"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white text-lg font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}