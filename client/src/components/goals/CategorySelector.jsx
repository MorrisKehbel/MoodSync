import { categories, getCategoryStyles, getCategoryIcon } from "./goalUtils";

export const CategorySelector = ({
  selectedCategory,
  onCategorySelect,
  title = "Choose Category",
  compact = false,
}) => {
  if (compact) {
    return (
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {categories.map((category) => (
            <button
              key={category.name}
              id={`category-${category.name}`}
              type="button"
              onClick={() => onCategorySelect(category.name)}
              className={`p-2 text-xs font-medium rounded-lg border transition-all duration-200 cursor-pointer ${getCategoryStyles(
                category.name,
                selectedCategory === category.name
              )} ${
                selectedCategory === category.name
                  ? "ring-1 ring-blue-400"
                  : "hover:shadow-sm"
              }`}
            >
              <div className="text-center">
                <div className="text-sm mb-0.5">
                  {getCategoryIcon(category.name)}
                </div>
                <div className="text-xs leading-tight truncate">
                  {category.name}
                </div>
              </div>
            </button>
          ))}
        </div>
        {selectedCategory && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
            <p className="text-xs text-green-700 font-medium flex items-center">
              <svg
                className="w-3 h-3 mr-1 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Selected: {selectedCategory}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => onCategorySelect(category.name)}
            className={`p-3 sm:p-4 text-xs sm:text-sm font-medium rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${getCategoryStyles(
              category.name,
              selectedCategory === category.name
            )} ${
              selectedCategory === category.name
                ? "ring-2 ring-offset-2 ring-blue-400 scale-105"
                : "hover:shadow-md"
            }`}
          >
            <div className="text-center">
              <div className="text-base sm:text-lg mb-1">
                {getCategoryIcon(category.name)}
              </div>
              <div className="text-xs leading-tight">{category.name}</div>
            </div>
          </button>
        ))}
      </div>
      {selectedCategory && (
        <div className="mt-3 sm:mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700 font-medium flex items-center">
            <svg
              className="w-4 h-4 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Selected: {selectedCategory}
          </p>
        </div>
      )}
    </div>
  );
};
