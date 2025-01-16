import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import TableHeading from "@/Components/TableHeading";

function Index({ users, queryParams = null, success }) {
  queryParams = queryParams || {};

  const [clientSuccess, setClientSuccess] = useState(success);
  useEffect(() => {
    if (success) {
      setClientSuccess(success);
      const timer = setTimeout(() => {
        setClientSuccess(""); // Clear success message after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timeout on component unmount or success update
    }
  }, [success]);
  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    // console.log(queryParams);

    router.get(route("users.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChange(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction == "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    const divClass = document.getElementById(name);
    // div.className = "mt-4";

    router.get(route("users.index"), queryParams);
  };

  const deleteUser = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    } else {
      router.delete(route("users.destroy", user));
    }
  };
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Users
          </h2>
          <Link
            href={route("users.create")}
            className=" py-2 px-4 text-white bg-purple-600 dark:bg-purple-900 rounded hover:shadow-lg transition-all hover:bg-purple-800 dark:hover:bg-purple-700"
          >
            Add User
          </Link>
        </div>
      }
    >
      <Head title="Users" />
      <div className="py-12">
        <div className="mx-auto  sm:px-6 lg:px-8">
          {clientSuccess && (
            <div className="bg-green-400 text-white w-1/3 rounded py-2 px-2 shadow-lg text-center mb-4 ml-auto">
              {clientSuccess}
            </div>
          )}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg bg-clip-border">
                {/* <pre>{JSON.stringify(users, undefined, 2)}</pre> */}
                <table className="w-full table-auto min-w-max text-sm text-left text-gray-800 rounded-lg dark:text-gray-300">
                  <thead className="text-md text-purple-700 dark:bg-gray-700 uppercase dark:text-purple-300 ">
                    <tr className="text-nowrap ">
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      {/* <th className="px-3 py-2">Image</th> */}
                      <TableHeading name="image_path" sortable={false}>
                        Image
                      </TableHeading>
                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Name
                      </TableHeading>
                      <TableHeading
                        name="email"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Email
                      </TableHeading>
                      <TableHeading
                        name="created_projects_count"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Project Created
                      </TableHeading>
                      <TableHeading
                        name="created_tasks_count"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Task Created
                      </TableHeading>
                      <TableHeading
                        name="assigned_tasks_count"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Task Assigned
                      </TableHeading>
                      <TableHeading name="action" sortable={false}>
                        Action
                      </TableHeading>
                    </tr>
                  </thead>
                  <thead className="text-md text-purple-700 dark:bg-gray-700 uppercase dark:text-purple-300">
                    <tr className="text-nowrap ">
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          placeholder="User Name"
                          defaultValue={queryParams.name}
                          onBlur={(e) =>
                            searchFieldChange("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          placeholder="User Email"
                          defaultValue={queryParams.email}
                          onBlur={(e) =>
                            searchFieldChange("email", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("email", e)}
                        />
                      </th>
                      <th className="px-3 py-2 text-center"></th>
                      <th className="px-3 py-2 text-center"></th>
                      <th className="px-3 py-2 text-center"></th>
                      <th className="px-3 py-2 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {users.data.map((user, index) => (
                      <tr
                        className={`h-16 ${
                          index % 2 === 1
                            ? " dark:bg-gray-700"
                            : "bg-gray-50 dark:bg-gray-800"
                        } `}
                        key={user.id}
                      >
                        <td className="px-3 py-2">{user.id}</td>
                        <td className="px-3 py-2">
                          <img src={user.image_path} style={{ width: 60 }} />
                        </td>
                        <th className="px-3 py-2 hover:underline text-purple-600 dark:text-purple-200">
                          <Link href={route("users.show", user.id)}>
                            {user.name}
                          </Link>
                        </th>
                        <td className="px-3 py-2">{user.email}</td>
                        <td className="px-3 py-2">
                          {user.created_projects_count}
                        </td>
                        <td className="px-3 py-2">
                          {user.created_tasks_count}
                        </td>
                        <td className="px-3 py-2">
                          {user.assigned_tasks_count}
                        </td>
                        <td className="px-3 py-2">
                          <Link
                            href={route("users.edit", user)}
                            className="text-yellow-600 me-3"
                          >
                            Update
                          </Link>
                          <button
                            onClick={(e) => deleteUser(user)}
                            className="text-red-600 me-3"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination links={users.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
