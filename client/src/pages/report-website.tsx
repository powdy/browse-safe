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
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-heading font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">Report a Suspicious Website</h1>
            <p className="text-primary-600 max-w-lg mx-auto">
              Help us protect other users by reporting websites that may be fraudulent, 
              contain malware, or engage in phishing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-primary-50 p-4 rounded-lg border border-primary-100 flex flex-col items-center text-center">
              <Globe className="h-8 w-8 text-primary-500 mb-2" />
              <h3 className="text-sm font-medium mb-1">Identify Threats</h3>
              <p className="text-xs text-primary-600">Your reports help identify new threats</p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg border border-primary-100 flex flex-col items-center text-center">
              <AlertCircle className="h-8 w-8 text-primary-500 mb-2" />
              <h3 className="text-sm font-medium mb-1">Protect Others</h3>
              <p className="text-xs text-primary-600">Warn the community about suspicious sites</p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg border border-primary-100 flex flex-col items-center text-center">
              <FileWarning className="h-8 w-8 text-primary-500 mb-2" />
              <h3 className="text-sm font-medium mb-1">Take Action</h3>
              <p className="text-xs text-primary-600">We review and act on valid reports</p>
            </div>
          </div>
          
          {isSuccess ? (
            <Card className="border-2 border-success shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 text-success mb-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-medium mb-2 text-success">Report Submitted Successfully</h2>
                  <p className="mb-6 text-primary-600 max-w-md mx-auto">
                    Thank you for your contribution to making the web safer! 
                    Our team will review your report and take appropriate action.
                  </p>
                  
                  <div className="border-t border-success/20 pt-6 mt-6">
                    <p className="text-sm text-primary-500 mb-4">
                      Want to help protect others from more suspicious websites?
                    </p>
                    <Button 
                      onClick={() => setIsSuccess(false)}
                      className="bg-success/90 hover:bg-success transition-colors"
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
            <Card className="border shadow-md">
              <CardHeader className="bg-primary-50 border-b border-primary-100">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-100 p-2 rounded-full">
                    <FileWarning className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <CardTitle>Website Report Form</CardTitle>
                    <CardDescription>
                      Please provide as much detail as possible about the suspicious website
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
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
                    
                    <div className="flex items-start p-4 bg-warning-light rounded-lg">
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
    </>
  );
}

function CheckCircle(props: any) {
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
