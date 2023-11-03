"use client";
import Layout from "../../layout";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import validator from "validator";
import { useState } from "react";
import Select from "react-select";

const dineOptions = [
  { value: "CAFE", label: "sit in" },
  { value: "BAR", label: "bar" },
];

const hoursOptions = [{ value: "" }];
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
      message: `${val}: Phone Nubmer is not valid`,
    })
  ),
  // phoneNumber: z.string().regex(new RegExp("^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$")),
  instagramHandle: z.string().optional(),
  avatar: z.string(),
  images: z.array(z.string()),
  serviceTypes: z
    .object({
      sitInEnum: z.array(z.enum(VALUES)),
      takeOut: z.boolean(),
      delivery: z.boolean(),
    })
    .required(),
  serviceHours: z
    .object({
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
    })
    .required(),
});

// const MAX_COUNT = 5;

export default function CreateStore() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  const handleGetValues = () => {
    console.log("Get Values", getValues());
  };

  // const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);

  // const handleUploadFiles = (files) => {
  //   const uploaded = [...uploadedFiles];
  //   let limitExceeded = false;
  //   files.some((file) => {
  //     if (uploaded.findIndex((f) => f.name === file.name) === -1) {
  //       uploaded.push(file);
  //       if (uploaded.length == MAX_COUNT) setFileLimit(true);
  //       if (uploaded.length > MAX_COUNT) {
  //         alert("You can only add a maximum of ${MAX_COUNT} files");
  //         setFileLimit(false);
  //         limitExceeded = true;
  //       }
  //     }
  //   });

  //   if (!limitExceeded) setUploadedFiles(uploaded);
  // };

  // const handleFileEvent = (e) => {
  //   const chosenFiles = Array.prototype.slice.call(e.target.files);
  //   handleUploadFiles(chosenFiles);
  // };

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
            <h1 className="p-5 shrink-0 flex place-content-center text-5xl font-bold text-black">
              add your store ☕
            </h1>
          </section>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Store Name
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => {
                  return (
                    <input
                      className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Blue Bottle Coffee"
                      {...field}
                    />
                  );
                }}
              />
              <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {errors.name?.message && <p>{errors.name?.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Phone Number
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => {
                  return (
                    <input
                      className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      id="phoneNumber"
                      placeholder="(666)-666-6666"
                      {...field}
                    />
                  );
                }}
              />
              <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {errors.phoneNumber?.message && (
                  <p>{errors.phoneNumber?.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Instagram
              </label>
              <Controller
                name="instagramHandle"
                control={control}
                render={({ field }) => {
                  return (
                    <input
                      className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      id="instagramHandle"
                      placeholder="@"
                      {...field}
                    />
                  );
                }}
              />
              <p className="text-sm text-muted-foreground">
                It's not required, but we recommend you include it!
              </p>
              <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {errors.instagram?.message && (
                  <p>{errors.instagram?.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Avatar
              </label>
              <Controller
                name="avatar"
                control={control}
                render={({ field }) => {
                  return (
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
                      {...field}
                    />
                  );
                }}
              />
              <p className="text-sm text-muted-foreground">
                e.g. store logo, company logo, store front
              </p>
              <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {errors.avatar?.message && <p>{errors.avatar?.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Images
              </label>
              <Controller
                name="images"
                control={control}
                render={({ field }) => {
                  return (
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
                      {...field}
                    />
                  );
                }}
              />
              <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {errors.images?.message && <p>{errors.images?.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                What kind of store is it?
              </label>
              <Controller
                name="serviceTypes.shape.sitIn"
                control={control}
                render={({ field }) => (
                  <Select {...field} isMulti options={dineOptions} />
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Is order pickup an option?
              </label>
              <Controller
                name="serviceTypes.shape.takeOut"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: true, label: "Yes" },
                      { value: false, label: "No" },
                    ]}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Is delivery an option?
              </label>
              <Controller
                name="serviceTypes.shape.delivery"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={[
                      { value: true, label: "Yes" },
                      { value: false, label: "No" },
                    ]}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Monday
              </label>
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
