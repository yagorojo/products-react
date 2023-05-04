import { useForm, Controller } from "react-hook-form";
import { authAxios } from "../../utils/axiosAuth";
import { PropTypes } from "prop-types";

export default function ProductForm({ formData, refresh, closeModal, brands }) {
  const { control, register, handleSubmit } = useForm({
    defaultValues: formData,
  });

  const onSubmit = async (productData) => {
    try {
      if (!formData.id) await authAxios.post(`/products`, productData);
      else await authAxios.put(`/products/${formData.id}`, productData);
      refresh();
      closeModal();
    } catch (error) {
      console.error(error.message);
      closeModal();
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Name
        </label>
        <div className="mt-2">
          <input
            {...register("name")}
            required
            className="block w-full rounded-md border-0 h-12 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Brand
        </label>
        <div className="mt-2">
          <Controller
            name="brandId"
            render={({ field }) => (
              <select
                {...field}
                onChange={(e) => {
                  field.onChange(parseInt(e.target.value, 10));
                }}
                className="block w-full rounded-md bg-white border-0 h-12 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                {brands &&
                  brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
              </select>
            )}
            control={control}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Price
          </label>
        </div>
        <div className="mt-2">
          <Controller
            name="price"
            render={({ field }) => (
              <input
                type="number"
                className="block w-full rounded-md border-0 h-12 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...field}
                onChange={(e) => {
                  field.onChange(parseInt(e.target.value, 10));
                }}
              />
            )}
            control={control}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Image URL
          </label>
        </div>
        <div className="mt-2">
          <input
            {...register("image_url")}
            required
            className="block w-full rounded-md border-0 h-12 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
        </div>
        <div className="mt-2">
          <input
            {...register("description")}
            className="block w-full rounded-md border-0 h-12 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex items-center w-full justify-center rounded-md bg-indigo-600 h-12 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {formData.id ? "Edit product" : "Add product" }
        </button>
      </div>
    </form>
  );
}

ProductForm.propTypes = {
  brands: PropTypes.array.isRequried,
  formData: PropTypes.object,
  refresh: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
