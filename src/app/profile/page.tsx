import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
            <Avatar className="mx-auto h-24 w-24 mb-4">
                <AvatarImage src="https://placehold.co/100x100" alt="User Name" data-ai-hint="person face" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
          <CardTitle className="text-3xl">User Name</CardTitle>
          <CardDescription>Member since May 2024</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">This is a placeholder profile page. In a real app, you would see user details, listings, and reviews here.</p>
            <Button>Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
