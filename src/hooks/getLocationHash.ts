import { createSignal, onCleanup } from "solid-js";

export const getLocationHash = () => {
  const [location, setLocation] = createSignal<string>(
    window.location.hash || ``
  );
  const locationHandler = () => setLocation(window.location.hash);
  window.addEventListener(`hashchange`, locationHandler);
  onCleanup(() => window.removeEventListener(`hashchange`, locationHandler));
  return location;
};