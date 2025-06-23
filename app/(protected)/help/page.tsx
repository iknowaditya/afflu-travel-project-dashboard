// app/help/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Help & Support</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Need assistance? Here are some resources:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Check our{" "}
              <a href="#" className="underline text-primary">
                FAQ
              </a>
            </li>
            <li>
              Contact support:{" "}
              <a
                href="mailto:support@example.com"
                className="underline text-primary"
              >
                support@example.com
              </a>
            </li>
            <li>
              Read the{" "}
              <a href="#" className="underline text-primary">
                User Guide
              </a>
            </li>
          </ul>
          <p className="text-xs text-gray-400 mt-4">
            (More help resources coming soon!)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
