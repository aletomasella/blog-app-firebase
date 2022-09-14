import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { blogCategories } from "../../utils";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../services/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { User } from "firebase/auth";

interface AddEditBlogProps {
  user: User | null;
}

const AddEditBlog = ({ user }: AddEditBlogProps) => {
  const [blog, setBlog] = useState({
    title: "",
    tags: [] as string[],
    trending: "NO",
    description: "",
    category: "",
    imageUrl: "",
  });
  const [file, setFile] = useState<null | File>(null);

  const [progress, setProgress] = useState(0);

  const { title, tags, trending, description, category } = blog;

  useEffect(() => {
    const uploadFile = async () => {
      if (!file) return;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setBlog((prev) => ({ ...prev, imageUrl: downloadURL }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const handleTags = (tags: string[]) => {
    console.log(tags);
    setBlog({
      ...blog,
      tags,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      category &&
      title &&
      description &&
      tags.length > 0 &&
      blog.imageUrl &&
      trending
    ) {
      try {
        await addDoc(collection(db, "blogs"), {
          ...blog,
          timestape: serverTimestamp(),
          author: user?.displayName,
          authorId: user?.uid,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="container-fluid mb-4">
        <div className="container">
          <div className="col-12">
            <div className="text-center heading py-2">Create Blog</div>
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="row blog-form" onSubmit={handleSubmit}>
                <div className="col-12 py-3">
                  <input
                    type="text"
                    className="form-control input-text-box"
                    placeholder="Title"
                    value={title}
                    onChange={handleChange}
                    name="title"
                  />
                </div>
                <div className="col-12 py-3">
                  <ReactTagInput
                    tags={tags}
                    placeholder="Tags"
                    onChange={(newTags) => handleTags(newTags)}
                  />
                </div>
                <div className="col-12 py-3">
                  <p className="trending">Is it a trending blog ?</p>
                  <div className="form-check-inline mx-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      onChange={handleChange}
                      name="trending"
                      value="YES"
                      checked={trending === "YES"}
                    />
                    <label htmlFor="trending" className="form-check-label">
                      Yes&nbsp;
                    </label>
                    <input
                      type="radio"
                      className="form-check-input"
                      onChange={handleChange}
                      name="trending"
                      value="NO"
                      checked={trending === "NO"}
                    />
                    <label htmlFor="trending" className="form-check-label">
                      No
                    </label>
                  </div>
                </div>
                <div className="col-12 py-3">
                  <select
                    value={category}
                    onChange={handleChange}
                    className="catg-dropdown"
                    name="category"
                  >
                    <option value="0">Select a Category</option>
                    {blogCategories.map((category, index) => (
                      <option value={category || ""} key={index}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 py-3">
                  <textarea
                    className="form-control description-box"
                    placeholder="Description"
                    value={description}
                    onChange={handleChange}
                    name="description"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFile(e.target.files![0]);
                    }}
                  />
                </div>
                <div className="col-12 py-3 text-center">
                  <button
                    className="btn btn-add"
                    type="submit"
                    disabled={progress !== null && progress < 100}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditBlog;
