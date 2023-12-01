import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Headerinfo() {
  return (
    <>
      <section>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          back
        </Link>
      </section>
      <section>
        <h1 className="uppercase">Banana Coffee Store</h1>
        <p>This is Banana Coffee Store. Best Coffee Shop in the world.</p>
      </section>
      <section>
        <h2>
          <ul>
            <li>Phone Number: 999-999-9999</li>
            <li>instagram: banana</li>
            <li>service types: banana banana bananna</li>
            <li>service hours: 5:00 - 5:00</li>
          </ul>
        </h2>
      </section>
    </>
  );
}
