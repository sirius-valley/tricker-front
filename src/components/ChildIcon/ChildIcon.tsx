import React from "react";
import Icon from "../Icon/Icon";

export interface ChildIconProps {
  iconName: "BugIcon" | "FeatureIcon" | "ImprovementIcon" | "NoPriorityIcon" | "LowPriorityIcon" | "MediumPriorityIcon" | "HighPriorityIcon" | "UrgentIcon";
}

const ChildIcon: React.FC<ChildIconProps> = ({
  iconName,
  ...props
}) => {


  return (
    <div className="border rounded-sm flex w-[20px] h-[20px] justify-center items-center" {...props}>
      <Icon width=" " height="" name={iconName} />
    </div>
  );
};

export default ChildIcon;