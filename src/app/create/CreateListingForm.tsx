
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { LocateFixed, UploadCloud, X, CaseSensitive, Tag, AlignLeft, CircleDollarSign, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import type { SubCategory } from "@/lib/types";

const listingFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  category: z.string().min(1, "Please select a category."),
  subCategory: z.string().optional(),
  description: z.string().min(20, "Description must be at least 20 characters."),
  price: z.coerce.number().min(1, "Price must be at least ₹1."),
  priceTo: z.coerce.number().optional(),
  images: z.any(),
  location: z.string().min(2, "Location is required."),
}).refine(data => !data.priceTo || data.priceTo > data.price, {
    message: "Max price must be greater than min price.",
    path: ["priceTo"],
});

type ListingFormValues = z.infer<typeof listingFormSchema>;

export default function CreateListingForm() {
  const { toast } = useToast();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      title: "",
      category: "",
      subCategory: "",
      description: "",
      price: undefined,
      priceTo: undefined,
      location: "",
    },
  });

  const selectedCategoryName = form.watch("category");

  useEffect(() => {
    if (selectedCategoryName) {
      const categoryData = categories.find(c => c.name === selectedCategoryName);
      const subs = categoryData?.subCategories?.filter(sc => sc.slug !== 'all') || [];
      setSubCategories(subs);
      form.setValue('subCategory', ''); 
    } else {
      setSubCategories([]);
    }
  }, [selectedCategoryName, form]);
  
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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
      const currentImageCount = imagePreviews.length;
      if (currentImageCount + files.length > 5) {
        toast({
          variant: "destructive",
          title: "Maximum images reached",
          description: "You can only upload up to 5 images.",
        });
        return;
      }
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImagePreviews(previews => previews.filter((_, index) => index !== indexToRemove));
  };
  
  function onSubmit(data: ListingFormValues) {
    console.log({ ...data, images: imagePreviews });
    toast({
      title: "Listing Submitted!",
      description: "Your item is now live.",
    });
    form.reset();
    setImagePreviews([]);
  }

  const FormLabelWithIcon = ({ icon, children }: { icon: React.ElementType, children: React.ReactNode }) => {
    const Icon = icon;
    return (
      <FormLabel className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span>{children}</span>
      </FormLabel>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabelWithIcon icon={UploadCloud}>Photos</FormLabelWithIcon>
              <FormDescription>Add up to 5 photos. The first one will be the main photo.</FormDescription>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-md border" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full shadow-md"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {imagePreviews.length < 5 && (
                   <FormControl>
                     <div className="aspect-square relative border-2 border-dashed border-muted rounded-lg flex items-center justify-center text-center hover:border-primary transition-colors cursor-pointer">
                        <div className="flex flex-col items-center text-muted-foreground">
                            <UploadCloud className="h-8 w-8" />
                            <span className="text-xs mt-2">Upload</span>
                        </div>
                        <Input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                    </div>
                  </FormControl>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabelWithIcon icon={CaseSensitive}>Title</FormLabelWithIcon>
              <FormControl>
                <Input placeholder="e.g., Vintage Leather Sofa, well-maintained" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithIcon icon={Tag}>Category</FormLabelWithIcon>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.filter(c => c.slug !== 'nearby').map((cat) => (
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
          {subCategories.length > 0 && (
            <FormField
              control={form.control}
              name="subCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sub-category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subCategories.map((sub) => (
                        <SelectItem key={sub.slug} value={sub.name}>
                          {sub.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabelWithIcon icon={AlignLeft}>Description</FormLabelWithIcon>
              <FormControl>
                <Textarea
                  placeholder="Describe your item in detail, including its condition, features, and any flaws."
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <FormLabelWithIcon icon={CircleDollarSign}>Price Range</FormLabelWithIcon>
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">₹</span>
                        <Input type="number" placeholder="From" className="pl-8 font-semibold" {...field} value={field.value ?? ''} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-muted-foreground">-</span>
              <FormField
                control={form.control}
                name="priceTo"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">₹</span>
                        <Input type="number" placeholder="To (Optional)" className="pl-8 font-semibold" {...field} value={field.value ?? ''} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithIcon icon={MapPin}>Location</FormLabelWithIcon>
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

        <Button type="submit" size="lg" className="w-full md:w-auto">
          Post Listing
        </Button>
      </form>
    </Form>
  );
}
