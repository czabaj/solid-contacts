import { Accessor, Component, createMemo } from "solid-js";
import { Switch, Match } from "solid-js/web";

import { EDIT_MODE_SUFFIX } from "../constants";
import type { Contact } from "../models";
import { ContactDetail } from "./ContactDetail";
import { ContactForm } from "./ContactForm";

export type Props = {
  contacts: Accessor<Contact[]>;
  currentHash: Accessor<string>;
};

export const MainContent: Component<Props> = ({ contacts, currentHash }) => {
  const parsedHash = createMemo(() => {
    const hash = currentHash();
    const contactIdx = parseInt(hash.slice(1), 10);
    return isNaN(contactIdx)
      ? null
      : { contactIdx, edit: hash.endsWith(EDIT_MODE_SUFFIX) };
  });
  const contact = createMemo(() => {
    const hashInfo = parsedHash();
    return hashInfo && contacts()[hashInfo!.contactIdx];
  });

  return (
    <Switch>
      <Match when={parsedHash()?.edit}>
        <ContactForm contact={contact} />
      </Match>
      <Match when={parsedHash()}>
        <ContactDetail contact={contact as any} currentHash={currentHash} />
      </Match>
      <Match when={true}>
        <ContactForm contact={contact} />
      </Match>
    </Switch>
  );
};
