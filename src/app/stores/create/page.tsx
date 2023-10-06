"use client";
import Layout from "../../layout";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ratingOptions } from "./ratings";
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
import RatingButton from "./ratingButton";

const dineOptions = [
  { value: "CAFE", label: "sit in" },
  { value: "BAR", label: "bar" },
];

const hoursOptions = [{ value: new Date(), label: "Monday open" }];
const VALUES = ["CAFE", "BAR"] as const;
const formSchema = z.object({
  name: z.string(),
  rating: z.number({ required_error: "A rating is required." }).gte(1).lte(5),
  phoneNumber: z.string().refine(validator.isMobilePhone).optional(),
  instagramHandle: z.string().optional(),
  avatar: z.string().optional(),
  images: z.array(z.string()),
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
  const [imageUploaded, setImageUploaded] = useState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rating: undefined,
      phoneNumber: "",
      instagramHandle: "",
      avatar: "",
      images: [],
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
      images,
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
        images,
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
        <Link
          href="/stores/create/addImage"
          className={buttonVariants({ variant: "outline" })}
        >
          image upload button
        </Link>
        <div>
          <section></section>
        </div>
        <div className="grid place-content-center">
          <section>
            <div>
              Are you are store owner? If so,
              <Link className="ml-2" href="/stores/createByOwner">
                <Button>Click Here!</Button>
              </Link>
            </div>
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
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating ⭐</FormLabel>
                    <FormControl>
                      <div className="space-x-4">
                        <RatingButton ratingNumber={1} />
                        <RatingButton ratingNumber={2} />
                        <RatingButton ratingNumber={3} />
                        <RatingButton ratingNumber={4} />
                        <RatingButton ratingNumber={5} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        defaultCountry="US"
                        placeHolder="Enter phone number"
                        value={value}
                        onChange={setValue}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
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
              {/* <FormField
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
              /> */}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </Layout>
    </>
  );
}
