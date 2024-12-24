"use client";

import { Transaction } from "../types";
import { formatDate, formatAmount } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeft,
  faUniversity,
  faQuestion,
  faStore,
  faCartShopping,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface TransactionDetailProps {
  transaction: Transaction;
}

const getIcon = (iconName: string): IconDefinition => {
  switch (iconName) {
    case "apple":
      return faApple;
    case "store":
      return faStore;
    case "shopping-cart":
      return faCartShopping;
    case "bank":
      return faUniversity;
    case "target":
      return faBullseye;
    default:
      return faQuestion;
  }
};

const getIconBackground = (type: string, name: string): string => {
  let bg = "";
  switch (type.toLowerCase()) {
    case "payment":
      bg = "bg-gradient-to-tr from-purple-500 to-yellow-500";
      break;
    default:
      bg = "bg-gray-600";
  }

  if (name === "Target") {
    bg = "bg-white";
  } else if (name === "IKEA") {
    bg = "bg-blue-800";
  }

  return bg;
};

const getIconColor = (name: string): string => {
  switch (name.toLowerCase()) {
    case "target":
      return "text-red-600";
    default:
      return "text-white";
  }
};

export default function TransactionDetail({
  transaction,
}: TransactionDetailProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-white px-4 py-3 flex items-center shadow-sm">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 ml-2">
            Transaction Details
          </h1>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-4">
          {/* Transaction Header Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start space-x-4">
              <div
                className={`w-14 h-14 ${getIconBackground(
                  transaction.type,
                  transaction.name
                )} rounded-lg flex items-center justify-center border border-gray-200 ${getIconColor(
                  transaction.name
                )}`}
              >
                <FontAwesomeIcon
                  icon={getIcon(transaction.icon)}
                  size={transaction.name === "Target" ? "2xl" : "xl"}
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {formatAmount(transaction.amount, transaction.type)}
                </h2>
                <p className="text-gray-600 text-lg">{transaction.name}</p>
              </div>
            </div>
          </div>

          {/* Transaction Details Card */}
          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
              <p className="text-gray-900">
                {transaction.pending ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                )}
              </p>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Description
              </h3>
              <p className="text-gray-900">{transaction.description}</p>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Date</h3>
              <p className="text-gray-900">{formatDate(transaction.date)}</p>
            </div>

            {transaction.authorizedUser && (
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Authorized User
                </h3>
                <p className="text-gray-900">{transaction.authorizedUser}</p>
              </div>
            )}

            {transaction.cashback && (
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Cashback
                </h3>
                <p className="text-gray-900">{transaction.cashback}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
