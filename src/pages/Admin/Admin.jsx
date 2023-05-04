import { useEffect, useState } from "react";
import { authAxios, regularAxios } from "../../utils/axiosAuth";
import Modal from "../../components/common/Modal";
import ProductForm from "./ProductForm";

export default function Admin() {
  const [products, setProducts] = useState();
  const [formData, setFormData] = useState({});
  const [brands, setBrands] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const getProducts = async () => {
    regularAxios
      .get("products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getBrands = async () => {
    regularAxios
      .get("brands")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getProducts();
    getBrands();
  }, []);

  const handleDelete = (id) => {
    authAxios
      .delete(`/products/${id}`)
      .then(() => {
        setProducts((prevState) =>
          prevState.filter((product) => product.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const filteredArray = () => {
    return products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="container grow px-4 py-2 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <h1 className="text-2xl py-4 border-b mb-5">Products</h1>

      <div className="mb-4 flex justify-between items-center">
        <div className="flex-1 pr-4">
          <div className="relative md:w-1/3">
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              placeholder="Search..."
            />
            <div className="absolute top-0 left-0 inline-flex items-center p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-400"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              setFormData({});
              setIsOpen(true);
            }}
            className="inline-flex items-center justify-center h-12 px-6 tracking-wide text-indigo-800 hover:text-emerald-300 font-bold transition duration-200 rounded shadow-md bg-emerald-300 hover:bg-indigo-800 focus:shadow-outline focus:outline-none"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="rounded-lg shadow">
        <table className="items-center w-full border-collapse ">
          <thead>
            <tr className="bg-gray-100 font-bold text-gray-500 text-left">
              <th className="p-4 tracking-wider uppercase text-xs align-middle text-start whitespace-nowrap">
                Name
              </th>
              <th className="p-4 tracking-wider uppercase text-xs align-middle text-start whitespace-nowrap">
                Brand
              </th>
              <th className="p-4 tracking-wider uppercase text-xs align-middle text-start whitespace-nowrap">
                Price
              </th>
              <th className="p-4 tracking-wider uppercase text-xs align-middle text-center whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products &&
              filteredArray().map((row) => (
                <tr key={row.id}>
                  <td className="border-dashed border-t border-gray-200 text-xs whitespace-nowrap p-4">
                    {row.name}
                  </td>
                  <td className="border-dashed border-t border-gray-200 text-xs whitespace-nowrap p-4">
                    {row.brand.name}
                  </td>
                  <td className="border-dashed border-t border-gray-200 text-xs whitespace-nowrap p-4">
                    {row.price}
                  </td>
                  <td className="border-dashed border-t border-gray-200 text-xs whitespace-nowrap p-4">
                    <div className="flex item-center justify-center">
                      <button
                        onClick={() => {
                          const { brand, ...productWithoutBrand } = row;
                          setFormData(productWithoutBrand);
                          setIsOpen(true);
                        }}
                        className="w-4 mr-2 transform hover:text-indigo-500 hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="w-4 mr-2 transform hover:text-indigo-500 hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
          <ProductForm
            formData={formData}
            brands={brands}
            refresh={getProducts}
            closeModal={() => setIsOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
}
