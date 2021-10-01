import cx from "classnames";
import { Accessor, Component, createEffect, createMemo } from "solid-js";
import { Portal } from "solid-js/web";

import { CONTACT_LIST_ID } from "../constants";
import type { ContactsStorage } from "../contactStorage";
import { Contact } from "../models";
import { Button } from "./Button";
import classesMainContent from "./MainContent.module.css";
import classes from "./ContactForm.module.css";
import { Touchable } from "./Touchable";

const RemoveButton: Component<{
  contact: Accessor<Contact>;
  onClick: () => void;
}> = ({ contact, onClick }) => {
  const listElement = createMemo(
    () =>
      document.querySelector(`#${CONTACT_LIST_ID} [aria-current="page"]`)
        ?.parentElement
  );
  createEffect(() => {
    listElement()?.scrollIntoView(false);
  });
  return (
    <Portal mount={listElement()!}>
      <Touchable
        onClick={onClick}
        title={`remove ${contact().first_name} ${
          contact().last_name
        } from the contacts`}
        type="button"
      >
        ⛔️
      </Touchable>
    </Portal>
  );
};

export type Props = {
  contact: Accessor<Contact | null>;
  contactStorage: ContactsStorage;
};

export const ContactForm: Component<Props> = (props) => {
  const { contact } = props;
  return (
    <form
      className={cx(classesMainContent.container, classes.form)}
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        if (form.reportValidity()) {
          const formData = new FormData(form);
          const newData = Object.fromEntries(formData.entries()) as Pick<
            Contact,
            `first_name` | `last_name` | `phone` | `address` | `note`
          >;
          const currentContact = contact();
          if (currentContact) {
            props.contactStorage.updateContact(currentContact.idx, newData);
            window.location.hash = `#${currentContact.idx}`;
          } else {
            const newContact = props.contactStorage.addContact!(newData);
            window.location.hash = `#${newContact.idx}`;
          }
        }
      }}
    >
      <fieldset className={classesMainContent.main}>
        <legend className="visually-hidden">Add new contact</legend>

        <div className={cx(classesMainContent.top, classes.name)}>
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
        <div className={cx(classesMainContent.middle, classes.other)}>
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
      <div className={classesMainContent.buttons}>
        <Button>Done</Button>
        {contact() ? (
          <>
            <RemoveButton
              contact={contact as any}
              onClick={() => {
                props.contactStorage.deleteContact(contact()!.idx);
                window.location.hash = `#0`;
              }}
            />
            <Button href="/" title="add new contact">
              ＋
            </Button>
          </>
        ) : (
          <Button title="clear current form" type="reset">
            ＋
          </Button>
        )}
      </div>
    </form>
  );
};
