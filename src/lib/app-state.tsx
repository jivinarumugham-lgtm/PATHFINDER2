import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  seedConnections,
  seedMessages,
  type ChatMessage,
  type Connection,
  type MicroOpportunity,
  type Role,
} from "./mock-data";

type AppState = {
  signedIn: boolean;
  role: Role | null;
  displayName: string;
  onboardingComplete: boolean;
  connections: Connection[];
  messages: ChatMessage[];
  availableForMentoring: boolean;
  signIn: (name?: string) => void;
  signOut: () => void;
  setRole: (role: Role) => void;
  completeOnboarding: () => void;
  requestConnection: (
    professionalId: string,
    message: string,
    opportunity: MicroOpportunity,
  ) => void;
  respondToConnection: (id: string, status: "accepted" | "declined") => void;
  sendMessage: (connectionId: string, text: string) => void;
  toggleAvailability: () => void;
};

const AppStateContext = createContext<AppState | null>(null);

const CURRENT_YOUTH_ID = "y1";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  const [role, setRoleState] = useState<Role | null>(null);
  const [displayName, setDisplayName] = useState("Kieran Doyle");
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [connections, setConnections] = useState<Connection[]>(seedConnections);
  const [messages, setMessages] = useState<ChatMessage[]>(seedMessages);
  const [availableForMentoring, setAvailableForMentoring] = useState(true);

  const signIn = useCallback((name?: string) => {
    setSignedIn(true);
    if (name) setDisplayName(name);
  }, []);

  const signOut = useCallback(() => {
    setSignedIn(false);
    setRoleState(null);
    setOnboardingComplete(false);
  }, []);

  const setRole = useCallback((next: Role) => {
    setRoleState(next);
    setDisplayName(next === "youth" ? "Kieran Doyle" : "Amara Okafor");
  }, []);

  const requestConnection = useCallback(
    (professionalId: string, message: string, opportunity: MicroOpportunity) => {
      setConnections((prev) => [
        {
          id: `c${prev.length + 1}-${professionalId}`,
          professionalId,
          youthId: CURRENT_YOUTH_ID,
          status: "pending",
          message,
          sentAt: "Just now",
          opportunity,
        },
        ...prev,
      ]);
    },
    [],
  );

  const respondToConnection = useCallback((id: string, status: "accepted" | "declined") => {
    setConnections((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  }, []);

  const sendMessage = useCallback((connectionId: string, text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `m${prev.length + 1}`,
        connectionId,
        from: "me",
        text,
        time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, []);

  const value = useMemo(
    () => ({
      signedIn,
      role,
      displayName,
      onboardingComplete,
      connections,
      messages,
      availableForMentoring,
      signIn,
      signOut,
      setRole,
      completeOnboarding: () => setOnboardingComplete(true),
      requestConnection,
      respondToConnection,
      sendMessage,
      toggleAvailability: () => setAvailableForMentoring((v) => !v),
    }),
    [
      signedIn,
      role,
      displayName,
      onboardingComplete,
      connections,
      messages,
      availableForMentoring,
      signIn,
      signOut,
      setRole,
      requestConnection,
      respondToConnection,
      sendMessage,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}

export { CURRENT_YOUTH_ID };
