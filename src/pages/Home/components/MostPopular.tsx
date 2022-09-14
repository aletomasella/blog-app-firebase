import React from "react";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../../models/Blog";

interface MostPopularProps {
  blogs: Blog[] | null;
}

const MostPopular = ({ blogs }: MostPopularProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="blog-heading text-start pt-3 py-2 b-4">
          Most Popular
        </div>
        {blogs?.map((blog, i) => (
          <div
            className="row pb-3"
            key={blog.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/detail/${blog.id}`)}
          >
            <div className="col-4 align-self-center">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="most-popular-img"
              />
            </div>
            <div className="col-7 padding">
              <div className="text-start most-popular-font">{blog.title}</div>
              <div className="text-start most-popular-font-meta">
                {blog.timestape.toDate().toDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MostPopular;
