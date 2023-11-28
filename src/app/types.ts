interface Days {
    sunday: "SUN",
    monday: "MON",
    tuesday: "TUE",
    wednesday: "WED",
    thursday: "TR",
    friday: "FRI",
    saturday: "SAT",
}

export const Days = {
    sunday: "SUN",
    monday: "MON",
    tuesday: "TUE",
    wednesday: "WED",
    thursday: "TR",
    friday: "FRI",
    saturday: "SAT",
}

export const DineTypes: {
    CAFE: "CAFE";
    BAR: "BAR";
} = {
    CAFE: "CAFE",
    BAR: "BAR",
};

export type DineTypes = (typeof DineTypes)[keyof typeof DineTypes];

// type SitInType = {
//     value: DineTypes
//     label: string
// };

// type OutDineType = {
//     value: boolean
//     label: string
// }

// type HoursType = {
//     open: string
//     close: string
// }

// type ServiceTypesType = {
//     sitIn: SitInType[];
//     takeOut: OutDineType;
//     delivery: OutDineType
//     curbsidePickup: OutDineType;
// };

// type ServiceHoursType = {
//     sunday: HoursType
//     monday: HoursType
//     tuesday: HoursType
//     wednesday: HoursType
//     thursday: HoursType
//     friday: HoursType
//     saturday: HoursType
// }

type FileType = {
    name: string
    lastModified: string
    lastModifiedDate: Date
}

// export type StoreType = {
//     name: string;
//     rating: string;
//     phoneNumber: string;
//     instagramHandle: string;
//     avatar: FileType;
//     // images: [ImagesType]
//     serviceTypes: ServiceTypesType;
//     serviceHours: ServiceHoursType;
//     timezone: string;
// };

type AvatarType = {
    publicId: string
    format: string
    version: string
}


type ServiceTypesType = {
    sitIn: DineTypes[];
    takeOut: boolean
    delivery: boolean
    curbsidePickup: boolean;
};

type ServiceHoursType = {
    day: Days
    open: string
    close: string
}

export type PrismaStoreType = {
    name: string;
    averageRating: number
    ratingCount: number;
    phoneNumber: string;
    instagramHandle: string | undefined;
    avatar: AvatarType;
    // images: [ImagesType]
    serviceTypes: ServiceTypesType;
    serviceHours: ServiceHoursType[];
};