"use client";

import Layout from "../../layout";
import Link from "next/link";
import Router from "next/router";
import validator from "validator";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import { VALUES, schema } from "@/app/validation";

interface Days {
  sunday: "SUN";
  monday: "MON";
  tuesday: "TUE";
  wednesday: "WED";
  thursday: "TR";
  friday: "FRI";
  saturday: "SAT";
}
export const Days = {
  sunday: "SUN",
  monday: "MON",
  tuesday: "TUE",
  wednesday: "WED",
  thursday: "TR",
  friday: "FRI",
  saturday: "SAT",
};

enum sitInValue {
  cafe = "CAFE",
  bar = "BAR",
}
const dineOptions = [
  { value: "CAFE", label: "sit in" },
  { value: "BAR", label: "bar" },
];

export default function CreateStore() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      rating: "5",
      phoneNumber: "",
      instagramHandle: "",
      avatar: "",
      // images: {},
      serviceTypes: {
        sitIn: [dineOptions[0]],
        takeOut: { value: false, label: "No" },
        delivery: { value: false, label: "No" },
        curbsidePickup: { value: false, label: "No" },
      },
      serviceHours: {
        sunday: {
          open: "",
          close: "",
        },
        monday: {
          open: "",
          close: "",
        },
        tuesday: {
          open: "",
          close: "",
        },
        wednesday: {
          open: "",
          close: "",
        },
        thursday: {
          open: "",
          close: "",
        },
        friday: {
          open: "",
          close: "",
        },
        saturday: {
          open: "",
          close: "",
        },
      },
    },
  });

  // const [uploadedFiles, setUploadedFiles] = useState();
  const [imageUploaded, setImageUploaded] = useState();
  // const [fileLimit, setFileLimit] = useState(false);
  const selectUniqueId = Date.now().toString();

  const handleChange = (event) => {
    setImageUploaded(event.target.files[0]);
    console.log(imageUploaded);
  };

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
  //   const chosenFiles = Array.prototype.slice.call(e.target.files[0]);
  //   // console.log(chosenFiles);
  //   // handleUploadFiles(chosenFiles);
  // };

  const handleGetValues = () => {
    console.log("Get Values", getValues());
  };

  const _onSubmit = (data: any) => {
    // alert(JSON.stringify(data));
    console.log(data);
  };

  async function submitForm(values: z.infer<typeof schema>) {
    // if (!imageUploaded) {
    //   return;
    // }
    console.log("HI");
    const {
      name,
      rating,
      phoneNumber,
      instagramHandle,
      avatar,
      // images,
      serviceTypes,
      serviceHours,
    } = values;

    // let newValues = {
    //   name: name,
    //   rating: rating,
    //   phoneNumber: phoneNumber,
    //   instagramHandle: instagramHandle,
    //   serviceTypes: serviceTypes,
    //   serviceHours: serviceHours,
    // };

    console.log("no");

    const formData = new FormData();
    console.log(avatar[0]);
    formData.append("avatar", avatar[0]);
    // formData.append("avatar", imageUploaded);
    values = { ...values, avatar: avatar[0].name };
    formData.append("store", JSON.stringify(values));

    // console.log(formData.values());
    // for (const value of formData.values()) [console.log(value)];
    const res = await fetch("http://localhost:3000/api/store", {
      method: "POST",
      body: formData,
    });
    console.log("banana");
    // console.log(res);
    const result = await res.json();
    console.log(result);
  }

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
          <form onSubmit={handleSubmit(submitForm)} className="space-y-8">
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
                Rating ⭐
              </label>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => {
                  return (
                    <select
                      className="flex h-10 w-2/12 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                  );
                }}
              />
              <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {errors.rating?.message && <p>{errors.rating?.message}</p>}
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
                {errors.instagramHandle?.message && (
                  <p>{errors.instagramHandle?.message}</p>
                )}
              </div>
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
              <p className="text-sm text-muted-foreground">
                e.g. store logo, company logo, store front
              </p>
              <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {errors.avatar?.message && <p>{errors.avatar?.message}</p>}
              </div>
            </div>

            {/* <div className="space-y-2">
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
                name="images"
                // onChange={handleFileEvent}
              />
              <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {errors.images?.message && <p>{errors.images?.message}</p>}
              </div>
            </div> */}

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                What kind of store is it?
              </label>
              <Controller
                name="serviceTypes.sitIn"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={dineOptions}
                    instanceId={selectUniqueId}
                  />
                )}
              />
              {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {errors.sitIn?.message && <p>{errors.sitIn?.message}</p>}
              </div> */}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Pickup
              </label>
              <Controller
                name="serviceTypes.takeOut"
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
                Delivery
              </label>
              <Controller
                name="serviceTypes.delivery"
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
                Curbside Pickup
              </label>
              <Controller
                name="serviceTypes.curbsidePickup"
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
                Sunday
              </label>
              <Controller
                name="serviceHours.sunday.open"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Open
                    </label>
                    <input
                      className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="time"
                      {...field}
                    />
                  </div>
                )}
              />
              {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {errors.sunday?.open?.message && (
                  <p>{errors.sunday?.open?.message}</p>
                )}
              </div> */}
              <Controller
                name="serviceHours.sunday.close"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Close
                    </label>
                    <input
                      className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="time"
                      {...field}
                    />
                  </div>
                )}
              />
              {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {errors.sunday?.close?.message && (
                  <p>{errors.sunday?.close?.message}</p>
                )}
              </div> */}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Monday
              </label>
              <Controller
                name="serviceHours.monday.open"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Open
                    </label>
                    <input
                      className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="time"
                      {...field}
                    />
                  </div>
                )}
              />
              {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {errors.monday?.open?.message && (
                  <p>{errors.monday?.open?.message}</p>
                )}
              </div> */}
              <Controller
                name="serviceHours.monday.close"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Close
                    </label>
                    <input
                      className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="time"
                      {...field}
                    />
                  </div>
                )}
              />
              {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {errors.monday?.close?.message && (
                  <p>{errors.monday?.close?.message}</p>
                )}
              </div> */}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Tuesday
              </label>
              <Controller
                name="serviceHours.tuesday.open"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Open
                    </label>
                    <input
                      className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="time"
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                name="serviceHours.tuesday.close"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Close
                    </label>
                    <input
                      className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="time"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Wednesday
              </label>
              <Controller
                name="serviceHours.wednesday.open"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Open
                    </label>
                    <input
                      className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="time"
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                name="serviceHours.wednesday.close"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Close
                    </label>
                    <input
                      className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="time"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Thursday
              </label>
              <Controller
                name="serviceHours.thursday.open"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Open
                    </label>
                    <input
                      className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="time"
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                name="serviceHours.thursday.close"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Close
                    </label>
                    <input
                      className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="time"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Friday
              </label>
              <Controller
                name="serviceHours.friday.open"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Open
                    </label>
                    <input
                      className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="time"
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                name="serviceHours.friday.close"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Close
                    </label>
                    <input
                      className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="time"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Saturday
              </label>
              <Controller
                name="serviceHours.saturday.open"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Open
                    </label>
                    <input
                      className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="time"
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                name="serviceHours.saturday.close"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Close
                    </label>
                    <input
                      className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="time"
                      {...field}
                    />
                  </div>
                )}
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

