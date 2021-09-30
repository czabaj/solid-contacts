import cx from "classnames";
import type { Component } from "solid-js";

import * as styles from "./Touchable.module.css";

export type Props = {
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: (event: MouseEvent) => void;
  title?: string;
  type?: string;
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
          })}
      className={cx(styles.anchorReset, className)}
      forwardRef={ref}
    />
  ) : (
    <button
      {...other}
      className={cx(styles.buttonReset, className)}
      disabled={disabled}
      forwardRef={ref}
      type={type}
    />
  );
};
