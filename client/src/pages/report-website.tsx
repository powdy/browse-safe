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
import { AlertTriangle, AlertCircle, Shield, ChevronRight, FileWarning, Send, Globe } from "lucide-react";

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
      
      <div className="relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-100/50 blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-secondary-100/50 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary-50/50 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600 mb-6 shadow-lg">
                <Shield className="h-10 w-10" />
              </div>
              <h1 className="text-4xl font-heading font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">Report a Suspicious Website</h1>
              <p className="text-primary-600 max-w-lg mx-auto text-lg">
                Help us protect other users by reporting websites that may be fraudulent, 
                contain malware, or engage in phishing.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-white to-primary-50 p-6 rounded-xl border border-primary-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-base font-medium mb-2">Identify Threats</h3>
                <p className="text-sm text-primary-600">Your reports help identify new threats</p>
              </div>
              <div className="bg-gradient-to-br from-white to-primary-50 p-6 rounded-xl border border-primary-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <h3 className="text-base font-medium mb-2">Protect Others</h3>
                <p className="text-sm text-primary-600">Warn the community about suspicious sites</p>
              </div>
              <div className="bg-gradient-to-br from-white to-primary-50 p-6 rounded-xl border border-primary-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <FileWarning className="h-6 w-6" />
                </div>
                <h3 className="text-base font-medium mb-2">Take Action</h3>
                <p className="text-sm text-primary-600">We review and act on valid reports</p>
              </div>
            </div>
            
            {isSuccess ? (
              <Card className="border border-success/20 shadow-xl rounded-xl overflow-hidden bg-gradient-to-br from-white to-success/5">
                <CardHeader className="bg-gradient-to-r from-success/10 to-success/5 border-b border-success/20">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-success to-success/80 p-3 rounded-full shadow-md">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-success">Report Submitted Successfully</CardTitle>
                      <CardDescription className="text-success/80">
                        Thank you for helping make the web safer for everyone
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-8 pb-8">
                  <div className="text-center">
                    <div className="p-6 mb-6 rounded-lg bg-success/5 border border-success/10">
                      <p className="text-primary-700">
                        Thank you for your contribution to making the web safer! 
                        Our team will review your report and take appropriate action against suspicious websites.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-primary-50/50 to-success/5 p-6 rounded-lg border border-success/10 mt-6">
                      <h3 className="text-lg font-medium mb-2 text-primary-800">Want to help protect more users?</h3>
                      <p className="text-sm text-primary-600 mb-4">
                        Your reports help us identify new threats and protect the community
                      </p>
                      <Button 
                        onClick={() => setIsSuccess(false)}
                        className="bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success transition-all"
                      >
                        <span className="flex items-center">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          Report Another Website
                        </span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border border-primary-100 shadow-lg rounded-xl overflow-hidden backdrop-blur-sm bg-white/90">
                <CardHeader className="bg-gradient-to-r from-primary-50 to-primary-100/50 border-b border-primary-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-full shadow-md">
                      <FileWarning className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-primary-800">Website Report Form</CardTitle>
                      <CardDescription className="text-primary-600">
                        Please provide as much detail as possible about the suspicious website
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website URL</FormLabel>
                            <FormControl>
                              <Input placeholder="example.com" {...field} />
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
                            <FormLabel>Reason for Report</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
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
                            <FormLabel>Additional Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide any additional information about why you believe this website is suspicious or dangerous"
                                rows={5}
                                {...field} 
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
                            <FormLabel>Your Email (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="email@example.com" 
                                {...field} 
                              />
                            </FormControl>
                            <p className="text-xs text-primary-500">
                              We'll only use this to contact you if we need more information
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-start p-4 bg-primary-50 border border-primary-100 rounded-lg">
                        <AlertTriangle className="text-warning flex-shrink-0 mr-3 h-5 w-5 mt-0.5" />
                        <p className="text-sm text-primary-700">
                          Reports are reviewed by our team. False or malicious reports may result in 
                          being blocked from using our service.
                        </p>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-500 hover:to-primary-700 transition-all" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <Send className="mr-2 h-4 w-4" />
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
    </>
  );
}

function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}