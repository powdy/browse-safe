import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, 
  AlertCircle, 
  Shield, 
  ChevronRight, 
  FileWarning, 
  Send, 
  Globe,
  CheckCircle,
  Lock, 
  Search
} from "lucide-react";

const reportReasons = [
  "phishing",
  "malware",
  "scam",
  "fake_products",
  "illegal_content",
  "copyright_violation",
  "impersonation",
  "misinformation",
  "other"
] as const;

const formSchema = z.object({
  url: z.string()
    .min(4, { message: "URL must be at least 4 characters" })
    .refine(
      (val) => /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}/.test(val) || /^https?:\/\//.test(val),
      { message: "Please enter a valid URL" }
    ),
  reason: z.enum(reportReasons, {
    required_error: "Please select a reason for your report",
  }),
  details: z.string()
    .max(1000, { message: "Details must be less than 1000 characters" })
    .optional(),
  reportedBy: z.string()
    .email({ message: "Please enter a valid email address" })
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ReportWebsite() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      reason: "phishing" as const,
      details: "",
      reportedBy: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // Clean up URL if needed
      if (!data.url.startsWith("http")) {
        data.url = "https://" + data.url;
      }

      // Submit the report
      await apiRequest("POST", "/api/reports", data);
      
      setIsSuccess(true);
      toast({
        title: "Report Submitted",
        description: "Thank you for helping keep the web safe!",
      });
      
      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Report a Suspicious Website | TrustGuard</title>
        <meta name="description" content="Help protect others by reporting suspicious or fraudulent websites. Your reports help us identify and warn users about potential online scams." />
      </Helmet>
      
      {/* Hero section with gradient background */}
      <div className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600 mb-6 shadow-lg">
              <Shield className="h-12 w-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
              Report a Suspicious Website
            </h1>
            <p className="text-primary-600 max-w-2xl mx-auto text-lg md:text-xl">
              Help us protect other users by reporting websites that may be fraudulent, 
              contain malware, or engage in phishing activities.
            </p>
          </div>
          
          {/* Feature cards with vibrant gradients and animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Search className="h-14 w-14 text-blue-600 mb-5" />
              <h3 className="text-lg font-medium mb-3 text-primary-800">Identify Threats</h3>
              <p className="text-primary-600">Your reports help identify new threats in the ever-changing online landscape</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Shield className="h-14 w-14 text-blue-600 mb-5" />
              <h3 className="text-lg font-medium mb-3 text-primary-800">Protect Others</h3>
              <p className="text-primary-600">Help warn the community about suspicious websites and online scams</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Lock className="h-14 w-14 text-blue-600 mb-5" />
              <h3 className="text-lg font-medium mb-3 text-primary-800">Take Action</h3>
              <p className="text-primary-600">Our team reviews all reports and takes appropriate action against malicious sites</p>
            </div>
          </div>
          
          {/* Main content section with card */}
          <div className="max-w-3xl mx-auto">
            {isSuccess ? (
              <Card className="border-0 shadow-2xl rounded-xl overflow-hidden bg-gradient-to-br from-white to-success/5">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-success/10 blur-3xl"></div>
                  <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full bg-primary-100/20 blur-3xl"></div>
                </div>
                
                <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-green-100 relative z-10">
                  <div className="flex items-center gap-4">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                    <div>
                      <CardTitle className="text-2xl font-bold text-green-600">Report Submitted Successfully</CardTitle>
                      <CardDescription className="text-green-500">
                        Thank you for helping make the web safer for everyone
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-10 pb-10 relative z-10">
                  <div className="text-center space-y-8">
                    <div className="p-8 rounded-xl bg-success/5 border border-success/10 shadow-inner">
                      <p className="text-lg text-primary-700">
                        Thank you for your contribution to making the web safer! 
                        Our team will review your report promptly and take appropriate action against suspicious websites.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-primary-50/80 to-success/5 p-8 rounded-xl border border-success/10 mt-8 shadow-lg">
                      <h3 className="text-xl font-medium mb-3 text-primary-800">Want to help protect more users?</h3>
                      <p className="text-primary-600 mb-6">
                        Your reports help us identify new threats and protect the online community
                      </p>
                      <Button 
                        onClick={() => setIsSuccess(false)}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium transition-all text-lg py-6 px-8"
                        size="lg"
                      >
                        <span className="flex items-center">
                          <ChevronRight className="h-5 w-5 mr-2" />
                          Report Another Website
                        </span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-2xl rounded-xl overflow-hidden backdrop-blur-sm bg-white/90">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary-100/20 blur-3xl"></div>
                  <div className="absolute top-1/3 -left-16 w-64 h-64 rounded-full bg-secondary-100/20 blur-3xl"></div>
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary-50/20 blur-3xl"></div>
                </div>
                
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 relative z-10">
                  <div className="flex items-center gap-4">
                    <FileWarning className="h-10 w-10 text-blue-600" />
                    <div>
                      <CardTitle className="text-2xl font-bold text-primary-800">Website Report Form</CardTitle>
                      <CardDescription className="text-primary-600 text-base">
                        Please provide details about the suspicious website to help protect others
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 relative z-10">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium text-primary-700">Website URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="example.com" 
                                {...field} 
                                className="py-6 px-4 text-lg shadow-sm focus:border-primary-400 focus:ring-primary-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium text-primary-700">Reason for Report</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="py-6 px-4 text-lg shadow-sm focus:border-primary-400 focus:ring-primary-400">
                                  <SelectValue placeholder="Select a reason" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="phishing">Phishing - Attempts to steal personal information</SelectItem>
                                <SelectItem value="malware">Malware or Virus Distribution</SelectItem>
                                <SelectItem value="scam">General Scam or Fraud</SelectItem>
                                <SelectItem value="fake_products">Counterfeit Products or Services</SelectItem>
                                <SelectItem value="illegal_content">Illegal Content</SelectItem>
                                <SelectItem value="copyright_violation">Copyright Violation</SelectItem>
                                <SelectItem value="impersonation">Brand or Website Impersonation</SelectItem>
                                <SelectItem value="misinformation">Misinformation or Disinformation</SelectItem>
                                <SelectItem value="other">Other Security Issue</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="details"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium text-primary-700">Additional Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide any additional information about why you believe this website is suspicious or dangerous"
                                rows={5}
                                {...field}
                                className="shadow-sm focus:border-primary-400 focus:ring-primary-400 text-base"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="reportedBy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium text-primary-700">Your Email (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="email@example.com" 
                                {...field}
                                className="py-6 px-4 text-lg shadow-sm focus:border-primary-400 focus:ring-primary-400"
                              />
                            </FormControl>
                            <p className="text-sm text-primary-500 mt-2">
                              We'll only use this to contact you if we need more information about your report
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-start p-5 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl border border-amber-200 shadow-sm">
                        <AlertTriangle className="text-amber-500 flex-shrink-0 mr-4 h-6 w-6 mt-0.5" />
                        <p className="text-primary-700">
                          All reports are reviewed by our security team. False or malicious reports may result in 
                          being blocked from using our service.
                        </p>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all text-lg py-6" 
                        disabled={isSubmitting}
                        size="lg"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting Report...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <Send className="mr-2 h-5 w-5" />
                            Submit Report
                          </span>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      {/* Secondary explanation section */}
      <div className="py-16 bg-white border-t border-primary-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary-800">Why Report Suspicious Websites?</h2>
              <p className="text-primary-600 text-lg">
                Reporting suspicious websites helps protect the online community from various threats including:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-3 mt-1">
                    <AlertCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <span className="font-medium text-primary-800">Phishing Attacks</span>
                    <p className="text-primary-600">Websites that trick users into revealing sensitive information</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-3 mt-1">
                    <FileWarning className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <span className="font-medium text-primary-800">Malware Distribution</span>
                    <p className="text-primary-600">Sites that deliver viruses, ransomware, or other harmful software</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-3 mt-1">
                    <Globe className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <span className="font-medium text-primary-800">Fraudulent Schemes</span>
                    <p className="text-primary-600">Online scams, counterfeit products, and fake services</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-xl border border-primary-100 shadow-lg">
              <h3 className="text-2xl font-bold text-primary-800 mb-4">What Happens After Reporting?</h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
                    <Search className="h-5 w-5 text-primary-600" />
                  </div>
                  <p className="text-primary-600">Our security team analyzes the reported website using advanced detection tools</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
                    <Shield className="h-5 w-5 text-primary-600" />
                  </div>
                  <p className="text-primary-600">Confirmed malicious sites are added to our database, warning future visitors</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
                    <Lock className="h-5 w-5 text-primary-600" />
                  </div>
                  <p className="text-primary-600">We report dangerous websites to relevant authorities and browser security services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}