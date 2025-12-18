import { Cross } from "lucide-react";

export function SearchHeader({
  query,
  resultCount,
}: {
  query: string;
  resultCount: number;
}) {
  return (
    <div className="relative w-full h-[250px] md:h-[300px] flex flex-col items-center justify-center text-center overflow-hidden bg-black">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 z-0 bg-[url('/bg-pattern.jpg')] bg-cover bg-center opacity-70"
        style={{
          // Fallback or specific pattern if not available, using a gradient for now if image missing
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url('/hero1.png')",
        }}
      />

      {/* Search Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-4 text-[#4A3728]">
        <h1 className="text-4xl md:text-5xl font-serif text-[#4A3728] drop-shadow-sm font-medium">
          Search Results for: <span className="font-bold">“{query}”</span>
        </h1>
        <p className="text-[#6B5A4D] font-medium text-lg uppercase tracking-widest flex items-center gap-2">
          Showing {resultCount} results
        </p>

        {/* Decorative Cross (faint/background element in mockup but here inline) */}
        <div className="hidden md:block absolute right-[-200px] bottom-[-100px] opacity-20 pointer-events-none">
          {/* Could use an SVG or Icon, using a placeholder check */}
          <Cross className="w-64 h-64 text-[#4A3728]" />
        </div>
      </div>
    </div>
  );
}
