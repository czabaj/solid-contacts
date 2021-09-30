import cx from "classnames";
import type { Component } from "solid-js";

import classes from "./Touchable.module.css";

export type Props = {
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: (event: MouseEvent) => void;
  ref?: HTMLAnchorElement | HTMLButtonElement;
  title?: string;
  type?: `button` | `reset` | `submit`;
};

export const Touchable: Component<Props> = ({
  className,
  disabled,
  href,
  onClick,
  ref,
  type,
  ...other
}) => {
  const isAnchor = href !== undefined;
  return isAnchor ? (
    <a
      {...other}
      {...(disabled
        ? {
            href: ``,
            "aria-disabled": `true`,
          }
        : {
            href,
            onClick,
          })}
      className={cx(classes.anchorReset, className)}
      ref={ref as HTMLAnchorElement | undefined}
    />
  ) : (
    <button
      {...other}
      className={cx(classes.buttonReset, className)}
      disabled={disabled}
      onClick={onClick}
      ref={ref as HTMLButtonElement | undefined}
      type={type}
    />
  );
};
