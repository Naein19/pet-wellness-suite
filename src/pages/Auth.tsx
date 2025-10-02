import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, LogIn, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back! 🎉",
        description: "You've successfully logged in!",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Login failed 😢",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Account created! 🎉",
        description: "Please check your email to confirm your account.",
      });
    } catch (error: any) {
      toast({
        title: "Sign up failed 😢",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-medical-500 to-medical-600 rounded-full flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-medical-600 to-medical-700 bg-clip-text text-transparent">
              {isLogin ? 'Welcome Back' : 'Join Our Team'}
            </CardTitle>
            <CardDescription className="mt-2">
              {isLogin 
                ? 'Sign in to access your veterinary dashboard' 
                : 'Create your account to get started'
              }
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={isLogin ? handleLogin : handleSignUp} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Dr. John Smith"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={!isLogin}
                  className="animate-scale-in"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>


            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-medical-500 to-medical-600 hover:from-medical-600 hover:to-medical-700 transition-all duration-300 hover-scale"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isLogin ? 'Logging in...' : 'Creating Account...'}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  {isLogin ? 'Sign In' : 'Create Account'}
                </div>
              )}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-medical-600 hover:text-medical-700 transition-colors story-link"
            >
              {isLogin 
                ? "Don't have an account? Sign up here" 
                : "Already have an account? Sign in here"
              }
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;