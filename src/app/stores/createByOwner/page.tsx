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
import validator from "validator";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { timeOptions } from "../times";
import PhoneNumberValidation from "../phonenumbervalidation"; 


const dineOptions = [
  { value: "CAFE", label: "sit in" },
  { value: "BAR", label: "bar" },
];

// const hoursOptions = [{ value: new Date(), label: "Monday open" }];
const VALUES = ["CAFE", "BAR"] as const;
const formSchema = z.object({
  name: z.string(),
  rating: z.number({ required_error: "A rating is required." }).gte(0).lte(5),
  phoneNumber: z.string().refine(validator.isMobilePhone).optional(),
  instagramHandle: z.string().optional(),
  avatar: z.string().optional(),
  photos: z.array(z.string()),
  serviceTypes: z
    .object({
      sitInEnum: z.enum(VALUES),
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
  const [value, setValue] = useState<string>();
  const [country, setCountry] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rating: undefined,
      phoneNumber: "",
      instagramHandle: "",
      avatar: "",
      photos: [],
      serviceTypes: {
        sitInEnum: "CAFE",
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
    const {
      name,
      rating,
      phoneNumber,
      instagramHandle,
      avatar,
      photos,
      serviceTypes,
      serviceHours,
    } = values;
    const res = await fetch("http://localhost:3000/api/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        rating,
        phoneNumber,
        instagramHandle,
        avatar,
        photos,
        serviceTypes,
        serviceHours,
      }),
    });

    const data = await res.json();
  }

  return (
    <>
      <Layout>
        <Link
          href="/stores/create"
          className={buttonVariants({ variant: "outline" })}
        >
          Back
        </Link>
        <div>
          <section></section>
        </div>
        <div className="grid place-content-center">
          <section>
            <h1 className="p-5 shrink-0 flex place-content-center text-5xl font-bold text-black">
              add your store here ☕
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Phone Number</FormLabel> */}
                    <FormControl>
                      <PhoneNumberValidation
                        value={field.value}
                        onChange={(value: string) => field.onChange(value)}
                      />
                    </FormControl>
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
                    <FormLabel>Store Type(s)</FormLabel>
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
                      <Select isMulti options={timeOptions} />
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
