
import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Card = (props: any) => {
  return (
    <a href={`/blog/${props.blog.slug}`}>
      <div className="relative flex flex-col bg-slate-100 border border-slate-200 shadow-sm rounded-lg w-full md:w-96 lg:w-96 px-2 transition-transform transform hover:scale-105 hover:border-purple-600 duration-300 dark:bg-gray-800 dark:border-gray-700">
        <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
          <Image
            src={props.blog.blogImage}
            alt="card-image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <div className="mb-4 rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
            {props.blog.blogcategory}
          </div>
          <h6 className="mb-2 text-slate-800 text-xl font-semibold">
            {props.blog.blogtitle}
          </h6>
          <p className="text-slate-600 leading-normal font-light">
            {props.blog.blogdescription}
          </p>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Image
              alt="Tania Andrew"
              src={props.blog.authorImage}
              width={32}
              height={32}
              className="relative inline-block h-8 w-8 rounded-full"
            />
            <div className="flex flex-col ml-3 text-sm">
              <span className="text-slate-800 font-semibold">{props.blog.author}</span>
              <span className="text-slate-600">{dayjs(props.blog.createdAt).fromNow()}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;
