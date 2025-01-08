import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";

function Index({ projects, queryParams = null }) {
  queryParams = queryParams || {};
  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    // console.log(queryParams);

    router.get(route("projects.index"), queryParams);
  };
  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChange(name, e.target.value);
  };
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Projects
        </h2>
      }
    >
      <Head title="Projects" />
      <div className="py-12">
        <div className="mx-auto  sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md p-4 rounded-lg bg-clip-border">
                {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}
                <table className="w-full table-auto min-w-max text-sm text-left text-gray-800 rounded-sm dark:text-gray-300 ">
                  <thead className="text-md text-purple-700 dark:bg-gray-700 uppercase dark:text-purple-300">
                    <tr className="text-nowrap ">
                      <th className="px-3 py-2">#</th>
                      {/* <th className="px-3 py-2">Image</th> */}
                      <th className="px-3 py-2">Image</th>
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Created Date</th>
                      <th className="px-3 py-2">Due Date</th>
                      <th className="px-3 py-2">Created By</th>
                      <th className="px-3 py-2">Active</th>
                      <th className="px-3 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-md text-purple-700 dark:bg-gray-700 uppercase dark:text-purple-300">
                    <tr className="text-nowrap ">
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          placeholder="Project Name"
                          defaultValue={queryParams.name}
                          onBlur={(e) =>
                            searchFieldChange("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={(e) => {
                            searchFieldChange("status", e.target.value);
                          }}
                        >
                          <option value=""> Select Status</option>
                          <option value="pending"> Pending</option>
                          <option value="in_progress"> In Progress</option>
                          <option value="completed"> Completed</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {projects.data.map((project, index) => (
                      <tr
                        className={`${
                          index % 2 === 1
                            ? " dark:bg-gray-700"
                            : "bg-gray-50 dark:bg-gray-800"
                        } `}
                        key={project.id}
                      >
                        <td className="px-3 py-2">{project.id}</td>
                        <td className="px-3 py-2">
                          <img src={project.image_path} style={{ width: 60 }} />
                        </td>
                        <td className="px-3 py-2">{project.name}</td>
                        <td className="px-3 py-2 text-nowrap">
                          <span
                            className={
                              "px-2 py-1 rounded text-white " +
                              PROJECT_STATUS_CLASS_MAP[project.status]
                            }
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2">{project.created_at}</td>
                        <td className="px-3 py-2">{project.due_date}</td>
                        <td className="px-3 py-2">{project.createdBy.name}</td>
                        <td className="px-3 py-2">
                          {project.is_active}
                          {/* <FontAwesomeIcon icon="fa-solid fa-check" /> */}
                        </td>
                        <td className="px-3 py-2">
                          <Link
                            href={route("projects.edit", project.id)}
                            className="text-yellow-600 me-3"
                          >
                            Update
                          </Link>
                          <Link
                            href={route("projects.destroy", project.id)}
                            className="text-red-600 me-3"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination links={projects.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
