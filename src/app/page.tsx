import { getCurrentSession } from "@/actions/auth";
import { getAllProducts } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

const Home = async() => {
  const {user} = await getCurrentSession()
  const products = await getAllProducts()
  return (
   <div>
    Home
   </div>
  );
}

export default Home;
