import { createContext } from "react";
import { RouterContextType } from "./types";

export const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate() {
    console.warn('not implemented')
  },
});
