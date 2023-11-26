"use client";
import React, { useState } from "react";
import Layout from "../../layout";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import validator from "validator";
// import { useState } from "react";

const MAX_COUNT = 5;

const dineOptions = [
  { value: "CAFE", label: "sit in" },
  { value: "BAR", label: "bar" },
];

// const hoursOptions = [{ value: new Date(), label: "Monday open" }];
const VALUES = ["CAFE", "BAR"] as const;
const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  rating: z.string().transform((val, ctx) => {
    const parsed = parseInt(val);
    if (isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Not a number",
      });
      return z.NEVER;
    }
    if (parsed < 1 || parsed > 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Number is less than 1 or larger than 5",
      });
      return z.NEVER;
    }
    return parsed;
  }),
  phoneNumber: z.string().refine(
    (val) => validator.isMobilePhone(val),
    (val) => ({
      message: "Phone Nubmer is not valid",
    })
  ),
  // phoneNumber: z.string().regex(new RegExp("^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$")),
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

// const MAX_COUNT = 5;

export default function CreateStore() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileLimit, setFileLimit] = useState<boolean>(false);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const handleGetValues = () => {
    console.log("Get Values", getValues());
  };

  const handleUploadFiles = (files: FileList | null) => {
    if (!files) return;

    const uploaded: File[] = [...uploadedFiles];
    let limitExceeded = false;

    Array.from(files).forEach((file) => {
      if (uploaded.every((f) => f.name !== file.name)) {
        uploaded.push(file);

        // Check if file limit is exceeded
        if (uploaded.length === MAX_COUNT) {
          setFileLimit(true);
          limitExceeded = true;
        }

        // Display alert if more files are added than allowed
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
        }
      }
    });

    if (!limitExceeded) {
      setUploadedFiles(uploaded);
    }
  };

  const handleFileEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosenFiles = e.target.files;
    if (chosenFiles) {
      handleUploadFiles(chosenFiles);
    }
  };

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     name: "",
  //     rating: undefined,
  //     phoneNumber: "",
  //     instagramHandle: "",
  //     avatar: "",
  //     images: [],
  //     serviceTypes: {
  //       sitInEnum: "CAFE",
  //       takeOut: false,
  //       delivery: false,
  //     },
  //     serviceHours: {
  //       mondayOpen: new Date(),
  //       mondayClose: new Date(),
  //       tuesdayOpen: new Date(),
  //       tuesdayClose: new Date(),
  //       wednesdayOpen: new Date(),
  //       wednesdayClose: new Date(),
  //       thursdayOpen: new Date(),
  //       thursdayClose: new Date(),
  //       fridayOpen: new Date(),
  //       fridayClose: new Date(),
  //       saturdayOpen: new Date(),
  //       saturdayClose: new Date(),
  //       sundayOpen: new Date(),
  //       sundayClose: new Date(),
  //     },
  //   },
  // });

  // async function onSubmit(values: z.infer<typeof schema>) {
  //   const { name, rating, instagramHandle, avatar, images, serviceTypes } =
  //     values;

  //   const res = await fetch("http://localhost:3000/api/store", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name,
  //       rating,
  //       instagramHandle,
  //       avatar,
  //       images,
  //       serviceTypes,
  //     }),
  //   });

  //   const data = await res.json();
  // }

  return (
    <>
      <Layout>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Back
        </Link>
        <Link
          href="/stores/create/add-image"
          className={buttonVariants({ variant: "outline" })}
        >
          image upload button
        </Link>
        <div className="grid place-content-center">
          <section>
            <div>
              Are you are store owner? If so,
              <Link className="ml-2" href="/stores/create-by-owner">
                <Button>Click Here!</Button>
              </Link>
            </div>
            <h1 className="p-5 shrink-0 flex place-content-center text-5xl font-bold text-black">
              add a store ☕
            </h1>
          </section>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* <form onSubmit={handleSubmit((d) => console.log(d))} className="space-y-8"> */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Store Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="name"
                placeholder="Blue Bottle Coffee"
                {...register("name")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Rating ⭐
              </label>
              <select
                className="flex h-10 w-2/12 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="rating"
                {...register("rating")}
              >
                <option disabled selected></option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
              <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {errors.rating?.message && <p>{errors.rating?.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Phone Number
              </label>
              <input
                className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="phoneNumber"
                placeholder="(666)-666-6666"
                {...register("phoneNumber")}
              />
              <div className="text-destructive">
                {errors.phoneNumber?.message && (
                  <p>{errors.phoneNumber?.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Instagram
              </label>
              <input
                className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="instagramHandle"
                placeholder="@"
                {...register("instagramHandle")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Avatar
              </label>
              <input
                className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:bg-transparent
              hover:file:bg-violet-100"
                id="avatar"
                type="file"
                accept=".jpg, .png, .gif, .jpeg"
                {...register("avatar")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Images
              </label>
              <input
                className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:bg-transparent
              hover:file:bg-violet-100"
                id="images"
                type="file"
                multiple
                accept=".jpg, .png, .gif, .jpeg"
                disabled={fileLimit}
                {...register("images")}
              />
            </div>
            <Button type="submit">Submit</Button>
            <button type="button" onClick={handleGetValues}>
              Get values
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
}