//////////////////////////////////////////////////////////////////////// "use client";

// import Layout from "../../layout";
// import Link from "next/link";
// import Router from "next/router";
// import validator from "validator";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { buttonVariants } from "@/components/ui/button";
// import { Controller, useForm } from "react-hook-form";
// import { useState } from "react";
// import Select from "react-select";
// import { VALUES, schema } from "@/app/validation";

// interface Days {
//   sunday: "SUN";
//   monday: "MON";
//   tuesday: "TUE";
//   wednesday: "WED";
//   thursday: "TR";
//   friday: "FRI";
//   saturday: "SAT";
// }
// export const Days = {
//   sunday: "SUN",
//   monday: "MON",
//   tuesday: "TUE",
//   wednesday: "WED",
//   thursday: "TR",
//   friday: "FRI",
//   saturday: "SAT",
// };

// enum sitInValue {
//   cafe = "CAFE",
//   bar = "BAR",
// }
// const dineOptions = [
//   { value: "CAFE", label: "sit in" },
//   { value: "BAR", label: "bar" },
// ];

// export default function CreateStore() {
//   // const {
//   //   register,
//   //   control,
//   //   handleSubmit,
//   //   formState: { errors },
//   //   getValues,
//   // } = useForm({
//   //   resolver: zodResolver(schema),
//   //   defaultValues: {
//   //     name: "",
//   //     rating: "5",
//   //     phoneNumber: "",
//   //     instagramHandle: "",
//   //     avatar: "",
//   //     // images: {},
//   //     serviceTypes: {
//   //       sitIn: [dineOptions[0]],
//   //       takeOut: { value: false, label: "No" },
//   //       delivery: { value: false, label: "No" },
//   //       curbsidePickup: { value: false, label: "No" },
//   //     },
//   //     serviceHours: {
//   //       sunday: {
//   //         open: "",
//   //         close: "",
//   //       },
//   //       monday: {
//   //         open: "",
//   //         close: "",
//   //       },
//   //       tuesday: {
//   //         open: "",
//   //         close: "",
//   //       },
//   //       wednesday: {
//   //         open: "",
//   //         close: "",
//   //       },
//   //       thursday: {
//   //         open: "",
//   //         close: "",
//   //       },
//   //       friday: {
//   //         open: "",
//   //         close: "",
//   //       },
//   //       saturday: {
//   //         open: "",
//   //         close: "",
//   //       },
//   //     },
//   //   },
//   // });

