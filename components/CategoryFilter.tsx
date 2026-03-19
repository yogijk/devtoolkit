interface CategoryFilterProps {
  categories: string[];
  active: string | null;
  onSelect: (cat: string | null) => void;
}

export default function CategoryFilter({
  categories,
  active,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          active === null
            ? "bg-[#6c5ce7] text-white"
            : "bg-[#1c1f26] text-[#8b8e94] hover:brightness-125"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === cat
              ? "bg-[#6c5ce7] text-white"
              : "bg-[#1c1f26] text-[#8b8e94] hover:brightness-125"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
