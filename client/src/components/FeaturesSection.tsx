import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, Search, Clock, Database, CheckCircle2 } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Comprehensive Analysis Card */}
          <Card className="bg-white rounded-xl shadow-lg border-0 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center">
                  <Shield className="text-white w-10 h-10" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <CheckCircle2 className="text-white w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Comprehensive Analysis</h3>
              <p className="text-gray-600">
                We analyze multiple security factors including domain age, SSL certificates, blacklists, and 
                user reports to provide a thorough security assessment.
              </p>
            </CardContent>
          </Card>
          
          {/* Fast Results Card */}
          <Card className="bg-white rounded-xl shadow-lg border-0 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-indigo-100 rounded-full"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center">
                  <Clock className="text-white w-10 h-10" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-indigo-500 rounded-full p-1">
                  <Search className="text-white w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Instant Results</h3>
              <p className="text-gray-600">
                Get detailed security analysis in under 30 seconds, helping you make rapid 
                decisions about website safety and trustworthiness.
              </p>
            </CardContent>
          </Card>
          
          {/* Growing Database Card */}
          <Card className="bg-white rounded-xl shadow-lg border-0 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="h-2 bg-gradient-to-r from-purple-500 to-violet-600"></div>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-purple-100 rounded-full"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-purple-400 to-violet-600 rounded-full flex items-center justify-center">
                  <Database className="text-white w-10 h-10" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-1">
                  <AlertTriangle className="text-white w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Extensive Database</h3>
              <p className="text-gray-600">
                Our continuously updated database contains information on millions of websites, 
                with real-time tracking of known scams and phishing attempts.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
