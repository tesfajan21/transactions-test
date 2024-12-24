"use client";

import { TransactionItemProps } from "../types";
import { formatDate, formatAmount } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import {
  faUniversity,
  faQuestion,
  faStore,
  faCartShopping,
  faBullseye,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

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

export default function TransactionItem({
  transaction,
  onClick,
}: TransactionItemProps) {
  const {
    type,
    amount,
    name,
    description,
    date,
    pending,
    authorizedUser,
    icon,
    cashback,
  } = transaction;

  return (
    <div
      className="px-4 py-3 flex items-start cursor-pointer hover:bg-gray-50 border-b border-gray-100"
      onClick={() => onClick(transaction)}
    >
      <div
        className={`flex-shrink-0 w-12 h-12 ${getIconBackground(
          type,
          name
        )} rounded-lg flex items-center justify-center border border-gray-200 ${getIconColor(
          name
        )} mr-3`}
      >
        <FontAwesomeIcon
          icon={getIcon(icon)}
          size={transaction.name === "Target" ? "2xl" : "lg"}
        />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <div className="min-w-0 flex-shrink">
            <h3 className="font-medium text-gray-900 truncate">{name}</h3>
            <div className="text-sm text-gray-400 truncate">
              {pending && <span>Pending - </span>}
              {description}
            </div>
            <div className="text-sm text-gray-400">
              {authorizedUser && <span>{authorizedUser} - </span>}
              {formatDate(date)}
            </div>
          </div>
          <div className="text-right ml-2 flex flex-col items-end flex-shrink-0">
            <div className="font-medium text-gray-900">
              {formatAmount(amount, type)}
            </div>
            {cashback && (
              <div className="text-sm text-gray-400">{cashback}</div>
            )}
          </div>
        </div>
      </div>
      <div className="ml-4 flex-shrink-0">
        <FontAwesomeIcon icon={faAngleRight} className="text-gray-400" />
      </div>
    </div>
  );
}
