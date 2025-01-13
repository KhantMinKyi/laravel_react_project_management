import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";
import { Link } from "@inertiajs/react";
import React from "react";

function TasksTable({
  tasks,
  queryParams = null,
  sortChanged = () => {},
  onKeyPress = () => {},
  searchFieldChange = () => {},
}) {
  return (
    <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg bg-clip-border">
      {/* <pre>{JSON.stringify(tasks, undefined, 2)}</pre> */}
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
              name="status"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >
              Status
            </TableHeading>
            <TableHeading
              name="created_at"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >
              Created Date
            </TableHeading>
            <TableHeading
              name="due_date"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >
              Due Date
            </TableHeading>
            <TableHeading
              name="assigned_user_id"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >
              Assigned By
            </TableHeading>
            <TableHeading
              name="priority"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >
              Priority
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
                placeholder="Task Name"
                defaultValue={queryParams.name}
                onBlur={(e) => searchFieldChange("name", e.target.value)}
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
                <option value="canceled"> Canceled</option>
              </SelectInput>
            </th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2">
              {" "}
              <SelectInput
                className="w-full"
                defaultValue={queryParams.priority}
                onChange={(e) => {
                  searchFieldChange("priority", e.target.value);
                }}
              >
                <option value=""> Select Priority</option>
                <option value="low"> Low</option>
                <option value="medium"> Medium</option>
                <option value="high"> High</option>
              </SelectInput>
            </th>
            <th className="px-3 py-2 text-center"></th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {tasks.data.map((task, index) => (
            <tr
              className={`${
                index % 2 === 1
                  ? " dark:bg-gray-700"
                  : "bg-gray-50 dark:bg-gray-800"
              } `}
              key={task.id}
            >
              <td className="px-3 py-2">{task.id}</td>
              <td className="px-3 py-2">
                <img src={task.image_path} style={{ width: 60 }} />
              </td>
              <td className="px-3 py-2">{task.name}</td>
              <td className="px-3 py-2 text-nowrap">
                <span
                  className={
                    "px-2 py-1 rounded text-white " +
                    TASK_STATUS_CLASS_MAP[task.status]
                  }
                >
                  {TASK_STATUS_TEXT_MAP[task.status]}
                </span>
              </td>
              <td className="px-3 py-2">{task.created_at}</td>
              <td className="px-3 py-2">{task.due_date}</td>
              <td className="px-3 py-2">{task.assignedBy.name}</td>
              <td className="px-3 py-2">
                <span
                  className={
                    "px-2 py-1 rounded text-white " +
                    TASK_PRIORITY_CLASS_MAP[task.priority]
                  }
                >
                  {TASK_PRIORITY_TEXT_MAP[task.priority]}
                </span>
              </td>
              <td className="px-3 py-2">
                <Link
                  href={route("tasks.edit", task.id)}
                  className="text-yellow-600 me-3"
                >
                  Update
                </Link>
                <Link
                  href={route("tasks.destroy", task.id)}
                  className="text-red-600 me-3"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination links={tasks.meta.links} />
    </div>
  );
}

export default TasksTable;