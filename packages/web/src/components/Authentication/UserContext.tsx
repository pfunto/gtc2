import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useState, ReactNode, useContext } from 'react';
import firebase from '../../firebase';

type UserContextType = {
  userId: string | undefined;
  isLoggedIn: boolean;
  setUserId: (value: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth(firebase);
  onAuthStateChanged(auth, (firebaseUser) => {
    if (!firebaseUser) setUserId(undefined);
    return firebaseUser && userId ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  return (
    <UserContext.Provider value={{ userId, setUserId, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be within UserProvider');
  }

  return context;
}

export { UserContext, UserContextProvider, useUserContext };
