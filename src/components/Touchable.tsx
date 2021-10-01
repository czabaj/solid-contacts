import cx from "classnames";
import { Component, splitProps } from "solid-js";

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

export const Touchable: Component<Props> = (props) => {
  const [local, others] = splitProps(props, [
    `disabled`,
    `href`,
    `onClick`,
    `type`,
  ]);
  const isAnchor = typeof local.href === `string`;
  return isAnchor ? (
    <a
      {...others}
      {...(local.disabled
        ? {
            href: ``,
            "aria-disabled": `true`,
          }
        : {
            href: local.href,
            onClick: local.onClick,
          })}
      className={cx(classes.anchorReset, props.className)}
      ref={props.ref as HTMLAnchorElement | undefined}
    />
  ) : (
    <button
      {...others}
      className={cx(classes.buttonReset, props.className)}
      disabled={local.disabled}
      onClick={local.onClick}
      ref={props.ref as HTMLButtonElement | undefined}
      type={local.type}
    />
  );
};
