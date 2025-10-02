import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
}

interface UserRole {
  role: 'admin' | 'doctor' | 'receptionist' | 'accountant';
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  userRoles: string[];
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  userRoles: [],
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        return null;
      }

      return data as Profile;
    } catch (error) {
      return null;
    }
  };

  const fetchUserRoles = async (userId: string): Promise<string[]> => {
    try {
      const { data, error } = await (supabase as any)
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) {
        return [];
      }

      return data.map((r: UserRole) => r.role);
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Use setTimeout to prevent deadlock
          setTimeout(() => {
            fetchProfile(session.user.id).then(setProfile);
            fetchUserRoles(session.user.id).then(setUserRoles);
          }, 0);
        } else {
          setProfile(null);
          setUserRoles([]);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id).then(setProfile);
        fetchUserRoles(session.user.id).then(setUserRoles);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      // Error signing out, but don't expose details
    }
  };

  const value = {
    user,
    session,
    profile,
    userRoles,
    loading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};