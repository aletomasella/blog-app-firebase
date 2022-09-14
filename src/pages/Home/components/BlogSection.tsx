import { User } from "firebase/auth";
import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { Blog } from "../../../models/Blog";
import { excerpt } from "../../../utils";

interface BlogSectionProps {
  blogs: Blog[];
  user: User | null;
  handleDelete: (id: string) => void;
}

const BlogSection = ({ blogs, user, handleDelete }: BlogSectionProps) => {
  const userId = user?.uid;
  return (
    <>
      <div>
        <div className="blog-heading text-start py-2 mb-4">Daily Blogs</div>
        {blogs?.map((blog) => (
          <div className="row pb-4" key={blog.id}>
            <div className="col-md-5">
              <div className="hover-blogs-img">
                <div className="blogs-img">
                  <img src={blog.imageUrl} alt={blog.title} />
                  <div></div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="text-start">
                <h6 className="category catg-color">{blog.category}</h6>
                <span className="title py-2">{blog.title}</span>
                <span className="meta-info">
                  <p className="author">{blog.author}</p> -{" "}
                  {blog.timestape.toDate().toDateString()}
                </span>
              </div>
              <div className="short-description text-start">
                {excerpt(blog.description, 0, 141)}
              </div>
              <Link to={`/detail/${blog.id}`}>
                <button className="btn btn-read">Read More</button>
              </Link>
              {userId === blog.authorId && (
                <>
                  <div style={{ float: "right" }}>
                    <FontAwesome
                      name="trash"
                      style={{ margin: "15px", cursor: "pointer" }}
                      size="2x"
                      onClick={() => handleDelete(blog.id)}
                    />
                    <Link to={`/update/${blog.id}`}>
                      <FontAwesome
                        name="edit"
                        style={{ cursor: "pointer" }}
                        size="2x"
                      />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogSection;
