import { createSignal } from "solid-js";

import contactsSource from "./assets/data/100-contacts.json";
import { Contact } from "./models";

export type ContactsStorage = ReturnType<typeof getContactsStorage>;

export const contactsWithIdx: Contact[] = contactsSource.map(
  (contact, idx) => ({
    ...contact,
    idx,
  })
);

export const getContactsStorage = () => {
  const [contacts, setContacts] =
    createSignal<Array<Contact | null>>(contactsWithIdx);
  return {
    contacts,
    addContact: (newContact: Omit<Contact, `idx`>) => {
      const oldContacts = contacts();
      const newIdx = oldContacts.length;
      const newContactWithIdx = { ...newContact, idx: newIdx };
      const newContacts = oldContacts.concat(newContactWithIdx);
      setContacts(newContacts);
      return newContactWithIdx;
    },
    deleteContact: (contactIdx: number) =>
      setContacts((contacts) =>
        contacts.map((contact, idx) => (idx !== contactIdx ? contact : null))
      ),
    updateContact: (contactIdx: number, newData: Partial<Contact>) =>
      setContacts((contacts) =>
        contacts.map((contact, idx) =>
          idx !== contactIdx ? contact : { ...(contact as Contact), ...newData }
        )
      ),
  };
};
