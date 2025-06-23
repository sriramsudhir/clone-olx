import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CreateListingForm from "./CreateListingForm";

export default function CreateListingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Create a new listing</CardTitle>
          <CardDescription>Fill out the details below to post your item for sale.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateListingForm />
        </CardContent>
      </Card>
    </div>
  );
}
