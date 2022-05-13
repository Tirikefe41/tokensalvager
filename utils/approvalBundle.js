const { providers, Wallet, Contract, utils } = require('ethers');
const ERC20 = require('./ERC20.json');

const CHAIN_ID = 4;
const tokenAddress = "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02";
const paymasterAddr = "0xC7672577cB5c4156530558E0ccF12852BbA634F4"
const provider = new providers.InfuraProvider(CHAIN_ID);

const walletPx = "0x4e9b2d84a3c5560bc5bc65b96a34ed05bd78b674990e330c087f0ed3ef653e8b";
const gasPx = "0x0c656eb6533b8085ae367462deec14071159f6aa93862413dde5ac5b1c4486a3";
const wallet = new Wallet(walletPx, provider);
const gaswallet = new Wallet(gasPx, provider);

async function setApproval(){
  var tokenContract = new Contract(tokenAddress, ERC20.abi, wallet);

  // let iface = new ethers.utils.Interface(ERC20.abi); 
  // 83364034487802
  // 6109443900000

  // let _data = tokenContract.methods.approve.encode(paymasterAddr,ethers.utils.parseEther("1000000.0"));
  const unSignedTx = await tokenContract.populateTransaction.approve(paymasterAddr,utils.parseEther("1000000.0"));

  let gas = tokenContract.estimateGas.approve(paymasterAddr,utils.parseEther("1000000.0"));

  // console.log(`ABI data encoded as: ${_data}`);

  let gasTx = {
    to: wallet.address,
    value: gas*2
  }
  await gaswallet.sendTransaction(gasTx).then(async () => {
    await wallet.sendTransaction(unSignedTx);
    console.log('Approved !!')
  })
}


setApproval()