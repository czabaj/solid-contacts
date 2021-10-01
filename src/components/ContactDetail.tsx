import cx from "classnames";
import type { Accessor, Component } from "solid-js";

import { EDIT_MODE_SUFFIX } from "../constants";
import type { Contact } from "../models";
import { Button } from "./Button";
import classes from "./ContactDetail.module.css";
import classesContentStyles from "./MainContent.module.css";

export type Props = {
  contact: Accessor<Contact>;
};

export const ContactDetail: Component<Props> = (props) => {
  const { contact } = props;
  return (
    <article className={classesContentStyles.container}>
      <address className={classesContentStyles.main}>
        <h2 className={cx(classesContentStyles.top, classes.header)}>
          {contact().first_name} {contact().last_name}
        </h2>
        <dl className={cx(classesContentStyles.middle, classes.details)}>
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
      <div className={classesContentStyles.buttons}>
        <Button href={`#${contact().idx}${EDIT_MODE_SUFFIX}`}>
          Edit{" "}
          <span className="visually-hidden">
            contact {contact().first_name} {contact().last_name}
          </span>
        </Button>
        <Button
          href="/"
          onClick={(event) => {
            // navigation also works but it reloads the page which destroys all
            // changes made to the data, so rather only assign hash
            event.preventDefault();
            window.location.hash = ``;
          }}
          title="add new contact"
        >
          ＋
        </Button>
      </div>
    </article>
  );
};
