import cx from "classnames";
import { Accessor, Component, Show, createEffect, createMemo } from "solid-js";
import { Portal } from "solid-js/web";

import { CONTACT_LIST_ID } from "../constants";
import { Contact } from "../models";
import { Button } from "./Button";
import * as mainContentStyles from "./MainContent.module.css";
import * as styles from "./ContactForm.module.css";
import * as touchableStyles from "./Touchable.module.css";

const EditButton: Component<{
  contact: Accessor<Contact>;
}> = ({ contact }) => {
  const listElement = createMemo(
    () =>
      document.querySelector(`#${CONTACT_LIST_ID} [href="#${contact().idx}"]`)
        ?.parentElement
  );
  createEffect(() => {
    listElement()?.scrollIntoView(false);
  });
  let removeButtonRef: HTMLButtonElement;
  return (
    <Portal mount={listElement()}>
      <button
        className={touchableStyles.buttonReset}
        ref={removeButtonRef}
        title={`remove ${contact().first_name} ${
          contact().last_name
        } from the contacts`}
        type="button"
      >
        ⛔️
      </button>
    </Portal>
  );
};

export type Props = {
  contact: Accessor<Contact | null>;
};

export const ContactForm: Component<Props> = ({ contact }) => {
  return (
    <form
      className={cx(mainContentStyles.container, styles.form)}
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
      }}
    >
      <fieldset className={mainContentStyles.main}>
        <legend className="visually-hidden">Add new contact</legend>

        <div className={cx(mainContentStyles.top, styles.name)}>
          <label htmlFor="first_name">first name</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={contact()?.first_name}
          />
          <label htmlFor="last_name">last name</label>
          <input
            id="last_name"
            name="last_name"
            required
            type="text"
            value={contact()?.last_name}
          />
        </div>
        <div className={cx(mainContentStyles.middle, styles.other)}>
          <label htmlFor="phone">phone</label>
          <input id="phone" name="phone" type="tel" value={contact()?.phone} />
          <label htmlFor="email">email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={contact()?.email}
          />
          <label htmlFor="address">address</label>
          <textarea
            id="address"
            name="address"
            rows="3"
            value={contact()?.address}
          />
          <label htmlFor="note">note</label>
          <textarea id="note" name="note" rows="4" value={contact()?.note} />
        </div>
      </fieldset>
      <div className={mainContentStyles.buttons}>
        <Button>Done</Button>
        <Show when={contact()}>
          <EditButton contact={contact} />
        </Show>
        <Button title="clear current form" type="reset">
          ＋
        </Button>
      </div>
    </form>
  );
};
