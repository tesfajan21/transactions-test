import { CardBalanceProps } from "../types";

export default function CardBalance({ balance, limit }: CardBalanceProps) {
  const available = limit - balance;

  return (
    <div className="bg-white rounded-lg py-2 px-3">
      <h2 className="text-lg font-semibold text-gray-800">Card Balance</h2>
      <div className="text-2xl font-bold text-gray-800">
        ${balance.toFixed(2)}
      </div>
      <div className="text-gray-400">${available.toFixed(2)} Available</div>
    </div>
  );
}
