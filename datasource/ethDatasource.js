// Import RESTDataSource from apollo-datasource-rest to enable REST API calls
const { RESTDataSource } = require("apollo-datasource-rest");

//Define a constant with Vitalik's Ethereum Address
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

//Extend RESTDataSource to create a custom data source for Etherscan APIs
class EtherDataSource extends RESTDataSource {
  // set the base url
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api";
  }

  //Define a function to get the balance of a defined Ethereum Address
  async etherBalanceByAddress() {
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  //Define a function to get the total supply of Ether
  async totalSupplyOfEther() {
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // get latest ethereum price
  async getLatestEthereumPrice() {
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // get estimated block confirmation time
  async getBlockConfirmationTime() {
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

//Export the EtherDataSource class
module.exports = EtherDataSource;
