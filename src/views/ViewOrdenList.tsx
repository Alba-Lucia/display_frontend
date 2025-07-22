import { useState } from "react";
import { ClipboardCopy } from "lucide-react";

const categories = [
  "Kitchen",
  "Soft drinks",
  "Bar",
  "Display",
  "Food display",
  "Other",
];

const initialSelected = ["Kitchen", "Bar", "Display", "Food display", "Other"];

const productsByCategory: Record<string, string[]> = {
  "Food display": ["Croissant (5)", "Muffins (3)"],
  Kitchen: ["Aranchina", "Quiche"],
};

export const ViewOrdenList = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialSelected);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleCopy = () => {
    const message = selectedCategories
      .map((cat) => {
        const items = productsByCategory[cat];
        if (!items) return "";
        return `${cat}:\n- ${items.join("\n- ")}`;
      })
      .filter(Boolean)
      .join("\n\n");

    navigator.clipboard.writeText(message);
    alert("Order message copied!");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white min-h-screen flex flex-col justify-between">
      <div>
        

        {/* Categories */}
        <div>
          <h2 className="text-sm font-medium mb-2">Categories</h2>
          <div className="space-y-1">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <hr className="my-4" />

        {/* List */}
        <div>
          <h2 className="text-sm font-medium mb-2">List</h2>
          <div className="space-y-3 text-sm">
            {selectedCategories.map((cat) => {
              const items = productsByCategory[cat];
              if (!items) return null;
              return (
                <div key={cat}>
                  <span className="font-semibold">{cat}:</span>
                  <ul className="ml-4 list-disc marker:text-gray-400">
                    {items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Copy button */}
      <div className="mt-6">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
        >
          <ClipboardCopy className="w-4 h-4" />
          Copy order message
        </button>
      </div>
    </div>
  );
};
