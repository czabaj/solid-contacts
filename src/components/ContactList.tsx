import { Accessor, Component, For, createMemo } from "solid-js";

import { Contact } from "../models";
import classes from "./ContactList.module.css";

export type Props = {
  contacts: Accessor<Array<Contact | null>>;
  currentHash: Accessor<string>;
  id?: string;
};

const collator = new Intl.Collator("en");
const compareContacts = (a: Contact, b: Contact) =>
  // compare by last_last name, where equal, compare by first_namek
  collator.compare(a.last_name, b.last_name) ||
  collator.compare(a.first_name || ``, b.first_name || ``);

export const ContactList: Component<Props> = ({
  contacts,
  currentHash,
  id,
}) => {
  const sortedContacts = createMemo(() => {
    const contactsByInitial: Record<string, Contact[]> = {};
    for (const contact of contacts()) {
      if (contact) {
        const initial = contact.last_name.charAt(0).toUpperCase();
        const records =
          contactsByInitial[initial] || (contactsByInitial[initial] = []);
        records.push(contact);
      }
    }
    return Object.keys(contactsByInitial)
      .sort()
      .map((initial) => ({
        initial,
        records: contactsByInitial[initial].sort(compareContacts),
      }));
  });

  return (
    <ol aria-label="list of contacts" className={classes.listInitials} id={id}>
      <For each={sortedContacts()}>
        {({ initial, records }) => (
          <li data-initial={initial}>
            <ol
              aria-label={`contacts whose last name starts with a ${initial}`}
              className={classes.listContacts}
            >
              <For each={records}>
                {(contact) => {
                  const contactHash = `#${contact.idx}`;
                  return (
                    <li>
                      <a
                        href={contactHash}
                        aria-current={
                          currentHash() === contactHash ? `page` : undefined
                        }
                      >{`${contact.first_name} ${contact.last_name}`}</a>
                    </li>
                  );
                }}
              </For>
            </ol>
          </li>
        )}
      </For>
    </ol>
  );
};
