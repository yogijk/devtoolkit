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
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
          active === null
            ? "bg-emerald-500 text-white"
            : "bg-[#1c1f26] text-[#8b8e94] hover:border-white/[0.12] border border-white/[0.06]"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
            active === cat
              ? "bg-emerald-500 text-white"
              : "bg-[#1c1f26] text-[#8b8e94] hover:border-white/[0.12] border border-white/[0.06]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
