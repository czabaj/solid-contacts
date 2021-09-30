import cx from "classnames";
import type { Component } from "solid-js";

import * as styles from './Button.module.css'
import { Props as TouchableProps, Touchable } from "./Touchable";

export type Props = TouchableProps;

export const Button: Component<Props> = ({ className, ...other }) => {
  return <Touchable className={cx(styles.base, className)} {...other} />;
};
