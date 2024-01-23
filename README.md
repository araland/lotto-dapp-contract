# Lotto Game Smart Contract

This is the READEME of the Lotto game dApp smart contract.

# Specifications

### Project Overview

There are deposit and withdraw functions for the lotto token.

### Functional, Technical Requirements

Functional and Technical Requirements can be found in the [Requirements.pdf](./docs/Requirements.pdf) document

# Getting Started

Recommended Node version is 16.0.0 and above.

### Available commands

```bash
# install dependencies
$ yarn install

# hardhat clean
$ yarn clean

# hardhat compile
$ yarn compile

# run tests
$ yarn run test

# compute tests coverage
$ yarn run coverage
```

## Tests

Tests are found in the `./test` folder.

## Contracts

Solidity smart contracts are found in `./contracts/`

## Deploy

Deploy script can be found in the `./scripts` folder.

Rename `./.env.example` to `./.env` in the project root.
To add the private key of a deployer account, assign the following variables

```
PRIVATEKEY=...
PROJECTID=...
APIKEYETHERSCAN=...
```

example:

```bash
$ npm run deploy -- bsctestnet
```

## Contract Address

### Testnet Lotto Pool contract

0xeeD34b67100150A3C1e0eAC964356f04003D4d92

### Testnet Lotto Token contract

0xdD08ef4f6b433e578196AA328C8d1F33BD9e28F7
