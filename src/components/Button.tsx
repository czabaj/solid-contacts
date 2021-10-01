import cx from "classnames";
import type { Component } from "solid-js";

import classes from "./Button.module.css";
import { Props as TouchableProps, Touchable } from "./Touchable";

export type Props = TouchableProps;

export const Button: Component<Props> = (props) => {
  return <Touchable {...props} className={cx(classes.base, props.className)} />;
};
