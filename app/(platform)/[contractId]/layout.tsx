import ContractPageLayout from "@/components/pages/ContractPageLayout";

import type { Metadata, ResolvingMetadata} from 'next'
import { generateMetadataObject, getContractAddress, getContractName, getNetworkFromAddress } from "@/lib/utils"

type Props = {
  params: { contractId: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const contractId = params.contractId as string
  const contractName = getContractName(contractId)
  const contractAddress = getContractAddress(contractId)
  const network = getNetworkFromAddress(contractAddress)

  return generateMetadataObject(contractName + " deployed by " + contractAddress + " on " + network, contractName + " is a contract deployed on the Flow blockchain")
}

export default function ContractLayout({ children }) {
  return <ContractPageLayout>{children}</ContractPageLayout>
}