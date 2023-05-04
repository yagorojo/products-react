import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../components/common/Product";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="bg-white grow">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-300 uppercase tracking-wide">
          All products
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products &&
            products.map((item) => <Product key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
}
