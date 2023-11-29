import { PrismaStoreType } from "../types";

export default function Results({
  params,
}: {
  params: {
    stores: PrismaStoreType[];
  };
}) {
  return (
    <div>
      <h1>Your Search Results: for {params.query}</h1>
      <ul className="w-full">
        {Object.keys(params.stores).map((store) => (
          <li
            key={params.stores[store].name}
            className="text-sm pl-10 p-3 border black-black"
          >
            {params.stores[store].name}
          </li>
        ))}
      </ul>
    </div>
  );
}
