import fetchFilteredStores from "@/lib/data";
import Layout from "../../app/layout";

export default async function StoreSideBar(query: { query: string }) {
  const stores = await fetchFilteredStores(query);

  return (
    <div>
      <Layout>
        <div className="results-sidebar">
          <ul>
            {stores.map((store) => (
              <li>{store.name}</li>
            ))}
          </ul>
        </div>
      </Layout>
    </div>
  );
}
