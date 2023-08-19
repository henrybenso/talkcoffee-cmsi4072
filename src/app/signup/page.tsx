import Layout from "../layout";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(50),
  hashedPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      hashedPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, username, hashedPassword } = values;
    const res = await fetch("http://localhost:3000/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, hashedPassword }),
    });

    const data = await res.json();
  }

  return (
    <>
      <Layout>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Back
        </Link>
        <div className="grid place-content-center">
          <section>
            <h1 className="p-5 shrink-0 flex place-content-center text-5xl font-bold text-black">
              welcome to signup
            </h1>
          </section>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="CoffeeAddict1" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="coffeeaddict1@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hashedPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="" {...field} />
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

// return (
//   <Layout>
//     <>
//       <section className="">
//         <Link href="/" className={buttonVariants({ variant: "outline" })}>
//           Back
//         </Link>
//       </section>
//       <div className="grid place-content-center">
//         <section>
//           <h1 className="p-5 shrink-0 flex place-content-center text-5xl font-bold text-black">
//             welcome to login
//           </h1>
//         </section>
//         <br />
//         <section>
//           <h2>
//             <form>
//               <label className="block">
//                 <span className="block text-sm font-medium text-slate-700">
//                   Email
//                 </span>
//                 <input
//                   type="email"
//                   className="peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
//     focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
//     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
//     invalid:border-pink-500 invalid:text-pink-600
//     focus:invalid:border-pink-500 focus:invalid:ring-pink-500
//   "
//                 />
//                 <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
//                   Please provide a valid email address.
//                 </p>
//               </label>
//             </form>
//             <form>
//               <label className="block">
//                 <span className="block text-sm font-medium text-slate-700">
//                   Username
//                 </span>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
//     focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
//     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
//     invalid:border-pink-500 invalid:text-pink-600
//     focus:invalid:border-pink-500 focus:invalid:ring-pink-500
//   "
//                 />
//               </label>
//             </form>
//             <br />
//             <form>
//               <label className="block">
//                 <span className="block text-sm font-medium text-slate-700">
//                   Password
//                 </span>
//                 <input
//                   type="password"
//                   className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
//     focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
//     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
//     invalid:border-pink-500 invalid:text-pink-600
//     focus:invalid:border-pink-500 focus:invalid:ring-pink-500
//   "
//                 />
//               </label>
//             </form>
//           </h2>
//         </section>
//       </div>
//     </>
//   </Layout>
// );
