import React from "react";
import { CiPlay1, CiUser } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { GoArrowRight, GoTag } from "react-icons/go";
import { LiaCommentAlt } from "react-icons/lia";

const BlogCard = ({ post, hasVideo }) => {
  return (
    <div>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-gray-100 flex flex-col h-full">
        <div className="relative overflow-hidden aspect-[1.4/1]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Date Badge - Bottom Left Overlay */}
          <div className="absolute bottom-4 left-4 bg-white rounded-md p-1.5 flex flex-col items-center min-w-12.5 shadow-sm">
            <span className="text-xl font-bold text-gray-900 leading-none">
              {post.date}
            </span>
            <span className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase">
              {post.month}
            </span>
          </div>

          {/* Optional Video Play Overlay */}
          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer">
                <FaPlay className="text-green-600 text-xl ml-1" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 mb-3">
            <div className="flex items-center gap-1.5">
              <GoTag size={16} />
              <span className="hover:text-green-600 cursor-pointer transition-colors">
                {post.category}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CiUser size={16}/>
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <LiaCommentAlt size={16}/>
              <span>{post.comments} Comments</span>
            </div>
          </div>

          <h2 className="text-[17px] font-semibold text-gray-900 mb-3 leading-[1.3] group-hover:text-green-600 transition-colors line-clamp-2">
            {post.title}
          </h2>

          <p className="text-sm text-gray-400 mb-5 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-auto">
            <button className="flex items-center gap-2 text-green-600 font-bold text-[13px] uppercase tracking-wider group/btn">
              Read More
              <GoArrowRight className="transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
