import { User } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "../../components";
import { Blog } from "../../models/Blog";
import { db } from "../../services/firebase";
import { BlogSection, MostPopular, Tags } from "./components";

interface HomeProps {
  setActive: (active: string) => void;
  user: User | null;
}

const Home = ({ setActive, user }: HomeProps) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        const list: Blog[] = [];
        const tags: string[] = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ ...doc.data(), id: doc.id } as Blog);
        });
        const uniqueTags = [...new Set(tags)];
        setBlogs(list);
        setLoading(false);
        setActive("home");
        setTags(uniqueTags);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure to delete this blog?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container-fluid pb-4 pt-4 padding">
        <div className="container padding">
          <div className="row mx-0">
            <h2>Trending</h2>
            <div className="col-md-8">
              <BlogSection
                blogs={blogs}
                user={user}
                handleDelete={handleDelete}
              />
            </div>
            <div className="col-md-3">
              <Tags tags={tags} />
              <MostPopular blogs={blogs} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
