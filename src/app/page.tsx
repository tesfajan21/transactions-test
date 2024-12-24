import CardBalance from "../components/CardBalance";
import NoPaymentDue from "../components/NoPaymentDue";
import DailyPoints from "../components/DailyPoints";
import TransactionList from "../components/TransactionList";
import { loadWalletData } from "../utils";

export default function Home() {
  const walletData = loadWalletData();

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-lg mx-auto p-4 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {/* Left Column */}
          <div className="space-y-2">
            <CardBalance
              balance={walletData.cardBalance}
              limit={walletData.cardLimit}
            />
            <DailyPoints points={walletData.dailyPoints} />
          </div>

          {/* Right Column */}
          <div className="h-full">
            <NoPaymentDue message="You've paid your September balance." />
          </div>
        </div>

        <TransactionList transactions={walletData.transactions} />
      </div>
    </main>
  );
}
