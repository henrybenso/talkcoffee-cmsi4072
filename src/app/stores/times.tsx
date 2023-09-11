"use client";
export interface timeOptions {
  readonly value: Date;
  readonly label: string;
}

export const timeOptions: readonly timeOptions[] = [
  { value: new Date(0o00, 0o0, 0o0, 0o0, 0o0, 0o0, 0o0), label: "12:00 AM" },
  { value: new Date(0o00, 0o0, 0o0, 0o0, 30, 0o0, 0o0), label: "12:30 AM" },
  { value: new Date(0o00, 0o0, 0o0, 1, 0o0, 0o0, 0o0), label: "01:00 AM" },
  //   { value: 3.5, label: "3" },
  //   { value: 3, label: "3" },
  //   { value: 2.5, label: "2.5" },
  //   { value: 2, label: "2" },
  //   { value: 1.5, label: "1.5" },
  //   { value: 1, label: "1" },
  //   { value: 0.5, label: "0.5" },
  //   { value: 0, label: "0" },
];
