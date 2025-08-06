import {
  imgFinance,
  imgOther,
  imgPersonal,
  imgPhysical,
  imgSocial,
} from "../../assets/goals";

export const categories = [
  { name: "Social", color: "purple" },
  { name: "Physical health", color: "orange" },
  { name: "Finances", color: "green" },
  { name: "Job satisfaction", color: "blue" },
  { name: "Personal", color: "gray" },
];

export const getCategoryImage = (categoryName) => {
  const images = {
    Social: imgSocial,
    "Physical health": imgPhysical,
    Finances: imgFinance,
    "Job satisfaction": imgOther,
    Personal: imgPersonal,
  };
  return images[categoryName] || images["Personal"];
};

export const getCategoryStyles = (categoryName, isSelected = false) => {
  const styles = {
    Social: {
      selected: "bg-purple-500 text-white",
      unselected: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      display: "bg-purple-100 text-purple-800",
    },
    "Physical health": {
      selected: "bg-orange-500 text-white",
      unselected: "bg-orange-100 text-orange-800 hover:bg-orange-200",
      display: "bg-orange-100 text-orange-800",
    },
    Finances: {
      selected: "bg-green-500 text-white",
      unselected: "bg-green-100 text-green-800 hover:bg-green-200",
      display: "bg-green-100 text-green-800",
    },
    "Job satisfaction": {
      selected: "bg-blue-500 text-white",
      unselected: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      display: "bg-blue-100 text-blue-800",
    },
    Personal: {
      selected: "bg-gray-500 text-white",
      unselected: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      display: "bg-gray-100 text-gray-800",
    },
  };

  return isSelected
    ? styles[categoryName]?.selected
    : styles[categoryName]?.unselected;
};

export const getCategoryDisplayStyles = (categoryName) => {
  const styles = {
    Social: "bg-purple-100 text-purple-800",
    "Physical health": "bg-orange-100 text-orange-800",
    Finances: "bg-green-100 text-green-800",
    "Job satisfaction": "bg-blue-100 text-blue-800",
    Personal: "bg-gray-100 text-gray-800",
  };

  return styles[categoryName] || "bg-gray-100 text-gray-800";
};

export const getCategoryIcon = (categoryName) => {
  const icons = {
    Social: "👥",
    "Physical health": "💪",
    Finances: "💰",
    "Job satisfaction": "💼",
    Personal: "🌟",
  };
  return icons[categoryName] || "🌟";
};
