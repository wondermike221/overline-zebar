import { cn } from "../../utils/cn";

export enum LabelType {
  DEFAULT = "default",
  WARNING = "warning",
  DANGER = "danger",
}

// Threshold is an array that represents the range of values that will trigger a colour change.
// [0, 50]
// [50, 70]
// [70, 100]
// { default: [0, 50], warning: [50, 70], danger: [70, 100] }
export type Thresholds = { min: number; max: number; label: LabelType }[];

const defaultThreshold = [
  { min: 0, max: 50, label: LabelType.DEFAULT },
  { min: 85, max: 95, label: LabelType.WARNING },
  { min: 95, max: 100, label: LabelType.DANGER },
];

interface StatProps {
  Icon: React.ReactNode;
  stat: string;
  threshold?: Thresholds;
}

export function Stat({ Icon, stat, threshold = defaultThreshold }: StatProps) {
  function getNumbersFromString(str: string) {
    const numbers = str.match(/-?\d+/g)?.map(Number);
    return numbers && numbers.length > 0 ? numbers[0] : NaN;
  }

  function getThresholdLabel(value: number) {
    const range = threshold.find((r) => value >= r.min && value <= r.max);
    return range ? range.label : LabelType.DEFAULT;
  }

  const statAsInt = getNumbersFromString(stat);

  const thresholdLabel = getThresholdLabel(statAsInt);

  return (
    <div
      className={cn(
        "flex items-center gap-1 h-full",
        thresholdLabel === LabelType.DEFAULT && "text-text",
        thresholdLabel === LabelType.WARNING && "text-warning",
        thresholdLabel === LabelType.DANGER && "text-danger"
      )}
    >
      {Icon}
      <p>{stat}</p>
    </div>
  );
}
