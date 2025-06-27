"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Image } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { createEventSchema } from "@/lib/validations";
import { uploadToImageKit } from "@/lib/actions/upload";
import { toast } from "sonner";
import { createEventAction } from "@/lib/actions/event";
import { useRouter } from "next/navigation";

type CreateEventFormValues = z.infer<typeof createEventSchema>;

export function CreateEventForm() {
  const router = useRouter();
  const form = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      tickets: 1,
      price: 0,
      date: undefined,
      location: "",
      featuredImage: undefined,
      additionalImages: undefined,
    },
  });

  const [featuredImageName, setFeaturedImageName] = useState<string | null>(
    null
  );
  const [additionalImagesCount, setAdditionalImagesCount] = useState<number>(0);

  const onSubmit = async (data: CreateEventFormValues) => {
    let featuredImageUrl: string | undefined = undefined;
    let additionalImageUrls: string[] = [];

    if (data.featuredImage instanceof File) {
      featuredImageUrl = await uploadToImageKit(data.featuredImage);
    }

    if (data.additionalImages && data.additionalImages.length > 0) {
      const files = Array.from(data.additionalImages as FileList);
      additionalImageUrls = await Promise.all(
        files.map((file) => uploadToImageKit(file))
      );
    }

    try {
      const response = await createEventAction({
        ...data,
        featuredImageUrl,
        additionalImageUrls,
      });
      if (response.success === false) {
        toast.error(response.message);
        return;
      }
      toast.success("Event created successfully!");
      router.push(`/dashboard`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create event. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter event title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your event..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tickets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Tickets</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="100"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Price ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="25.00"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Event location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featuredImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image</FormLabel>
              <FormControl>
                <div>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    id="featured-image-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                      setFeaturedImageName(file ? file.name : null);
                    }}
                  />
                  <label
                    htmlFor="featured-image-upload"
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer block"
                  >
                    <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">
                      {featuredImageName
                        ? featuredImageName
                        : "Click to upload featured image"}
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Images</FormLabel>
              <FormControl>
                <div>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    multiple
                    className="hidden"
                    id="additional-images-upload"
                    onChange={(e) => {
                      const files = e.target.files;
                      field.onChange(files);
                      setAdditionalImagesCount(files ? files.length : 0);
                    }}
                  />
                  <label
                    htmlFor="additional-images-upload"
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer block"
                  >
                    <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">
                      {additionalImagesCount > 0
                        ? `${additionalImagesCount} image(s) selected`
                        : "Click to upload additional images"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Multiple images allowed
                    </p>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating Event..." : "Create Event"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
