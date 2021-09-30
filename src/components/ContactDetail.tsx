import cx from "classnames";
import type { Accessor, Component } from "solid-js";

import { EDIT_MODE_SUFFIX } from "../constants";
import type { Contact } from "../models";
import { Button } from "./Button";
import * as styles from "./ContactDetail.module.css";
import * as mainContentStyles from "./MainContent.module.css";

export type Props = {
  contact: Accessor<Contact>;
  currentHash: Accessor<string>;
};

export const ContactDetail: Component<Props> = ({ currentHash, contact }) => {
  return (
    <article className={mainContentStyles.container}>
      <address className={mainContentStyles.main}>
        <h2 className={cx(mainContentStyles.top, styles.header)}>
          {contact().first_name} {contact().last_name}
        </h2>
        <dl className={cx(mainContentStyles.middle, styles.details)}>
          <dt>phone</dt>
          <dd>
            <a href={`tel:${contact().phone}`}>{contact().phone}</a>
          </dd>
          <dt>email</dt>
          <dd>
            <a href={`mailto:${contact().email}`}>{contact().email}</a>
          </dd>
          <dt>address</dt>
          <dd>{contact().address}</dd>
          <dt>note</dt>
          <dd>{contact().note}</dd>
        </dl>
      </address>
      <div className={mainContentStyles.buttons}>
        <Button href={`${currentHash()}${EDIT_MODE_SUFFIX}`}>
          Edit{" "}
          <span className="visually-hidden">
            contact {contact().first_name} {contact().last_name}
          </span>
        </Button>
        <Button href="/" title="add new contact">
          ＋
        </Button>
      </div>
    </article>
  );
};
