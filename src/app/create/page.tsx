import { Card, CardContent } from "@/components/ui/card";
import CreateListingForm from "./CreateListingForm";

export default function CreateListingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-2 mb-8">
        <h1 className="font-headline text-3xl font-bold">Sell Your Item</h1>
        <p className="text-muted-foreground">
          A great listing is key to a quick sale. Fill out the details below to get started.
        </p>
      </div>
      <Card>
        <CardContent className="p-6 md:p-8">
          <CreateListingForm />
        </CardContent>
      </Card>
    </div>
  );
}
