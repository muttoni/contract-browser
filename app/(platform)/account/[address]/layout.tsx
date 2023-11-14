import AccountPageLayout from "@/components/pages/AccountPageLayout"

import type { Metadata, ResolvingMetadata} from 'next'
import { generateMetadataObject } from "@/lib/utils"

type Props = {
  params: { address: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const address = params.address as string

  return generateMetadataObject("Account " + address, "Viewing the account of " + address + " on the Flow blockchain")
}

export default function AccountLayout({ children }) {
  return <AccountPageLayout>{children}</AccountPageLayout>
}