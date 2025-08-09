export const HoverTooltip = ({
  text,
  tooltip,
  position = "top",
  className = "",
}) => {
  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
  };

  return (
    <div className="relative group inline-block select-none w-full">
      <p className={`w-full ${className}`}>{text}</p>

      <div
        className={`absolute left-1/2 -translate-x-1/2 ${positionClasses[position]} 
                    px-3 py-1 rounded-md bg-gray-800 text-white text-sm 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                    pointer-events-none whitespace-nowrap z-50 flex flex-col`}
      >
        {tooltip.map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </div>
    </div>
  );
};
