import { Component, createSignal, onCleanup } from "solid-js";

import { ContactList } from "./components/ContactList";
import { MainContent } from "./components/MainContent";
import * as styles from "./App.module.css";
import { getContacts } from "./data";
import { CONTACT_LIST_ID } from "./constants";

const getLocationHash = () => {
  const [location, setLocation] = createSignal<string>(
    window.location.hash || ``
  );
  const locationHandler = () => setLocation(window.location.hash);
  window.addEventListener(`hashchange`, locationHandler);
  onCleanup(() => window.removeEventListener(`hashchange`, locationHandler));
  return location;
};

export const App: Component = () => {
  const { contacts } = getContacts();
  const currentHash = getLocationHash();
  return (
    <div class={styles.withSidebar}>
      <div class={styles.sidebar}>
        <ContactList
          contacts={contacts}
          currentHash={currentHash}
          id={CONTACT_LIST_ID}
        />
      </div>
      <div class={styles.notSidebar}>
        <MainContent contacts={contacts} currentHash={currentHash} />
      </div>
    </div>
  );
};
