"use client";

import { TransactionListProps, Transaction } from "../types";
import TransactionItem from "./TransactionItem";
import { useRouter } from "next/navigation";

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  const router = useRouter();

  const handleTransactionClick = (transaction: Transaction) => {
    router.push(`/transaction/${transaction.id}`);
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold text-gray-900 mb-2">
        Latest Transactions
      </h2>
      <div className="bg-white rounded-lg overflow-hidden">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onClick={handleTransactionClick}
          />
        ))}
      </div>
    </div>
  );
}
