"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function PostEditor({
  postData,
  setEditorHtml,
}: {
  postData: any;
  setEditorHtml: any;
}) {
  const [input1, setInput1] = useState("");
  const [link, setLink] = useState("");

  const _tags = [
    { id: 1, _openTag: "<p>", _closeTag: "</p>" },
    { id: 2, _openTag: "<b>", _closeTag: "</b>" },
    { id: 3, _openTag: "<u>", _closeTag: "</u>" },
    { id: 4, _openTag: "<i>", _closeTag: "</i>" },
    { id: 5, _openTag: "<button>", _closeTag: "</button>" },
    { id: 6, _openTag: "<img>", _closeTag: "</img>" },
    { id: 7, _openTag: "<h1>", _closeTag: "</h1>" },
    { id: 8, _openTag: "<h2>", _closeTag: "</h2>" },
    { id: 9, _openTag: "<h3>", _closeTag: "</h3>" },
    { id: 10, _openTag: "<h4>", _closeTag: "</h4>" },
    { id: 11, _openTag: "<h5>", _closeTag: "</h5>" },
    { id: 12, _openTag: "<h6>", _closeTag: "</h6>" },
    { id: 13, _openTag: "<ul><li>", _closeTag: "</li></ul>" },
  ];

  const [htmlTags, setHtmlTags]: any = useState(0);

  let keyTag: any;

  if (_tags[htmlTags]?._openTag === `<button>`) {
    keyTag =
      _tags[htmlTags]?._openTag +
      `<a ` +
      `href=` +
      `"${link}"` +
      " " +
      `target="_blank"` +
      `>` +
      `${input1}` +
      `</a>` +
      `${_tags[htmlTags]?._closeTag}`;
  } else if (_tags[htmlTags]?._openTag === `<img>`) {
    keyTag = `<img ` + `src=` + `"${link}"` + ` />`;
  } else {
    keyTag = `${_tags[htmlTags]?._openTag}${input1}${_tags[htmlTags]?._closeTag}`;
  }

  const addItem = () => {
    setEditorHtml([...postData.editorHtml, keyTag]);
  };

  useEffect(() => {
    setInput1("");
    setLink("");
  }, [postData.editorHtml.length]);

  console.log(postData.editorHtml);

  return (
    <div id="post" style={{ height: "100%" }}>
      <select
        onChange={(e: any) => setHtmlTags(e.target.value)}
        className="auth-input mb-10 mt-25"
        style={{ width: "20%" }}
      >
        {_tags.map((tag, index) => (
          <option key={tag.id} value={index}>
            {tag._openTag}
          </option>
        ))}
      </select>

      <div className="d-flex align-items-center">
        {_tags[htmlTags]?._openTag !== `<img>` && (
          <input
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            className="auth-input mr-10"
            placeholder={`Type ${_tags[htmlTags]?._openTag} text`}
          />
        )}

        {_tags[htmlTags]?._openTag === `<button>` ||
        _tags[htmlTags]?._openTag === `<img>` ? (
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder={`${_tags[htmlTags]?._openTag} link`}
            className="auth-input mr-10"
          />
        ) : null}
        <Image
          src="/image/add.png"
          width={30}
          height={30}
          onClick={addItem}
          alt="Delete post"
          className="cursor-pointer"
          style={{ width: "30px" }}
          quality={100}
        />
      </div>

      <div id="post">
        <h6>Preview Post</h6>
        <div className="mt-20">
          <h2 className="fw-900">{postData.blogTitle}</h2>
          <hr />
          <p>{postData.description}</p>
          <img src={postData.image} />
          {postData.editorHtml.map((_html_editor: string, index: number) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: _html_editor }}
            ></div>
          ))}
          <hr />
        </div>
      </div>
    </div>
  );
}