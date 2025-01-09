import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

export default function TableHeading({
  sort_field = null,
  sort_direction = null,
  sortable = true,
  name,
  children,
  sortChanged = () => {},
}) {
  return (
    <th onClick={(e) => sortChanged(name)} className={"px-3 py-2"}>
      <div
        className={
          "flex items-center cursor-pointer" +
          (sort_field === "created_at"
            ? " text-indigo-700 dark:text-white mb-2"
            : " ")
        }
      >
        {children}
        {sortable && (
          <div className="ml-1">
            <ChevronUpIcon
              className={
                "w-4 " +
                (sort_field === name && sort_direction == "asc"
                  ? "text-gray-300"
                  : " ")
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-2 " +
                (sort_field === name && sort_direction == "desc"
                  ? "text-gray-300"
                  : " ")
              }
            />
          </div>
        )}
      </div>
    </th>
  );
}
