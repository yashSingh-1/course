import { useUser } from "@clerk/clerk-react";
import { useMemo } from "react";

// Instead of using a hook, we'll create a type and helper function
export type CurrentUser = {
  id: string;
  email: string;
  isLoaded: boolean;
  firstName: string;
  lastName: string;
};

// Create a custom hook that wraps useUser and memoizes the formatted data
export const useCurrentUser = (): CurrentUser => {
  const { user, isLoaded } = useUser();
  
  const currentUser = useMemo(() => ({
    id: user?.id || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    isLoaded,
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  }), [user, isLoaded]);

  console.log("from current user",currentUser);
  return currentUser;
};