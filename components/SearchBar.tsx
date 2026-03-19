interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search tools..."
      className="w-full bg-[#1c1f26] border border-[#2a2e37] rounded-lg px-4 py-2 text-sm text-[#e4e6eb] placeholder-[#8b8e94] focus:outline-none focus:ring-2 focus:ring-[#6c5ce7] focus:border-transparent"
    />
  );
}
