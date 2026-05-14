import { createContext, useContext, type PropsWithChildren } from "react";

export type SocketLike = {
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  off: (event: string, handler?: (...args: unknown[]) => void) => void;
};

const SocketContext = createContext<SocketLike | null>(null);

export function SocketProvider({ children }: PropsWithChildren) {
  return (
    <SocketContext.Provider value={null}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
