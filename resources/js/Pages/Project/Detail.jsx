import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Detail({ project }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {`Project  ${project.name} `}
        </h2>
      }
    >
      <Head title={`Project ${project.name} `} />
      <div className="py-12">
        <div className="mx-auto  sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div>
              {project.image_path ? (
                <img
                  src={project.image_path}
                  alt=""
                  className="w-full h-64 object-cover"
                />
              ) : (
                " "
              )}
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg"> Project ID</label>
                    <p className="mt-1"> {project.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg"> Project Name</label>
                    <p className="mt-1"> {project.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg"> Project Status</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          PROJECT_STATUS_CLASS_MAP[project.status]
                        }
                      >
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  {" "}
                  <div className="">
                    <label className="font-bold text-lg">Date</label>
                    <p className="mt-1">
                      {" "}
                      {project.created_at} - {project.due_date}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created By</label>
                    <p className="mt-1">{project.createdBy.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="font-bold text-lg">Description</label>
                <p className="mt-1">{project.description}</p>
              </div>
              <hr className="mt-4"></hr>
              <div className="m-4 text-lg font-bold">Tasks</div>
              <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg bg-clip-border">
                {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}
                <table className="w-full table-auto min-w-max text-sm text-left text-gray-800 rounded-lg dark:text-gray-300">
                  <thead className="text-md text-purple-700 dark:bg-gray-700 uppercase dark:text-purple-300 ">
                    <tr>
                      <th>1</th>
                      <th>1</th>
                      <th>1</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
