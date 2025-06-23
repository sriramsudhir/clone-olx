"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/data";
import { LocateFixed, UploadCloud, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const listingFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  category: z.string().min(1, "Please select a category."),
  description: z.string().min(20, "Description must be at least 20 characters."),
  price: z.coerce.number().min(1, "Price must be at least $1."),
  location: z.string().min(2, "Location is required."),
  images: z.any(),
});

type ListingFormValues = z.infer<typeof listingFormSchema>;

export default function CreateListingForm() {
  const { toast } = useToast();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      price: 0,
      location: "",
    },
  });
  
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd use a reverse geocoding service.
          // For now, we'll just indicate we have coords.
          form.setValue("location", "Your Current Location", { shouldValidate: true });
          toast({ title: "Location captured!" });
        },
        () => {
          toast({ variant: "destructive", title: "Could not get location." });
        }
      );
    } else {
      toast({ variant: "destructive", title: "Geolocation is not supported by your browser." });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews].slice(0, 5));
    }
  };
  
  function onSubmit(data: ListingFormValues) {
    toast({
      title: "Listing Submitted!",
      description: "Your item is now live.",
    });
    form.reset();
    setImagePreviews([]);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Vintage Leather Sofa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.slug} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your item in detail..."
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input type="number" placeholder="0.00" className="pl-6" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="e.g., San Francisco, CA" {...field} />
                  </FormControl>
                  <Button type="button" variant="outline" size="icon" onClick={handleGetLocation}>
                    <LocateFixed className="h-4 w-4" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photos</FormLabel>
              <FormControl>
                 <div className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center hover:border-primary transition-colors">
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground">Drag & drop files here, or click to browse</p>
                    <p className="text-xs text-muted-foreground/70">Max 5 images</p>
                    <Input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        disabled={imagePreviews.length >= 5}
                    />
                </div>
              </FormControl>
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-4">
                  {imagePreviews.map((src, index) => (
                    <div key={index} className="relative aspect-square">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-md" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => setImagePreviews(previews => previews.filter((_, i) => i !== index))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit" size="lg" className="w-full md:w-auto">
          Post Listing
        </Button>
      </form>
    </Form>
  );
}
