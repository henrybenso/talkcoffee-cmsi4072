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
import { SetStateAction, useState } from "react";
import RatingButton from "./ratingButton";

const dineOptions = [
  { value: "CAFE", label: "sit in" },
  { value: "BAR", label: "bar" },
];

const hoursOptions = [{ value: new Date(), label: "Monday open" }];
const VALUES = ["CAFE", "BAR"] as const;
const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
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

const MAX_COUNT = 5;

// interface IFormValues {
//   "name": string
//   rating: number
//   "phoneNumber": string
  
// }

// type InputProps = {
//   label: Path<IFormValues>
//   register: UseFormRegister<IFormValues>
//   required: boolean
// }

// // The following component is an example of your existing Input Component
// const Input = ({ label, register, required }: InputProps) => (
//   <>
//     <label>{label}</label>
//     <input {...register(label, { required })} />
//   </>
// )

export default function CreateStore() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // const onSubmit = (data) => {
  //   alert(JSON.stringify(data));
  // };

  const [rating, setRating] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length == MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert("You can only add a maximum of ${MAX_COUNT} files");
          setFileLimit(false);
          limitExceeded = true;
        }
      }
    });

    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
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

  async function onSubmit(values: z.infer<typeof schema>) {
    const { name, rating, instagramHandle, avatar, images, serviceTypes } =
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
        avatar,
        images,
        serviceTypes,
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
          href="/stores/create/add-image"
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label>Store Name</label>
              <input {...register("name")} />
              {errors.name?.message && <p>{errors.name?.message}</p>}
            </div>
            {/* <div>
              <Input label="rating" register={register} required />
              <Select
    defaultValue={ratingOptions[1]}
    options={ratingOptions}
    // formatGroupLabel={formatGroupLabel}
  />
            </div> */}
                        <div>
              <label>Rating</label>
              <input {...register("rating")} />
              {errors.rating?.message && <p>{errors.rating?.message}</p>}
            </div>
            <div>
              <label>Instagram</label>
              <input {...register("instagram")} />
              {errors.instagram?.message && <p>{errors.instagram?.message}</p>}
            </div>
            <div>
              <label>Service Types</label>
              <input {...register("servicetypes")} />
              {errors.servicetypes?.message && <p>{errors.servicetypes?.message}</p>}
            </div>
            <div>
            <input
                        id="fileUpload"
                        type="file"
                        multiple
                        accept=".jpg, .png, .gif, .jpeg"
                        disabled={fileLimit}
                      ></input>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </Layout>
    </>
  );
}
