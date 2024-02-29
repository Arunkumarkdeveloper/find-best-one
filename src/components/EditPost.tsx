"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const EditPost = ({ post }: { post: any }) => {
  const router = useRouter();
  const [image, setImage] = useState(post.image);
  const [blogTitle, setBlogTitle] = useState(post.blogTitle);
  const [description, setDescription] = useState(post.description);
  const [editorHtml, setEditorHtml] = useState(post.editorHtml);
  const [isEdit, setIsEdit] = useState(false);

  let link = blogTitle
    ?.match(/[^!@#$%^&*?{},.;:/+~()<>]/g)
    ?.join("")
    ?.toLocaleLowerCase()
    ?.replaceAll(" ", "-");

  const postData = {
    image: image,
    blogTitle: blogTitle,
    description: description,
    urlLink: link,
    editorHtml: editorHtml,
  };

  const post_deleted = () => toast.success("Post deleted!");
  const post_updated = () => toast.success("Post updated!");

  const editPost = async (id: string) => {
    setIsEdit(false);
    const response = await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(postData),
    });
    if (response.ok) {
      router.refresh();
      post_updated();
    }
  };

  const deletePost = async (id: string) => {
    const response = await fetch(`/api/blog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
    });

    const response_cmts = await fetch(`/api/comment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
    });

    const response_likes = await fetch(`/api/like/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
    });

    if (response.ok && response_cmts.ok && response_likes.ok) {
      router.refresh();
      post_deleted();
    }
  };

  const handleChange = (e: any, index: number) => {
    const updatedEditorHtml = [...editorHtml];
    updatedEditorHtml[index] = e.target.value;
    setEditorHtml(updatedEditorHtml);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="mb-30">
        <Link href={`/post/${post.urlLink}`} prefetch={true}>
          <div className="post-group">
            <img src={post.image} className="posts-image mr-25" />
            <div>
              <h6 className="fw-600 mb-10">{post.blogTitle}</h6>
              <p>{post.description.toString().slice(0, 145)} . . .</p>
            </div>
          </div>
        </Link>
        <Image
          src="/image/edit.png"
          width={15}
          height={15}
          onClick={() => setIsEdit(!isEdit)}
          alt="Edit post"
          className="cursor-pointer mr-15"
          quality={100}
        />
        <Image
          src="/image/delete.png"
          width={15}
          height={15}
          onClick={() => deletePost(post._id)}
          alt="Delete post"
          className="cursor-pointer"
          quality={100}
        />
        {isEdit && (
          <div id="post" className="d-flex flex-column gap-3 mb-10 mt-20">
            <span className="fw-700">BlogTitle</span>
            <textarea
              placeholder="BlogTitle"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              className="auth-input"
              style={{ lineHeight: "2.5" }}
              rows={1}
            />
            <span className="fw-700">Description</span>
            <textarea
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="auth-input"
              style={{ lineHeight: "2.5" }}
              rows={2}
            />
            <span className="fw-700">Image URL</span>
            <textarea
              placeholder="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="auth-input"
              style={{ lineHeight: "2.5" }}
              rows={1}
            />
            <span className="fw-700">EditorHtml</span>
            {editorHtml.map((_editHtml: string, index: number) => (
              <textarea
                key={index}
                value={_editHtml}
                onChange={(e) => handleChange(e, index)}
                className="auth-input"
                style={{ lineHeight: "2.5" }}
                rows={4}
              />
            ))}
          </div>
        )}
        {isEdit && (
          <div onClick={() => editPost(post._id)} className="cursor-pointer">
            <Image
              src="/image/update.png"
              width={20}
              height={20}
              onClick={() => editPost(post._id)}
              alt="Update post"
              className="cursor-pointer mr-5"
              quality={100}
            />
            <span>Update</span>
          </div>
        )}
      </div>
    </>
  );
};

export default EditPost;
