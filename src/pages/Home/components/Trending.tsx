import React, { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Blog } from "../../../models/Blog";
import { Link } from "react-router-dom";

interface TrendingProps {
  blogs: Blog[] | null;
}

const Trending = ({ blogs }: TrendingProps) => {
  const [options, setOptions] = useState({
    loop: false,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      400: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });
  return (
    <>
      <div>
        <div className="blog-heading text-start py-2 mb-4">Trending</div>
      </div>
      <OwlCarousel className="owl-theme" {...options}>
        {blogs?.map((blog, i) => (
          <div className="item px-2" key={blog.id}>
            <Link to={`/detail/${blog.id}`}>
              <div className="trending-img-position">
                <div className="trending-img-size">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="trending-img-relative"
                  />
                </div>
                <div className="trending-img-absolute"></div>
                <div className="trending-img-absolute-1">
                  <span className="text-white">{blog.title}</span>
                  <div className="trending-meta-info">
                    {blog.author} - {blog.timestape.toDate().toDateString()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </OwlCarousel>
    </>
  );
};

export default Trending;
