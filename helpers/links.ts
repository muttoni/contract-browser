import { BLOCK_EXPLORER_URLS } from "../constants";

export const createExplorerTransactionLink = ({ network, transactionId }) => `${BLOCK_EXPLORER_URLS[network]}/transaction/${transactionId}`