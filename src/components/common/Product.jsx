import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { regularAxios } from "../../utils/axiosAuth";
import Modal from "./Modal";

export default function Product({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="group relative" onClick={() => setIsOpen(true)}>
        <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={item.image_url}
            alt=""
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0"></span>
                {item.name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{item.brand.name}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">${item.price}</p>
        </div>
      </div>

      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <ProductModal id={item.id} />
      </Modal>
    </>
  );
}

function ProductModal({ id }) {
  const [item, setItem] = useState();

  useEffect(() => {
    regularAxios
      .get(`/products/${id}`)
      .then((response) => setItem(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      {item && (
        <>
          <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none lg:h-80">
            <img
              src={item.image_url}
              alt=""
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="flex justify-between mt-3">
            <div>
              {item.name} <span className="italic">({item.brand.name})</span>
            </div>
            <div>${item.price}</div>
          </div>
          <div className="text-gray-400">{item.description}</div>
          <button className="mt-3 flex items-center w-full justify-center rounded-md bg-indigo-600 h-12 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Buy now (not implemented)
          </button>
        </>
      )}
    </div>
  );
}

Product.propTypes = {
  item: PropTypes.object.isRequired,
};

ProductModal.propTypes = {
  id: PropTypes.number.isRequired,
};
