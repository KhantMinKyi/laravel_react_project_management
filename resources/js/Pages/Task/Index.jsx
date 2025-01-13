import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import React from "react";
import TableHeading from "@/Components/TableHeading";
import TasksTable from "./TasksTable";

function Index({ tasks, queryParams = null }) {
  queryParams = queryParams || {};

  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    // console.log(queryParams);

    router.get(route("tasks.index"), queryParams);
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

    router.get(route("tasks.index"), queryParams);
  };
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Tasks
        </h2>
      }
    >
      <Head title="Tasks" />
      <div className="py-12">
        <div className="mx-auto  sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                sortChanged={sortChanged}
                onKeyPress={onKeyPress}
                searchFieldChange={searchFieldChange}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
