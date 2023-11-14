

import type { Metadata } from 'next'
import { generateMetadataObject } from "@/lib/utils";
import { TopContracts } from '@/components/pages/TopContracts';
 
export const metadata: Metadata = generateMetadataObject("Top Contracts", "The top 500 contracts ranked by how many contracts import them")

export default function TopContractsPage() {
  return <TopContracts />
}


