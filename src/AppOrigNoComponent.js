import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

function App() {

// const detectProvider = async () => {
//   web3;
//   eBayClone;
//   const provider = await detectEthereumProvider();

//   if (provider) {
//     // From now on, this should always be true:
//     // provider === window.ethereum
//     // startApp(provider); // initialize your app
//     const web3 = new Web3(provider);
//     // await window.ethereum.enable();
//   } else {
//     console.log('Please install MetaMask!');
//   }

//   constructor(props, context) {
//     super(props, context);
//     this.web3 = new Web3(provider);
  
//     const address = '0x14b6348eb6e3588b9480a5827B9e9A7334E34e99';
//     const abi = [
//       {
//         inputs: [ [Object] ],
//         name: 'buyProduct',
//         outputs: [],
//         stateMutability: 'payable',
//         type: 'function',
//         constant: undefined,
//         payable: true,
//         signature: '0x8642269e'
//       },
//       {
//         inputs: [],
//         name: 'getNumberOfProducts',
//         outputs: [ [Object] ],
//         stateMutability: 'view',
//         type: 'function',
//         constant: true,
//         payable: undefined,
//         signature: '0x3ffd81fb'
//       },
//       {
//         inputs: [],
//         name: 'owner',
//         outputs: [ [Object] ],
//         stateMutability: 'view',
//         type: 'function',
//         constant: true,
//         payable: undefined,
//         signature: '0x8da5cb5b'
//       },
//       {
//         inputs: [ [Object] ],
//         name: 'products',
//         outputs: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
//         stateMutability: 'view',
//         type: 'function',
//         constant: true,
//         payable: undefined,
//         signature: '0x7acc0b20'
//       },
//       {
//         inputs: [ [Object], [Object], [Object] ],
//         name: 'sellProduct',
//         outputs: [],
//         stateMutability: 'nonpayable',
//         type: 'function',
//         constant: undefined,
//         payable: undefined,
//         signature: '0x7d33f01e'
//       }
//     ];
//     this.eBayClone = new this.web3.eth.Contract(abi, address);
//   }

// }

// detectProvider();



  return (
    <div style={{backgroundColor: 'red'}}>
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello moto
        </p>
        <p>
          Learn America
        </p>
      </header>
    </div>
  );
}

export default App;
