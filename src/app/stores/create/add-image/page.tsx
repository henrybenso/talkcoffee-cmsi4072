"use client";
import { useState } from "react";
import Layout from "../../../layout";
import Router from "next/router";

const MAX_COUNT = 5;

export default function Upload() {
  return (
    <Layout>
      <div className="page">
        <form onSubmit={handleFileEvent}>
          <h1>Upload Image</h1>

          <input
            id="fileUpload"
            type="file"
            multiple
            accept=".jpg, .png, .gif, .jpeg"
            disabled={fileLimit}
          ></input>

          <input type="submit" value="Upload" disabled />
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }
      `}</style>
    </Layout>
  );
}

{
  /* <div className="page">
  <form onSubmit={handleFileEvent}>
    <h1>Upload Image</h1>

    <input
      id="fileUpload"
      type="file"
      multiple
      accept=".jpg, .png, .gif, .jpeg"
      disabled={fileLimit}
    ></input>

    <input type="submit" value="Upload" disabled />
  </form>
</div>; */
}