import React from "react";
import moment from "moment";
import { TruncateText } from "../../generalComponents";
import { placeholderImage } from "../../assets";

const NewsCard = ({ article }) => {
  const {
    thumbnail,
    abstract = "N/A",
    date = new Date(),
    section = "N/A",
    url = "#",
    title,
  } = article;

  // Converting published time to "time ago" format using moment.js
  const timeAgo = moment(date).fromNow();
  return (
    <button
      onClick={() => {
        window.open(url, "_blank");
      }}
      className="w-full rounded border-2 p-2 relative hover:shadow-lg transform duration-75 hover:scale-[1.01] text-left flex flex-col"
    >
      <img
        src={thumbnail || placeholderImage}
        className="w-full h-[150px] border rounded"
        alt="logo"
      />

      <div className="mb-8">
        <p className="text-lg my-2 font-semibold">{title}</p>
        <p className="text-sm">
          <TruncateText text={abstract} maxLength={250} />
        </p>
      </div>
      <div className="text-xs text-gray-500 flex gap-2 absolute bottom-2">
        <p className="border-r border-black pr-2">{timeAgo}</p>
        <p>{section}</p>
      </div>
    </button>
  );
};

export default NewsCard;
