import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Blog } from "../../models/Blog";
import { db } from "../../services/firebase";
import { MostPopular, Tags } from "../Home/components";

interface DetailProps {
  setActive: (active: string) => void;
}

const Detail = ({ setActive }: DetailProps) => {
  const { id } = useParams();
  const [blog, setBlog] = useState<null | Blog>(null);
  const [blogs, setBlogs] = useState<null | Blog[]>(null);
  const [tags, setTags] = useState<null | string[]>(null);

  useEffect(() => {
    const getBlogData = async () => {
      const blogRef = collection(db, "blogs");
      const blogs = await getDocs(blogRef);
      setBlogs(
        blogs.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Blog))
      );
      const tags: string[] = [];
      blogs.docs.forEach((doc) => tags.push(...doc.get("tags")));
      const uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);
    };
    getBlogData();
  }, []);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id as string);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data() as Blog);
    setActive("");
  };
  return (
    <>
      <div className="single">
        <div
          className="blog-title-box"
          style={{ backgroundImage: `url(${blog?.imageUrl})` }}
        >
          <div className="overlay"></div>
          <div className="blog-title">
            <span>{blog?.timestape.toDate().toDateString()}</span>
            <h2>{blog?.title}</h2>
          </div>
        </div>
        <div className="container-fluid pb-4 pt-4 padding blog-single-content">
          <div className="container padding">
            <div className="row mx-0">
              <div className="col-md-8">
                <span className="meta-info text-start">
                  By <p className="author">{blog?.author}</p> -{" "}
                  {blog?.timestape.toDate().toDateString()}
                </span>
                <p className="text-start">{blog?.description}</p>
              </div>
              <div className="col-md-3">
                <Tags tags={tags} />
                <MostPopular blogs={blogs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
