import { z } from 'zod'
import validator from "validator";

const REG = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
export const VALUES = ["CAFE", "BAR"] as const;
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const dineOptions = [
    { value: z.enum(VALUES), label: "sit in" },
    { value: z.enum(VALUES), label: "bar" },
];

export const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    rating: z.string(),
    //   rating: ratingToNumber,
    // rating: z.string().transform((val, ctx) => {
    //   const parsed = parseInt(val);
    //   if (isNaN(parsed)) {
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: "Not a number",
    //     });
    //     return z.NEVER;
    //   }
    //   if (parsed < 1 || parsed > 5) {
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: "Number is less than 1 or larger than 5",
    //     });
    //     return z.NEVER;
    //   }
    //   return parsed;
    // }),
    phoneNumber: z.string().refine(
        (val) => validator.isMobilePhone(val),
        (val) => ({
            message: `${val}: Phone Nubmer is not valid`,
        })
    ),
    // phoneNumber: z.string().regex(new RegExp("^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$")),
    instagramHandle: z.string().optional(),
    avatar: z.any().refine((files) => files?.length == 1, "Image is required.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .gif files are accepted."
        ),
    images: z.any().refine((files) => files?.length >= 5, "Minimum 5 required.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .gif files are accepted."
        ),
    serviceTypes: z.object({
        sitIn: z.array(
            z.object({
                label: z.string(),
                value: z.enum(VALUES),
            })
        ),
        takeOut: z.object({
            label: z.string(),
            value: z.boolean(),
        }),
        delivery: z.object({
            label: z.string(),
            value: z.boolean(),
        }),
        curbsidePickup: z.object({
            label: z.string(),
            value: z.boolean(),
        }),
    }),
    serviceHours: z.object({
        sunday: z.object({
            open: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
            close: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
        }),
        // .refine(
        //   (data) =>
        //     data.open !== "" && data.close !== "" && data.open === data.close,
        //   {
        //     message: "Times cannot be the same value!",
        //     path: ["sunday"],
        //     params: { open: "Times cannot be the same value!" },
        //   }
        // ),
        monday: z.object({
            open: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
            close: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
        }),
        // .refine((data) => data.open !== "" && data.open === data.close, {
        //   message: "Times cannot be the same value!",
        // })
        tuesday: z.object({
            open: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
            close: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
        }),
        // .refine((data) => data.open !== "" && data.open === data.close, {
        //   message: "Times cannot be the same value!",
        // })
        wednesday: z.object({
            open: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
            close: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
        }),
        // .refine((data) => data.open !== "" && data.open === data.close, {
        //   message: "Times cannot be the same value!",
        // })
        thursday: z.object({
            open: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
            close: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
        }),
        // .refine((data) => data.open !== "" && data.open === data.close, {
        //   message: "Times cannot be the same value!",
        // })
        friday: z.object({
            open: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
            close: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
        }),
        // .refine((data) => data.open !== "" && data.open === data.close, {
        //   message: "Times cannot be the same value!",
        // })
        saturday: z.object({
            open: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
            close: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
        }),
        // .refine((data) => data.open !== "" && data.open === data.close, {
        //   message: "Times cannot be the same value!",
        // })
    }),
});

export const schemaStoreBackend = z.object({
    name: z.string().min(1, { message: "Required" }),
    rating: z.string(),
    //   rating: ratingToNumber,
    // rating: z.string().transform((val, ctx) => {
    //   const parsed = parseInt(val);
    //   if (isNaN(parsed)) {
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: "Not a number",
    //     });
    //     return z.NEVER;
    //   }
    //   if (parsed < 1 || parsed > 5) {
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: "Number is less than 1 or larger than 5",
    //     });
    //     return z.NEVER;
    //   }
    //   return parsed;
    // }),
    phoneNumber: z.string().refine(
        (val) => validator.isMobilePhone(val),
        (val) => ({
            message: `${val}: Phone Nubmer is not valid`,
        })
    ),
    // phoneNumber: z.string().regex(new RegExp("^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$")),
    instagramHandle: z.string().optional(),
    serviceTypes: z.object({
        sitIn: z.array(
            z.object({
                label: z.string(),
                value: z.enum(VALUES),
            })
        ),
        takeOut: z.object({
            label: z.string(),
            value: z.boolean(),
        }),
        delivery: z.object({
            label: z.string(),
            value: z.boolean(),
        }),
        curbsidePickup: z.object({
            label: z.string(),
            value: z.boolean(),
        }),
    }),
    serviceHours: z.object({
        sunday: z.object({
            open: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
            close: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
        }),
        // .refine(
        //   (data) =>
        //     data.open !== "" && data.close !== "" && data.open === data.close,
        //   {
        //     message: "Times cannot be the same value!",
        //     path: ["sunday"],
        //     params: { open: "Times cannot be the same value!" },
        //   }
        // ),
        monday: z.object({
            open: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
            close: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
        }),
        // .refine((data) => data.open !== "" && data.open === data.close, {
        //   message: "Times cannot be the same value!",
        // })
        tuesday: z.object({
            open: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
            close: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
        }),
        // .refine((data) => data.open !== "" && data.open === data.close, {
        //   message: "Times cannot be the same value!",
        // })
        wednesday: z.object({
            open: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
            close: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
        }),
        // .refine((data) => data.open !== "" && data.open === data.close, {
        //   message: "Times cannot be the same value!",
        // })
        thursday: z.object({
            open: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
            close: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
        }),
        // .refine((data) => data.open !== "" && data.open === data.close, {
        //   message: "Times cannot be the same value!",
        // })
        friday: z.object({
            open: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
            close: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
        }),
        // .refine((data) => data.open !== "" && data.open === data.close, {
        //   message: "Times cannot be the same value!",
        // })
        saturday: z.object({
            open: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
            close: z.union([z.string().length(0), z.string().regex(new RegExp(REG))]),
        }),
        // .refine((data) => data.open !== "" && data.open === data.close, {
        //   message: "Times cannot be the same value!",
        // })
    }),
});