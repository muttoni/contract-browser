import { createExplorerTransactionLink } from '../links'

describe('links helpers: createExplorerTransactionLink', () => {
  it('should create explorer transaction link', () => {
    const transactionId = '123'
    const network = 'testnet'

    expect(createExplorerTransactionLink({ network, transactionId })).toEqual('https://testnet.flowscan.org/transaction/123')
  })
})