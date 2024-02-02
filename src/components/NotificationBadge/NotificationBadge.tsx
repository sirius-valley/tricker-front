import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import Body1 from "../../utils/typography/body1/body1";

const notificationBadgeVariants = cva(
  [
    "gap-2.5 p-6 rounded-xl w-[358px] h-fit text-center shadow-1",
  ],
  {
    variants: {
      variant: {
        default: ["bg-gray-400 text-white"],
        success: ["bg-success-500 text-black"],
        error: ["bg-error-500 text-white"],
        warning: ["bg-warning-500 text-black"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface NotificationBadgeProps
  extends VariantProps<typeof notificationBadgeVariants>,
    React.HTMLAttributes<HTMLDivElement> {}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  className,
  variant,
  children,
  ...props
}) => {
  return (
    <div
      className={notificationBadgeVariants({ variant, className })}
      {...props}
    >
      <Body1 className={"text-[14px] leading-[15.4px]"}>{children}</Body1>
    </div>
  );
};

export default NotificationBadge;