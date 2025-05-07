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
import { AlertTriangle } from "lucide-react";

const formSchema = z.object({
  url: z.string()
    .min(4, { message: "URL must be at least 4 characters" })
    .refine(
      (val) => /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}/.test(val) || /^https?:\/\//.test(val),
      { message: "Please enter a valid URL" }
    ),
  reason: z.string()
    .min(5, { message: "Reason must be at least 5 characters" })
    .max(200, { message: "Reason must be less than 200 characters" }),
  details: z.string()
    .max(1000, { message: "Details must be less than 1000 characters" })
    .optional(),
  reportedBy: z.string()
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
      reason: "",
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
            <h1 className="text-3xl font-heading font-bold mb-4">Report a Suspicious Website</h1>
            <p className="text-primary-600">
              Help us protect other users by reporting websites that may be fraudulent, 
              contain malware, or engage in phishing.
            </p>
          </div>
          
          {isSuccess ? (
            <Card className="bg-success-light border-success">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/20 text-success mb-4">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-medium mb-2">Report Submitted Successfully</h2>
                  <p className="mb-4">Thank you for your contribution to making the web safer!</p>
                  <Button onClick={() => setIsSuccess(false)}>Report Another Website</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Website Report Form</CardTitle>
                <CardDescription>
                  Please provide as much detail as possible about the suspicious website
                </CardDescription>
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
                          <FormControl>
                            <Input 
                              placeholder="e.g., Phishing, Scam, Malware, Suspicious Activity" 
                              {...field} 
                            />
                          </FormControl>
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
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Report"}
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
