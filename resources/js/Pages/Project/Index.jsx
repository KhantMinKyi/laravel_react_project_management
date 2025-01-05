import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

function Index({ projects }) {
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
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}
              <table className="w-full text-sm text-left text-gray-800 dark:text-gray-300 ">
                <thead className="text-md text-purple-700 uppercase dark:text-purple-300">
                  <tr className="text-nowrap ">
                    <th className="px-3 py-2">#</th>
                    {/* <th className="px-3 py-2">Image</th> */}
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Created Date</th>
                    <th className="px-3 py-2">Due Date</th>
                    <th className="px-3 py-2">Created By</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {projects.data.map((project) => (
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="px-3 py-2">{project.id}</td>
                      {/* <td className="px-3 py-2">
                        <img></img>
                      </td> */}
                      <td className="px-3 py-2">{project.name}</td>
                      <td className="px-3 py-2">{project.status}</td>
                      <td className="px-3 py-2">{project.created_at}</td>
                      <td className="px-3 py-2">{project.due_date}</td>
                      <td className="px-3 py-2">{project.createdBy.name}</td>
                      <td className="px-3 py-2"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
