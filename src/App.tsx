import { Component, createSignal, onCleanup } from "solid-js";

import { ContactList } from "./components/ContactList";
import { MainContent } from "./components/MainContent";
import classes from "./App.module.css";
import { CONTACT_LIST_ID } from "./constants";
import { getContactsStorage } from "./contactStorage";

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
  const contactStorage = getContactsStorage();
  const currentHash = getLocationHash();
  return (
    <div class={classes.withSidebar}>
      <div class={classes.sidebar}>
        <ContactList
          contacts={contactStorage.contacts}
          currentHash={currentHash}
          id={CONTACT_LIST_ID}
        />
      </div>
      <div class={classes.notSidebar}>
        <MainContent contactStorage={contactStorage} currentHash={currentHash} />
      </div>
    </div>
  );
};
