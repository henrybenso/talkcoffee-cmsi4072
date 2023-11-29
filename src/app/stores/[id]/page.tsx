import { PrismaStoreType } from "@/app/types";

export default function Page({
  params,
}: {
  params: { store: PrismaStoreType };
}) {
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}
