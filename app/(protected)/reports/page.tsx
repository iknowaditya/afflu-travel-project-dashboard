// app/help/page.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  LifeBuoy,
  Mail,
  BookOpen,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  const helpItems = [
    {
      icon: <HelpCircle className="h-5 w-5 text-primary" />,
      title: "FAQs",
      description: "Find answers to common questions",
      link: "#",
      linkText: "Browse FAQs",
    },
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: "Email Support",
      description: "Get direct help from our team",
      link: "mailto:support@example.com",
      linkText: "Contact Us",
    },
    {
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      title: "User Guide",
      description: "Learn how to use all features",
      link: "#",
      linkText: "Read Guide",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
            <LifeBuoy className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Help & Support</CardTitle>
          <CardDescription>
            We&apos;re here to help you with any questions or issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {helpItems.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  <Button variant="link" className="px-0 text-primary" asChild>
                    <a href={item.link}>
                      {item.linkText} <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Card className="bg-muted/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Need more help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our team is working on additional resources
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
