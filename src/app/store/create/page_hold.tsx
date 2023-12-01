// "use client";
// import Layout from "../../layout";
// import Link from "next/link";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { buttonVariants } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ratingOptions } from "./ratings";
// import { useForm, Controller } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import Select from "react-select";
// import validator from "validator";
// import { SetStateAction, useState } from "react";
// import RatingButton from "./ratingButton";

// const dineOptions = [
//   { value: "CAFE", label: "sit in" },
//   { value: "BAR", label: "bar" },
// ];

// const hoursOptions = [{ value: new Date(), label: "Monday open" }];
// const VALUES = ["CAFE", "BAR"] as const;
// const formSchema = z.object({
//   name: z.string(),
//   rating: z.number({ required_error: "A rating is required." }).gte(1).lte(5),
//   phoneNumber: z.string().refine(validator.isMobilePhone).optional(),
//   instagramHandle: z.string().optional(),
//   avatar: z.string().optional(),
//   images: z.array(z.string()),
//   serviceTypes: z
//     .object({
//       sitInEnum: z.enum(VALUES),
//       takeOut: z.boolean(),
//       delivery: z.boolean(),
//     })
//     .required(),
//   serviceHours: z.object({
//     mondayOpen: z.date(),
//     mondayClose: z.date(),
//     tuesdayOpen: z.date(),
//     tuesdayClose: z.date(),
//     wednesdayOpen: z.date(),
//     wednesdayClose: z.date(),
//     thursdayOpen: z.date(),
//     thursdayClose: z.date(),
//     fridayOpen: z.date(),
//     fridayClose: z.date(),
//     saturdayOpen: z.date(),
//     saturdayClose: z.date(),
//     sundayOpen: z.date(),
//     sundayClose: z.date(),
//   }),
// });

// const MAX_COUNT = 5;

// export default function CreateStore() {
//   // const [value, setValue] = useState<string>();
//   // const [country, setCountry] = useState<string>();

//   const [rating, setRating] = useState(0);
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [fileLimit, setFileLimit] = useState(false);

//   const handleUploadFiles = (files) => {
//     const uploaded = [...uploadedFiles];
//     let limitExceeded = false;
//     files.some((file) => {
//       if (uploaded.findIndex((f) => f.name === file.name) === -1) {
//         uploaded.push(file);
//         if (uploaded.length == MAX_COUNT) setFileLimit(true);
//         if (uploaded.length > MAX_COUNT) {
//           alert("You can only add a maximum of ${MAX_COUNT} files");
//           setFileLimit(false);
//           limitExceeded = true;
//         }
//       }
//     });

//     if (!limitExceeded) setUploadedFiles(uploaded);
//   };

//   const handleFileEvent = (e) => {
//     const chosenFiles = Array.prototype.slice.call(e.target.files);
//     handleUploadFiles(chosenFiles);
//   };

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       rating: undefined,
//       phoneNumber: "",
//       instagramHandle: "",
//       avatar: "",
//       images: [],
//       serviceTypes: {
//         sitInEnum: "CAFE",
//         takeOut: false,
//         delivery: false,
//       },
//       serviceHours: {
//         mondayOpen: new Date(),
//         mondayClose: new Date(),
//         tuesdayOpen: new Date(),
//         tuesdayClose: new Date(),
//         wednesdayOpen: new Date(),
//         wednesdayClose: new Date(),
//         thursdayOpen: new Date(),
//         thursdayClose: new Date(),
//         fridayOpen: new Date(),
//         fridayClose: new Date(),
//         saturdayOpen: new Date(),
//         saturdayClose: new Date(),
//         sundayOpen: new Date(),
//         sundayClose: new Date(),
//       },
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     const { name, rating, instagramHandle, avatar, images, serviceTypes } =
//       values;

//     const res = await fetch("http://localhost:3000/api/store", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         rating,
//         instagramHandle,
//         avatar,
//         images,
//         serviceTypes,
//       }),
//     });

//     const data = await res.json();
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
//         <div>
//           <section></section>
//         </div>
//         <div className="grid place-content-center">
//           <section>
//             <div>
//               Are you are store owner? If so,
//               <Link className="ml-2" href="/stores/createByOwner">
//                 <Button>Click Here!</Button>
//               </Link>
//             </div>
//             <h1 className="p-5 shrink-0 flex place-content-center text-5xl font-bold text-black">
//               add a store ☕
//             </h1>
//           </section>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Store Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="" {...field} />
//                     </FormControl>
//                     <FormDescription></FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* <Controller
//                 name="rating"
//                 control={form.control}
//                 rules={{ required: true }}
//                 render={({ field }) => <RatingButton {...field} />}
//               /> */}
//               <FormField
//                 control={form.control}
//                 name="rating"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Rating ⭐</FormLabel>
//                     <FormControl>
//                       <div className="space-x-4">
//                         <RatingButton onButtonClicked={setRating(...field)} />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="instagramHandle"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Instagram Handle</FormLabel>
//                     <FormControl>
//                       <Input placeholder="@" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormLabel>Store Type</FormLabel>
//               <Controller
//                 name="serviceTypes.sitInEnum"
//                 render={({ field }) => (
//                   <Select
//                     {...field}
//                     options={[
//                       { value: "CAFE", label: "sit in" },
//                       { value: "BAR", label: "bar" },
//                     ]}
//                   />
//                 )}
//                 control={form.control}
//               />
//               <FormField
//                 control={form.control}
//                 name="images"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Upload Images</FormLabel>
//                     <FormControl>
//                       <input
//                         id="fileUpload"
//                         type="file"
//                         multiple
//                         accept=".jpg, .png, .gif, .jpeg"
//                         disabled={fileLimit}
//                       ></input>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit">Submit</Button>
//             </form>
//           </Form>
//         </div>
//       </Layout>
//     </>
//   );
// }
