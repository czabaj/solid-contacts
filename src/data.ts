import { createMemo, createSignal } from "solid-js";

import contactsSource from "./assets/data/100-contacts.json";
import { Contact } from "./models";

export const contactsWithIdx: Contact[] = contactsSource.map(
  (contact, idx) => ({
    ...contact,
    idx,
  })
);

export const getContacts = () => {
  const [contacts, setContacts] = createSignal(contactsWithIdx);
  return {
    contacts,
  };
};
