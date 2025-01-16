import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

function Create() {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    post(route("users.store"));
  };
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Create new User
          </h2>
        </div>
      }
    >
      <Head title="Users" />
      <div className="py-12">
        <div className="mx-auto  sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100 grid md:grid-cols-2">
              <div>
                <form
                  onSubmit={onSubmit}
                  className="p-4 sm-p8 bg-white dark:bg-gray-800 shadow:sm rounded-lg"
                >
                  <div className="flex justify-end mr-2">
                    <Link href={route("users.create")}>
                      <ArrowPathIcon
                        className="w-4 cursor-pointer"
                        title="Reset Inputs"
                      />
                    </Link>
                  </div>
                  <div>
                    <InputLabel htmlFor="user_image_path" value="User Image" />
                    <TextInput
                      id="user_image_path"
                      type="file"
                      name="image"
                      className="mt-1 block w-full "
                      onChange={(e) => setData("image", e.target.files[0])}
                    />
                    <InputError message={errors.image} className="mt-2" />
                  </div>
                  <div className="mt-4">
                    <InputLabel htmlFor="user_name" value="User Name" />
                    <TextInput
                      id="user_name"
                      type="text"
                      name="name"
                      value={data.name}
                      className="mt-1 block w-full"
                      onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                  </div>
                  <div className="mt-4">
                    <InputLabel
                      htmlFor="user_description"
                      value="User Description"
                    />
                    <TextAreaInput
                      id="user_description"
                      name="description"
                      value={data.description}
                      className="mt-1 block w-full"
                      onChange={(e) => setData("description", e.target.value)}
                    />
                    <InputError message={errors.description} className="mt-2" />
                  </div>
                  <div className="mt-4">
                    <InputLabel htmlFor="user_due_date" value="User Deadline" />
                    <TextInput
                      id="user_due_date"
                      type="date"
                      name="due_date"
                      value={data.due_date}
                      className="mt-1 block w-full"
                      onChange={(e) => setData("due_date", e.target.value)}
                    />
                    <InputError message={errors.due_date} className="mt-2" />
                  </div>
                  <div className="mt-4">
                    <InputLabel htmlFor="user_status" value="User Status" />
                    <SelectInput
                      id="user_status"
                      name="status"
                      className="mt-1 block w-full"
                      onChange={(e) => setData("status", e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="canceled">Canceled</option>
                    </SelectInput>
                    <InputError message={errors.status} className="mt-2" />
                  </div>
                  <div className="mt-4 text-right">
                    <Link
                      href={route("users.index")}
                      className=" inline-block py-2 px-4 bg-red-600 text-white rounded shadow transition-all hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-600 mr-4"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="py-2 px-4 bg-green-600 text-white rounded shadow transition-all hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-600"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
              <div>Hello</div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Create;
