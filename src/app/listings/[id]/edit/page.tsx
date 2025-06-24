import { Card, CardContent } from "@/components/ui/card";
import CreateListingForm from "@/app/create/CreateListingForm";
import { getListingById } from "@/lib/data";
import { notFound } from "next/navigation";
import BackButton from "@/components/layout/BackButton";

export default function EditListingPage({ params }: { params: { id: string } }) {
  const listing = getListingById(params.id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-4">
        <BackButton />
        <div className="ml-4 space-y-1">
            <h1 className="font-headline text-3xl font-bold">Edit Your Listing</h1>
            <p className="text-muted-foreground">
              Update the details of your listing below and save the changes.
            </p>
        </div>
      </div>
      <Card>
        <CardContent className="p-6 md:p-8">
          <CreateListingForm initialData={listing} />
        </CardContent>
      </Card>
    </div>
  );
}