//   // const [uploadedFiles, setUploadedFiles] = useState();
//   const [imageUploaded, setImageUploaded] = useState();
//   // const [fileLimit, setFileLimit] = useState(false);
//   const selectUniqueId = Date.now().toString();

//   const handleChange = (event) => {
//     setImageUploaded(event.target.files[0]);
//     console.log(imageUploaded);
//   };

//   // const handleUploadFiles = (files) => {
//   //   const uploaded = [...uploadedFiles];
//   //   let limitExceeded = false;
//   //   files.some((file) => {
//   //     if (uploaded.findIndex((f) => f.name === file.name) === -1) {
//   //       uploaded.push(file);
//   //       if (uploaded.length == MAX_COUNT) setFileLimit(true);
//   //       if (uploaded.length > MAX_COUNT) {
//   //         alert("You can only add a maximum of ${MAX_COUNT} files");
//   //         setFileLimit(false);
//   //         limitExceeded = true;
//   //       }
//   //     }
//   //   });

//   //   if (!limitExceeded) setUploadedFiles(uploaded);
//   // };

//   // const handleFileEvent = (e) => {
//   //   const chosenFiles = Array.prototype.slice.call(e.target.files[0]);
//   //   // console.log(chosenFiles);
//   //   // handleUploadFiles(chosenFiles);
//   // };

//   // const handleGetValues = () => {
//   //   console.log("Get Values", getValues());
//   // };

//   const _onSubmit = (event) => {
//     event.preventDefault();
//     // alert(JSON.stringify(data));
//     console.log(event.currentTarget);
//   };

//   async function submitForm(e) {
//     e.preventDefault();
//     // if (!imageUploaded) {
//     //   return;
//     // }

//     const form = new FormData(e.currentTarget);
//     const name = form.get("name");
//     const rating = form.get("rating");
//     const phoneNumber = form.get("phoneNumber");
//     const instagramHandle = form.get("instagramHandle");
//     const avatar = form.get("avatar");
//     const serviceTypes = form.get("serviceTypes");
//     const serviceHours = form.get("serviceHours");
//     console.log({
//       name,
//       rating,
//       phoneNumber,
//       instagramHandle,
//       avatar,
//       serviceTypes,
//       serviceHours,
//     });
//     console.log(avatar[0]);
//     // formData.append("avatar", avatar[0]);
//     // // formData.append("avatar", imageUploaded);
//     // values = { ...values, avatar: avatar[0].name };
//     // formData.append("store", JSON.stringify(values));

