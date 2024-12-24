export interface Transaction {
  id: number;
  type: "Credit" | "Payment";
  amount: number;
  name: string;
  description: string;
  date: string;
  pending?: boolean;
  authorizedUser?: string;
  icon: string;
  cashback?: string;
}

export interface WalletData {
  cardLimit: number;
  cardBalance: number;
  dailyPoints: number;
  transactions: Transaction[];
}

export interface CardBalanceProps {
  balance: number;
  limit: number;
}

export interface NoPaymentDueProps {
  message: string;
}

export interface DailyPointsProps {
  points: number;
}

export interface TransactionListProps {
  transactions: Transaction[];
}

export interface TransactionItemProps {
  transaction: Transaction;
  onClick: (transaction: Transaction) => void;
}
