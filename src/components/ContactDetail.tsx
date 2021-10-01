import cx from "classnames";
import { Accessor, Component, Show } from "solid-js";

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
          <Show when={contact().phone}>
            <dd>
              <a href={`tel:${contact().phone}`}>{contact().phone}</a>
            </dd>
          </Show>
          <dt>email</dt>
          <Show when={contact().email}>
            <dd>
              <a href={`mailto:${contact().email}`}>{contact().email}</a>
            </dd>
          </Show>
          <dt>address</dt>
          <Show when={contact().address}>
            <dd>{contact().address}</dd>
          </Show>
          <dt>note</dt>
          <Show when={contact().note}>
            <dd>{contact().note}</dd>
          </Show>
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
