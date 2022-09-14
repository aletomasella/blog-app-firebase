import React from "react";

interface TagsProps {
  tags: string[] | null;
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <>
      <div>
        <div>
          <div className="blog-heading text-start py-2 mb-4">Tags</div>
        </div>
        <div className="tags">
          {tags?.map((tag, i) => (
            <p className="tag" key={i}>
              {tag}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tags;
