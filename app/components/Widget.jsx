import { Link } from "@remix-run/react";

export default function Widget() {
  return (
    <div className="bg-[#F0FBCC] border-solid border rounded-2xl py-2 px-4 my-8 w-fit hover:cursor-pointer hover:brightness-75 transition-all ease-out duration-200">
      <Link
        prefetch="intent"
        to={"https://www.shopify.com/enterprise/blog/shopify-checkout"}>
        <div className="flex items-center text-xs text-[#171E16]">
          Learn more about these calulations<Icon></Icon>
        </div>
      </Link>
    </div>
  );
}

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4 pl-2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