//     // console.log(formData.values());
//     // for (const value of formData.values()) [console.log(value)];
//     const res = await fetch("http://localhost:3000/api/store", {
//       method: "POST",
//       body: formData,
//     });
//     console.log("banana");
//     // console.log(res);
//     const result = await res.json();
//     console.log(result);
//   }

//   return (
//     <>
//       <Layout>
//         <Link href="/" className={buttonVariants({ variant: "outline" })}>
//           Back
//         </Link>
//         <Link
//           href="/stores/create/add-image"
//           className={buttonVariants({ variant: "outline" })}
//         >
//           image upload button
//         </Link>
//         <div className="grid place-content-center">
//           <section>
//             <h1 className="p-5 shrink-0 flex place-content-center text-5xl font-bold text-black">
//               add your store ☕
//             </h1>
//           </section>
//           <form onSubmit={submitForm} className="space-y-8">
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Store Name
//               </label>
//               <input
//                 className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                 type="text"
//                 placeholder="Blue Bottle Coffee"
//                 name="name"
//               />
//               {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 {errors.name?.message && <p>{errors.name?.message}</p>}
//               </div> */}
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Rating ⭐
//               </label>
//               <select
//                 name="rating"
//                 className="flex h-10 w-2/12 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 <option value="5">5</option>
//                 <option value="4">4</option>
//                 <option value="3">3</option>
//                 <option value="2">2</option>
//                 <option value="1">1</option>
//               </select>
//               {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 {errors.rating?.message && <p>{errors.rating?.message}</p>}
//               </div> */}
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Phone Number
//               </label>
//               <input
//                 className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                 type="text"
//                 id="phoneNumber"
//                 placeholder="(666)-666-6666"
//                 name="phoneNumber"
//               />
//               {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 {errors.phoneNumber?.message && (
//                   <p>{errors.phoneNumber?.message}</p>
//                 )}
//               </div> */}
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Instagram
//               </label>
//               <input
//                 className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                 type="text"
//                 id="instagramHandle"
//                 placeholder="@"
//                 name="instagramHandle"
//               />
//               {/* <p className="text-sm text-muted-foreground">
//                 It's not required, but we recommend you include it!
//               </p> */}
//               {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 {errors.instagramHandle?.message && (
//                   <p>{errors.instagramHandle?.message}</p>
//                 )}
//               </div> */}
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Avatar
//               </label>
//               <input
//                 className="block w-full text-sm text-slate-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-full file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-violet-50 file:bg-transparent
//                 hover:file:bg-violet-100"
//                 id="avatar"
//                 type="file"
//                 accept=".jpg, .png, .gif, .jpeg"
//                 name="avatar"
//                 onChange={handleChange}
//               />
//               <p className="text-sm text-muted-foreground">
//                 e.g. store logo, company logo, store front
//               </p>
//               {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 {errors.avatar?.message && <p>{errors.avatar?.message}</p>}
//               </div> */}
//             </div>
//             {/* <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Images
//               </label>
//               <input
//                 className="block w-full text-sm text-slate-500
// file:mr-4 file:py-2 file:px-4
// file:rounded-full file:border-0
// file:text-sm file:font-semibold
// file:bg-violet-50 file:bg-transparent
// hover:file:bg-violet-100"
//                 id="images"
//                 type="file"
//                 multiple
//                 accept=".jpg, .png, .gif, .jpeg"
//                 disabled={fileLimit}
//                 {...register("images")}
//                 name="images"
//                 // onChange={handleFileEvent}
//               />
//               <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 {errors.images?.message && <p>{errors.images?.message}</p>}
//               </div>
//             </div> */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 What kind of store is it?
//               </label>
//               <Select
//                 name="serviceTypessitIn"
//                 isMulti
//                 options={dineOptions}
//                 instanceId={selectUniqueId}
//               />
//               {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 {errors.sitIn?.message && <p>{errors.sitIn?.message}</p>}
//               </div> */}
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Pickup
//               </label>
//               <Select
//                 name="serviceTypespickup"
//                 options={[
//                   { value: true, label: "Yes" },
//                   { value: false, label: "No" },
//                 ]}
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Delivery
//               </label>
//               <Select
//                 name="serviceTypesdelivery"
//                 options={[
//                   { value: true, label: "Yes" },
//                   { value: false, label: "No" },
//                 ]}
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Curbside Pickup
//               </label>
//               <Select
//                 name="serviceTypescurbsidePickup"
//                 options={[
//                   { value: true, label: "Yes" },
//                   { value: false, label: "No" },
//                 ]}
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Sunday
//               </label>
//               <div>
//                 <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Open
//                 </label>
//                 <input
//                   name="serviceHourssunday.open"
//                   className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                   type="time"
//                 />
//               </div>
//               {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 {errors.sunday?.open?.message && (
//                   <p>{errors.sunday?.open?.message}</p>
//                 )}
//               </div> */}
//               <div>
//                 <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Close
//                 </label>
//                 <input
//                   className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                   type="time"
//                   name="serviceHourssunday.close"
//                 />
//               </div>
//               {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 {errors.sunday?.close?.message && (
//                   <p>{errors.sunday?.close?.message}</p>
//                 )}
//               </div> */}
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Monday
//               </label>
//               <div>
//                 <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Open
//                 </label>
//                 <input
//                   className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                   type="time"
//                   name="serviceHours.monday.open"
//                 />
//               </div>
//               {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 {errors.monday?.open?.message && (
//                   <p>{errors.monday?.open?.message}</p>
//                 )}
//               </div> */}
//               <div>
//                 <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Close
//                 </label>
//                 <input
//                   className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                   type="time"
//                   name="serviceHours.monday.close"
//                 />
//               </div>
//               {/* <div className="text-destructive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 {errors.monday?.close?.message && (
//                   <p>{errors.monday?.close?.message}</p>
//                 )}
//               </div> */}
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Tuesday
//               </label>

