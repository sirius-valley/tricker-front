import "../../index.css";
import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import config from "../../../tailwind.config.js";
import HomeIcon from "../../utils/icons/HomeIcon.js";
import TeamIcon from "../../utils/icons/TeamIcon.js";
import FolderIcon from "../../utils/icons/FolderIcon.js";
import { ProfileButton } from "../ProfileButton/ProfileButton.js";
import ChartDonutIcon from "../../utils/icons/ChartDonutIcon.js";

const colors = config.theme.extend.colors;

const navButtonVariants = cva(
  ["flex p-3 gap-2.5 rounded-lg w-14 h-14 items-center justify-center"],
  {
    variants: {
      state: {
        on: ["bg-white/10"],
        off: ["bg-transparent"],
      },
    },
    defaultVariants: {
      state: "off",
    },
  }
);
const iconVariant = (
  variant: string,
  profilePicture?: string
): React.ReactElement => {
  switch (variant) {
    case "profile":
      return <ProfileButton img={profilePicture ?? ""} className="w-8 h-8" />;
    case "projects":
      return <FolderIcon width="32px" height="32px" />;
    case "home":
      return <HomeIcon width="32px" height="32px" />;
    case "team":
      return <TeamIcon width="32px" height="32px" />;
    case "stats":
      return <ChartDonutIcon width="32px" height="32px" />;
    default:
      return <></>;
  }
};

export interface NavButtonProps
  extends VariantProps<typeof navButtonVariants>,
    React.HTMLAttributes<HTMLButtonElement> {
  variant: string;
  /*Temporarily, we will pass the profile picture as a string; in the future, 
  it will be retrieved from the same component.*/
  profilePicture?: string;
}

export const NavButton: React.FC<NavButtonProps> = ({
  className,
  variant,
  profilePicture,
  state,
  ...props
}) => {
  return (
    <button className={navButtonVariants({ state, className })} {...props}>
      {iconVariant(variant, profilePicture)}
    </button>
  );
};

export default NavButton;
