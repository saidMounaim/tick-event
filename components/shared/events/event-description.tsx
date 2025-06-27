import { Card, CardContent } from "@/components/ui/card";

export function EventDescription({ description }: { description: string }) {
  return (
    <Card className="p-0">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
