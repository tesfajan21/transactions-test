import { Transaction, WalletData } from "../types";
import rawData from "../data/transactions.json";

interface RawTransaction {
  id: number;
  type: string;
  amount: number;
  name: string;
  description: string;
  date: string;
  pending?: boolean;
  authorizedUser?: string;
  icon: string;
  cashback?: string;
}

interface RawWalletData {
  cardLimit: number;
  cardBalance: number;
  dailyPoints: number;
  transactions: RawTransaction[];
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) {
    if (diffDays === 1) {
      return "Yesterday";
    }
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  // For older dates, show MM/DD/YY
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  });
};

export const formatPoints = (points: number): string => {
  if (points >= 1000) {
    return `${Math.round(points / 1000)}K`;
  }
  return points.toString();
};

export const calculateDailyPoints = (): number => {
  const today = new Date();
  const seasonStarts = {
    spring: new Date(today.getFullYear(), 2, 1),
    summer: new Date(today.getFullYear(), 5, 1),
    fall: new Date(today.getFullYear(), 8, 1),
    winter: new Date(today.getFullYear(), 11, 1),
  };

  let seasonStart: Date;
  if (today >= seasonStarts.winter) seasonStart = seasonStarts.winter;
  else if (today >= seasonStarts.fall) seasonStart = seasonStarts.fall;
  else if (today >= seasonStarts.summer) seasonStart = seasonStarts.summer;
  else seasonStart = seasonStarts.spring;

  const dayOfSeason =
    Math.floor(
      (today.getTime() - seasonStart.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  if (dayOfSeason === 1) return 2;
  if (dayOfSeason === 2) return 3;

  const twoDaysAgo =
    dayOfSeason === 3 ? 2 : calculatePointsForDay(dayOfSeason - 2);
  const yesterday =
    dayOfSeason === 3 ? 3 : calculatePointsForDay(dayOfSeason - 1);

  return Math.round(twoDaysAgo + yesterday * 0.6);
};

const calculatePointsForDay = (day: number): number => {
  if (day === 1) return 2;
  if (day === 2) return 3;
  return Math.round(
    calculatePointsForDay(day - 2) + calculatePointsForDay(day - 1) * 0.6
  );
};

export const formatAmount = (
  amount: number,
  type: "Credit" | "Payment"
): string => {
  const formattedAmount = amount.toFixed(2);
  return type === "Payment" ? `+$${formattedAmount}` : `$${formattedAmount}`;
};

export const loadWalletData = (): WalletData => {
  const data = rawData as RawWalletData;

  // Validate and transform transactions
  const transactions: Transaction[] = data.transactions.map(
    (t: RawTransaction) => ({
      ...t,
      type: t.type as "Credit" | "Payment",
    })
  );

  return {
    cardLimit: data.cardLimit,
    cardBalance: data.cardBalance,
    dailyPoints: data.dailyPoints,
    transactions,
  };
};
