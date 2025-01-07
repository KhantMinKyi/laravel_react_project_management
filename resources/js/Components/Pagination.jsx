import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
    <nav className="text-center mt-4">
      {links.map((link, index) => (
        <Link
          preserveScroll
          href={link.url || ""}
          key={index}
          dangerouslySetInnerHTML={{ __html: link.label }}
          className={
            "inline-block py-1 px-2 me-1 rounded-lg dark:text-gray-200  text-md" +
            (link.active
              ? " text-gray-700 dark:bg-purple-400 bg-purple-200 "
              : " ") +
            (!link.url
              ? "!text-gray-200 dark:!text-gray-500 cursor-not-allowed"
              : " hover:bg-purple-200 dark:hover:bg-purple-400")
          }
        ></Link>
      ))}
    </nav>
  );
}
