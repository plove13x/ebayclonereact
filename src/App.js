import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
// import detectEthereumProvider from '@metamask/detect-provider';
import { Button, Container, FormLabel, FormControl, FormGroup, ListGroup, ListGroupItem, Modal, Nav, Navbar } from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar';


class App extends Component {
  web3;
  eBayClone;

  constructor(props) {
    super(props);
    // console.log(props); console.log(this.props);

    // How to use/expose this.web3 while using the more suitable commented block below since it contains
    // AWAIT (thus async) below?
    this.web3 = new Web3(window.ethereum);
    const getThisShitRollin = async (test) => {
      await window.ethereum.enable();
    }
    getThisShitRollin();
    console.log(window.ethereum.request({ method: 'eth_requestAccounts' }));
    console.log(window.ethereum._metamask.isUnlocked());
    console.log(this.web3.eth.accounts);
    console.log(this.web3.eth.personal.listWallets);
    // const detectProvider = async () => {
    //   // This function detects most providers injected at window.ethereum
    //   import detectEthereumProvider from '@metamask/detect-provider';

    //   const provider = await detectEthereumProvider();

    //   if (provider) {
    //     // From now on, this should always be true:
    //     // provider === window.ethereum
    //     startApp(provider); // initialize your app
    //   } else {
    //     console.log('Please install MetaMask!');
    //   }
    // }
    
    // detectProvider();

    window.ethereum.on('accountsChanged', (accounts) => {
      this.refreshContractDetails();
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
    });

    console.log(this.web3.eth.getAccounts());
    console.log(this.web3.eth.getBalance('0x2b94B3cFCD117A10047660dad60C7322998CD12B'));
    // 0x56cAa3b8D868ABB22273E0c783D0CD81E6d5bAe3
    console.log(this.web3.eth.accounts.wallet);

    const address = '0xb788dF1b05C1f7EDbBb4712fb318b6c08EE6DA2E';
    const abi = [
      {
        inputs: [{"name":"_id","type":"uint256"}],
        name: 'buyProduct',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
        constant: undefined,
        payable: true,
        signature: '0x8642269e'
      },
      {
        inputs: [],
        name: 'getNumberOfProducts',
        outputs: [{"name":"","type":"uint256"}],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        payable: undefined,
        signature: '0x3ffd81fb'
      },
      // {
      //   inputs: [],
      //   name: 'owner',
      //   // Don't see this in Greg code because you added "Address Payable Public Owner" in solidity contract. 
      //   // Will probably at least need address field.
      //   outputs: [ [Object] ],
      //   stateMutability: 'view',
      //   type: 'function',
      //   constant: true,
      //   payable: undefined,
      //   signature: '0x8da5cb5b'
      // },
      {
        inputs: [{"name":"","type":"uint256"}],
        name: 'products',
        outputs: [{"name":"id","type":"uint256"},{"name":"seller","type":"address"},{"name":"buyer","type":"address"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"price","type":"uint256"}],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        payable: undefined,
        signature: '0x7acc0b20'
      },
      {
        // inputs: [ [Object], [Object], [Object] ],
        inputs: [{"name":"_name","type":"string"},{"name":"_description","type":"string"},{"name":"_price","type":"uint256"}],
        name: 'sellProduct',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
        constant: undefined,
        payable: undefined,
        signature: '0x7d33f01e'
      }
    ];
    this.eBayClone = new this.web3.eth.Contract(abi, address);
    // console.log(this.eBayClone);

    // there is a claim that es6 introduced arrow functions which will avoid the deprecation warning this is triggering
    this.handleClose = this.handleClose.bind(this);
    this.handleProductDescChange = this.handleProductDescChange.bind(this);
    this.handleProductNameChange = this.handleProductNameChange.bind(this);
    this.handleProductPriceChange = this.handleProductPriceChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  state = {
    balance: '',
    message: '',
    productDescription: '',
    productName: '',
    productPrice: '',
    products: [],
    show: false,
    user: ''
  }

  componentDidMount(){
    // console.log(this.web3);
    this.refreshContractDetails();
  }

  handleBuy = (_productId, _productPrice, _productSeller) => async(event)=> {
    event.preventDefault();
    if(_productSeller == this.state.user) {
      this.setState({message: "You cannot buy your own product."});
      return;
    }

    this.setState({message: "waiting on buy transaction..."});
    await this.eBayClone.methods.buyProduct(_productId).send({
      from: this.state.user,
      value: this.web3.utils.toWei(_productPrice,'ether'),
      gas: 500000
    });

    this.setState({message: "Buy transaction entered"});
    await this.refreshContractDetails();
  }

  handleClose(){
    this.setState({
      show: false
    });
  }

  handleProductDescChange(e){
    this.setState({
      productDescription: e.target.value
    });
  }

  handleProductNameChange(e){
    this.setState({
      productName: e.target.value
    });
  }

  handleProductPriceChange(e){
    this.setState({
      productPrice: e.target.value
    });
  }

  handleSell = async (event) => {
    event.preventDefault();
    this.setState({message: "waiting on sell transaction success..."});
    this.handleClose();
    await this.eBayClone.methods.sellProduct(this.state.productName, this.state.productDescription,
      this.web3.utils.toWei(this.state.productPrice, 'ether'))
      .send({
        from: this.state.user,
        gas: 500000
      });

      await this.refreshContractDetails();
      this.setState({message: "Sell transaction entered"});
  }

  handleShow(){
    this.setState({
      productDescription: '',
      productName: '',
      productPrice: '',
      show: true
    });
  }

  async refreshContractDetails(){
    await window.ethereum.enable();
    // const accounts = await this.web3.eth.getAccounts();
    // const accounts = await this.web3.eth.request({ method: 'eth_accounts' });
    const accounts = await this.web3.eth.requestAccounts();

    // shouldn't something like this be getting called more globally? Yes have it doing so now. Can probably remove.
    window.ethereum.on('accountsChanged', (accounts) => {
      console.log('a');
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
    });

    console.log(accounts);
    const user = accounts[0];

    // this seems to not work until user has typed in popup MM password; 
    // prolly needs if statement which is commented out at the top of the file
    const balance = this.web3.utils.fromWei(await this.web3.eth.getBalance(user),'ether');

    const productsCount = await this.eBayClone.methods.getNumberOfProducts().call();
    const products = await Promise.all(
      Array(parseInt(productsCount))
      .fill()
      .map((element,index) => {
        return this.eBayClone.methods.products(index).call();
      })
    );

    this.setState({
      user: user,
      balance: balance,
      products: products
    });
  }

  renderProducts(){
    return this.state.products.map((product, index) => {
      var price = this.web3.utils.fromWei(product.price,'ether');
      return(
        <ListGroup>
          {/*header not working*/}
          <ListGroupItem header="heading 1"><h4 className="list-group-item-heading">{product.name}</h4>Description: {product.description}</ListGroupItem>
          <ListGroupItem>Price (ETH): {price}</ListGroupItem>
          <ListGroupItem>Sold by {product.seller}</ListGroupItem>
          <ListGroupItem>Bought by {product.buyer}</ListGroupItem>
          <ListGroupItem>
            {/*bsStyle="primary" not working and not necessary so removed*/}
            <Button onClick={this.handleBuy(product.id,price,product.seller)}>
              Buy
            </Button>
          </ListGroupItem>
        </ListGroup>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
        <Container>
          <Navbar expand="lg">
            <Navbar.Brand>
              <a href="#home">eBay Clone</a>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav>
                <Navbar.Text>
                  Signed in as: <Nav.Link href="#">{this.state.user}</Nav.Link>
                </Navbar.Text>
                <Navbar.Text>Balance: {this.state.balance}</Navbar.Text>
                {/*pullRight not working*/}
                <Navbar.Text>
                  <Button onClick={this.handleShow}>Sell an article</Button>
                </Navbar.Text>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sell a Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup
                controlId="formBasicText"
              >
                <FormLabel>Product name</FormLabel>
                <FormControl 
                  type="text"
                  value={this.state.productName}
                  placeholder="Enter the name of your product"
                  onChange={this.handleProductNameChange}
                />
                <FormLabel>Price in ETH</FormLabel>
                <FormControl
                  type="number"
                  value={this.state.productPrice}
                  placeholder="1"
                  onChange={this.handleProductPriceChange}
                />
                <FormLabel>Description</FormLabel>
                <FormControl
                  type="text"
                  value={this.state.productDescription}
                  placeholder="Describe your article"
                  onChange={this.handleProductDescChange}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button onClick={this.handleSell}>Sell</Button>
          </Modal.Footer>
        </Modal>
        {this.renderProducts()}
      </div>
    );
  }
}

export default App;
