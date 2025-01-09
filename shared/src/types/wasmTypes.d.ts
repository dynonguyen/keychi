import { Any } from './util.type';

declare global {
  export interface Window {
    Go: Any;
    run: (shape: string) => Any[];
  }
}
export {};
