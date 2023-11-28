import fetchFilteredStores from "@/lib/data";
import Layout from "../../app/layout";

export default async function StorePage(query: { query: string }) {
  const stores = await fetchFilteredStores(query);

  return (
    <div>
      <Layout>
        <ol>
          {stores.map((store) => (
            <li>{store.name}</li>
          ))}
        </ol>
      </Layout>
    </div>
  );
}
