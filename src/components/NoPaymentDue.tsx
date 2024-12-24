import { NoPaymentDueProps } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function NoPaymentDue({ message }: NoPaymentDueProps) {
  return (
    <div className="bg-white rounded-lg flex flex-col h-full items-start justify-between p-3">
      <div className="flex flex-col items-start">
        <h2 className="text-base font-normal text-gray-800">No Payment Due</h2>
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
      <div className="self-end rounded-full bg-gray-200 px-3 py-2">
        <FontAwesomeIcon icon={faCheck} size="2x" className="text-black" />
      </div>
    </div>
  );
}
