import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectReasonProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export function SelectReason({
  value,
  onValueChange,
}: SelectReasonProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a report reason" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Reason</SelectLabel>
          <SelectItem value="spam">Spam</SelectItem>
          <SelectItem value="negative">Negative</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
