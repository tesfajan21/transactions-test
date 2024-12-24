import { notFound } from "next/navigation";
import TransactionDetail from "../../../components/TransactionDetail";
import { loadWalletData } from "../../../utils";

interface TransactionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TransactionPage({
  params,
}: TransactionPageProps) {
  const walletData = loadWalletData();
  const { id } = await params;
  const transaction = walletData.transactions.find(
    (t) => t.id === parseInt(id)
  );

  if (!transaction) {
    notFound();
  }

  return <TransactionDetail transaction={transaction} />;
}
