"use client";
import Layout from "../../layout";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select from "react-select";

const dineOptions = [
  { value: "CAFE_SIT_IN", label: "dine in" },
  { value: "CAFE_TAKE_OUT", label: "take out" },
  { value: "BAR_SIT_IN", label: "bar" },
];

const hoursOptions = [{ value: new Date(), label: "Monday open" }];
const VALUES = ["CAFE_SIT_IN", "CAFE_TAKE_OUT", "BAR_SIT_IN"] as const;
const formSchema = z.object({
  name: z.string(),
  rating: z.number({ required_error: "A rating is required." }).gte(0).lte(5),
  instagramHandle: z.string().optional(),
  serviceTypes: z
    .object({
      sitInEnum: z.array(z.enum(VALUES)),
      takeOut: z.boolean(),
      delivery: z.boolean(),
    })
    .required(),
  serviceHours: z.object({
    mondayOpen: z.date(),
    mondayClose: z.date(),
    tuesdayOpen: z.date(),
    tuesdayClose: z.date(),
    wednesdayOpen: z.date(),
    wednesdayClose: z.date(),
    thursdayOpen: z.date(),
    thursdayClose: z.date(),
    fridayOpen: z.date(),
    fridayClose: z.date(),
    saturdayOpen: z.date(),
    saturdayClose: z.date(),
    sundayOpen: z.date(),
    sundayClose: z.date(),
  }),
});

export default function CreateStore() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      instagramHandle: "",
      serviceTypes: {
        sitInEnum: ["CAFE_SIT_IN"],
        takeOut: false,
        delivery: false,
      },
      serviceHours: {
        mondayOpen: new Date(),
        mondayClose: new Date(),
        tuesdayOpen: new Date(),
        tuesdayClose: new Date(),
        wednesdayOpen: new Date(),
        wednesdayClose: new Date(),
        thursdayOpen: new Date(),
        thursdayClose: new Date(),
        fridayOpen: new Date(),
        fridayClose: new Date(),
        saturdayOpen: new Date(),
        saturdayClose: new Date(),
        sundayOpen: new Date(),
        sundayClose: new Date(),
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, rating, instagramHandle, serviceTypes, serviceHours } =
      values;
    const res = await fetch("http://localhost:3000/api/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        rating,
        instagramHandle,
        serviceTypes,
        serviceHours,
      }),
    });

    const data = await res.json();
  }

  return (
    <>
      <Layout>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Back
        </Link>
        <div className="grid place-content-center">
          <section>
            <h1 className="p-5 shrink-0 flex place-content-center text-5xl font-bold text-black">
              add a store ☕
            </h1>
          </section>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagramHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram Handle</FormLabel>
                    <FormControl>
                      <Input placeholder="@" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceTypes.sitInEnum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Type</FormLabel>
                    <FormControl>
                      <Select isMulti options={dineOptions} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Hours</FormLabel>
                    <FormControl>
                      <Select isMulti options={hoursOptions} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </Layout>
    </>
  );
}
