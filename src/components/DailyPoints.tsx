import { DailyPointsProps } from "../types";
import { formatPoints } from "../utils";

export default function DailyPoints({ points }: DailyPointsProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800">Daily Points</h2>
      <div className="text-xl font-medium text-gray-400">
        {formatPoints(points)}
      </div>
    </div>
  );
}
