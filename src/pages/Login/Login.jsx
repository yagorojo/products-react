import { useForm } from "react-hook-form";
import { regularAxios } from "../../utils/axiosAuth";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const userContext = useContext(UserContext);

  const onSubmit = async (loginData) => {
    try {
      const { data } = await regularAxios.post(`/users/login`, loginData);
      userContext.login(data.token);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <p className="mt-2 text-center text-sm text-gray-500">
        Psst! Use <span className="text-red-600">admin</span> for both the
        username and password!
      </p>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                {...register("username")}
                required
                className="block w-full rounded-md border-0 h-12 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                {...register("password")}
                required
                className="block w-full rounded-md border-0 h-12 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex items-center w-full justify-center rounded-md bg-indigo-600 h-12 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign up, it&apos;s free!
          </a>
        </p>
      </div>
    </div>
  );
}
