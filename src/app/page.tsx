import { Metadata } from "next";
import Home from "./home/page";

export const metadata: Metadata = {
  title: "Welcome to TalkCoffee!",
  description: "A website for finding craft coffee.",
};

export default function App() {
  return <Home />;
}
