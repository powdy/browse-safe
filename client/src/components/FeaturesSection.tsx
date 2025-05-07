import { Card, CardContent } from "@/components/ui/card";
import { Gauge, Zap, Database } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">Why Use TrustGuard?</h2>
          <p className="text-lg text-primary-600 max-w-3xl mx-auto">
            Our comprehensive security analysis helps you make informed decisions about websites 
            before you share personal information or make purchases
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-white rounded-xl shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gauge className="text-accent-600 text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Comprehensive Analysis</h3>
              <p className="text-primary-600">
                We check multiple security factors including domain age, SSL, blacklists, and 
                user reports to provide a thorough assessment.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white rounded-xl shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-accent-600 text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Fast Results</h3>
              <p className="text-primary-600">
                Get detailed security analysis in under a minute, helping you make quick 
                decisions about website trustworthiness.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white rounded-xl shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="text-accent-600 text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Growing Database</h3>
              <p className="text-primary-600">
                Our constantly updated database contains information on millions of websites, 
                including known scams and phishing attempts.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
