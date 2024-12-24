import { notFound } from "next/navigation";
import TransactionDetail from "../../../components/TransactionDetail";
import { loadWalletData } from "../../../utils";

interface TransactionPageProps {
  params: {
    id: string;
  };
}

export default async function TransactionPage({
  params,
}: TransactionPageProps) {
  const walletData = loadWalletData();
  const transaction = walletData.transactions.find(
    (t) => t.id === parseInt(params.id)
  );

  if (!transaction) {
    notFound();
  }

  return <TransactionDetail transaction={transaction} />;
}