//               <div>
//                 <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Open
//                 </label>
//                 <input
//                   className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                   type="time"
//                   name="serviceHours.tuesday.open"
//                 />
//               </div>
//               <div>
//                 <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Close
//                 </label>
//                 <input
//                   className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                   type="time"
//                   name="serviceHours.tuesday.close"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Wednesday
//               </label>
//               <div>
//                 <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Open
//                 </label>
//                 <input
//                   className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                   type="time"
//                   name="serviceHours.wednesday.open"
//                 />
//               </div>
//               <div>
//                 <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Close
//                 </label>
//                 <input
//                   className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                   type="time"
//                   name="serviceHours.wednesday.close"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Thursday
//               </label>
//               <div>
//                 <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Open
//                 </label>
//                 <input
//                   className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                   type="time"
//                   name="serviceHours.thursday.open"
//                 />
//               </div>
//               <div>
//                 <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Close
//                 </label>
//                 <input
//                   className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                   type="time"
//                   name="serviceHours.thursday.close"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Friday
//               </label>
//               <div>
//                 <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Open
//                 </label>
//                 <input
//                   className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                   type="time"
//                   name="serviceHours.friday.open"
//                 />
//               </div>
//               <div>
//                 <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Close
//                 </label>
//                 <input
//                   className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                   type="time"
//                   name="serviceHours.friday.close"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Saturday
//               </label>
//               <div>
//                 <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Open
//                 </label>
//                 <input
//                   className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                   type="time"
//                   name="serviceHours.saturday.open"
//                 />
//               </div>
//               <div>
//                 <label className="pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Close
//                 </label>
//                 <input
//                   className="h-10 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                   type="time"
//                   name="serviceHours.saturday.close"
//                 />
//               </div>
//             </div>
//             <Button type="submit">Submit</Button>
//             {/* <button type="button" onClick={handleGetValues}> */}
//             Get values
//             {/* </button> */}
//           </form>
//         </div>
//       </Layout>
//     </>
//   );
// }
