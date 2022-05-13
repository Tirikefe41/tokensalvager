import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {networks} from "../context/network"
import React, { useEffect, useState } from "react";
import saveTokenArtifacts from '../utils/SaveTokens.json';

import { GSNUnresolvedConstructorInput, RelayProvider } from '@opengsn/provider'
import { HttpProvider } from 'web3-core'


const Web3 = require("web3");
const contract = require('truffle-contract');


// const Gsn = require('@opengsn/provider');

// const RelayProvider = Gsn.RelayProvider
// let gsnProvider = await new gsn.RelayProvider(window.ethereum, {
//   forwarderAddress: conf.forwarder,
//               paymasterAddress: conf.paymaster,
//               verbose: false}).init()
// provider = new ethers.providers.Web3Provider(gsnProvider)
// userAddr = gsnProvider.origProvider.selectedAddress

//Network Track...
var saveToken = contract(saveTokenArtifacts, saveTokenArtifacts.networks['4'].address)

// contract(saveTokenArtifacts.abi, saveTokenArtifacts.networks['4'].address)

declare let window: any;
declare let ethereum: any;

var network:any

const Home: NextPage = () => {
  const [web3, setWeb3] = useState(new Web3(null));
  const [web3Provider, setWeb3Provider] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [targetAddress, setTargetAddress] = useState(
    "0x2Ed15c331FbB99b87a3B3c8987b3143f51F910c1"
  );
  
  
  const [formData, setFormData] = useState({  
    sendAmt: '',
    sendAddress: ''
  })

  const handleChange = (e:any, name: any) => {
    // const {name, value} = e.target
    setFormData(prevState => ({ ...prevState, [name]: e.target.value }))
  }

  
  

  let App = {
    initWeb3: async function () {
      // Metamsk instance...
      if (window.ethereum.isMetaMask) {
        await setWeb3Provider(window.ethereum);
        try {
          // Request account access
          await window.ethereum.request({ method: "eth_requestAccounts" });

          // if (window.ethereum.web3.eth.net.getId() != 4){
          //   console.log('Switch Wallet Network to Ethereum Mainnet')
          //   await window.ethereum.request({ method: 'wallet_switchEthereumChain', params:[{chainId: '0x4'}]});
            
          // }
        } catch (error) {
          // User denied account access...
          console.error("User denied account access, reason: " +error);
        }
      }
      // setWeb3(await new Web3(web3Provider));
      //ts
      saveToken.deployed = () => saveToken.at(networks.rinkeby.saveToken);
      // saveToken = await  new web3.eth.Contract(saveTokenArtifacts?.abi, saveTokenArtifacts.networks['42'].address)

      // saveToken.deployed = () =>  saveToken.at(networks.rinkeby.saveToken)

      const gsnConfig = {
        relayLookupWindowBlocks: 600000,
        loggerConfigration: {
          logLevel: window.location.href.includes('verbose') ? 'debug' : 'error'
        },
        paymasterAddress: networks.rinkeby.paymaster
      }

      let input = {
        provider: window.ethereum ,
        config: gsnConfig,
        // overrideDependencies: {
        //   asyncApprovalData: mockGetApprovalData
        // }
      }
      setTimeout(async ()=>{
        const p = await RelayProvider.newProvider(input)
        await p.init()
        // var _provider = await RelayProvider.newProvider( input).init()
        // await _provider.init()
        // setWeb3(await new Web3(p));
        await web3.setProvider(p)
        await saveToken.setProvider(p)

      }, 5000)
      
      // 0x95cDA3B2Ca239d2Fac3a3A6257e92E607D4Da041

      console.log("Address: " + ethereum.selectedAddress);
      setUserAddress(ethereum.selectedAddress);
    },
    gsnSend: function () {
      var {BN, toWei} = web3.utils;

      let meta
      saveToken.deployed().then(async function (instance: any) {
      meta = instance
      // await meta.approval(new BN(toWei('10')), {from:userAddress})
      return await meta.sendTether(formData.sendAddress, new BN(toWei(formData.sendAmt)),
        { from: userAddress }).catch(function (e:any) {
          console.log(e)
        })
    });     
    },
  };

  return (
    <div>
      <Head>
        <title>salvageTokens</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        {/* <script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
          crossOrigin="anonymous"
        ></script> */}
      </Head>
      <main>
        <nav
          className="navbar navbar-expand-lg navbar-light bg-transparent rounded"
          aria-label="Eleventh navbar example"
        >
          <div className="container">
            <div>
              <a
                className={`${styles.logo} navbar-brand text-primary `}
                href="#"
              >
                <span>salvage</span>
                <span className="fw-bold">Tokens</span>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarsExample09"
                aria-controls="navbarsExample09"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse " id="navbarsExample09">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className={`${styles.grid} nav-item`}>
                  <a
                    className={`nav-link active ${styles.navCard}`}
                    aria-current="page"
                    href="https://nextjs.org/docs"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </main>
    
      <div className="p-4 p-md-5 mb-4 text-white text-center rounded bg-dark">
        <div className="col-md-6 mx-auto px-0">
          <h1 className="display-4 fw-bold">save what is Left</h1>
          <p className="lead my-3">
            Ridden with the recent ETH scavenger exploit which results in continual depletion of ETH balance on new deposits. 
            We decided to create a quick MVP that allows users salvage remaining tokens using a Gas Station Network Model.
          </p>
          <div className="lead my-3">
          <input
            type='text'
            className="lead my-3"
            placeholder='Enter Send Amount in USDT'
            pattern='^[0-9]*[.,]?[0-9]*$'
            onChange={e => handleChange(e, 'sendAmt')}
          />
          </div>
          <div className="lead my-3">
          <input
            type='text'
            className="lead my-3"
            placeholder='Enter Receiving Address: Crosscheck it !!'
            pattern='^[0-9]*[.,]?[0-9]*$'
            onChange={e => handleChange(e, 'sendAddress')}
          />
          </div>
          
          <p className="lead mb-0">
            <a
              href="#"
              className="btn btn-primary text-white fw-bold me-2"
              onClick={() => App.initWeb3()}
            >
              CONNECT
            </a>
            <a
              href="#"
              className="btn btn-secondary my-2"
              onClick={() => App.gsnSend()}
            >
              SEND USDT
            </a>
          </p>
        </div>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
