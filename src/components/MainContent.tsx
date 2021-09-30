import { Accessor, Component, createMemo } from "solid-js";
import { Switch, Match } from "solid-js/web";

import { EDIT_MODE_SUFFIX } from "../constants";
import type { ContactsStorage } from "../contactStorage";
import { ContactDetail } from "./ContactDetail";
import { ContactForm } from "./ContactForm";

export type Props = {
  contactStorage: ContactsStorage;
  currentHash: Accessor<string>;
};

export const MainContent: Component<Props> = ({
  contactStorage,
  currentHash,
}) => {
  const parsedHash = createMemo(() => {
    const hash = currentHash();
    const contactIdx = parseInt(hash.slice(1), 10);
    return isNaN(contactIdx)
      ? null
      : { contactIdx, edit: hash.endsWith(EDIT_MODE_SUFFIX) };
  });
  const contact = createMemo(() => {
    const hashInfo = parsedHash();
    return hashInfo && contactStorage.contacts()[hashInfo!.contactIdx];
  });

  return (
    <Switch>
      <Match when={parsedHash()?.edit}>
        <ContactForm contact={contact} contactStorage={contactStorage} />
      </Match>
      <Match when={parsedHash()}>
        <ContactDetail contact={contact as any} />
      </Match>
      <Match when={true}>
        <ContactForm contact={contact} contactStorage={contactStorage} />
      </Match>
    </Switch>
  );
};
