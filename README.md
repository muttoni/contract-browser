This is a scaffold for an FCL NextJS Dapp on the Flow Blockchain.

## Features Provided

- FCL setup and configuration
- "flow dev" integration for automatic local account creation and contract deployment
- Wallet Discovery (including Dev Wallet on Emulator)
- CLI private key separation for security
- Flow.json loading for contract placeholders
- Authentication
- CDC file loader
- Custom hooks
- Deployment 

## Featues TODO

- Mainnet deployment
- JS Testing

## Running the App

First run:

```
npm install
```

### Local with Flow Dev, the Emulator, and Dev Wallet

Run the following to run Flow Dev, the Emulator, and Dev Wallet:

```bash
npm run dev:local
```

Note: Flow Dev will will automatically create new accounts and deploy for you while developing. Your flow.json will be updated automatically. Committing these changes for local development is unncessary.

### Testnet

If you haven't yet created a testnet account, in the CLI run:

```
flow accounts create
```

Follow the steps and select testnet. This will create a `[name].pkey` file (make sure this is gitignored) and add your account to flow.json.

Then in `flow.json`, add the contracts you'd like to be deployed to testnet under this account:

```
// Inside of "deployments"
"testnet": {
  "testnet-account": [
    "HelloWorld"
  ]
}
```

Then run:

```
npm run dev:testnet:deploy
``` 

Whenever you need to redeploy changed contracts to Testnet while seeing the diff between deployed contracts and updates being pushed, you can run:

```
npm run dev:testnet:update
```