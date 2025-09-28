import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Heart, Shield, Users, LogIn } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-medical-500 to-medical-600 rounded-full flex items-center justify-center shadow-lg">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-medical-600 to-medical-700 bg-clip-text text-transparent">
            VetCare Management System
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            The complete solution for modern veterinary clinics. 
            Manage patients, appointments, medical records, and more - all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-medical-500 to-medical-600 hover:from-medical-600 hover:to-medical-700 px-8 py-3 text-lg hover-scale">
                <LogIn className="w-5 h-5 mr-2" />
                Get Started
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover-scale">
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-medical-500 mx-auto mb-4" />
                <CardTitle className="text-medical-700">Patient Care</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Complete patient records, medical history, and vaccination tracking for better pet care.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover-scale">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 text-medical-500 mx-auto mb-4" />
                <CardTitle className="text-medical-700">Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Bank-level security with automatic backups and role-based access control.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover-scale">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-medical-500 mx-auto mb-4" />
                <CardTitle className="text-medical-700">Team Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Manage your veterinary team with role-based dashboards and permissions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
