module.exports = {
    networks: {
      mainnet: {
        // addressUrl: 'https://etherscan.io/address/',
        // txUrl: 'https://etherscan.io/tx/',
        // saveToken: '0x6f73F80a4F4944f646184dc56799D7B87059E016',
        relayHub: '0x9e59Ea5333cD4f402dAc320a04fafA023fe3810D',
        // paymaster: '0xFACb65Ea83795c54Fb92Bb3B646B757A9eB9ECA2',
        forwarder: '0xAa3E82b4c4093b4bA13Cb5714382C99ADBf750cA'
      },
      rinkeby: {
        addressUrl: 'https://dashboard.tenderly.co/contract/rinkeby/',
        txUrl: 'https://dashboard.tenderly.co/tx/rinkeby/',
        // addressUrl: 'https://rinkeby.etherscan.io/address/',
        // txUrl: 'https://rinkeby.etherscan.io/tx/',
        saveToken: '0x0D224419710b329CC81F0d7D0CA9FD59e7EB49af',
        paymaster: '0xC7672577cB5c4156530558E0ccF12852BbA634F4',
        relayHub: '0x6650d69225CA31049DB7Bd210aE4671c0B1ca132',        
        forwarder: '0x83A54884bE4657706785D7309cf46B58FE5f6e8a'
      },
      kovan: {
        addressUrl: 'https://dashboard.tenderly.co/contract/kovan/',
        txUrl: 'https://dashboard.tenderly.co/tx/kovan/',
        // addressUrl: 'https://rinkeby.etherscan.io/address/',
        // txUrl: 'https://rinkeby.etherscan.io/tx/',
        saveToken: '0xE41bd9A73359eb6bcff558D3E3F19642c386FD79',
        relayHub: '0x727862794bdaa3b8Bc4E3705950D4e9397E3bAfd',
        paymaster: '0x3de9874b9207999d768ea334f132122Aa61e1688',
        forwarder: '0x7eEae829DF28F9Ce522274D5771A6Be91d00E5ED'
      }
    }
  }
  