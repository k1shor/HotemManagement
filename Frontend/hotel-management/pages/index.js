import Image from "next/image";
import { Inter } from "next/font/google";
import FilterSection from "./components/FilterSection";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [description, setDescription] = useState("");

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
      // console.log('valie')

      setDescription(editorRef.current.getContent());
    }
  };

  console.log(description, "description");
  const handleChange = (value) => {
    console.log(value);
  };
  return (
    <main>
      <>
      <h1>
        this is new
      </h1>
        <div>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
        <div className="container max-w-6xl mx-auto my-6">
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height:300,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <button
            onClick={log}
            className="bg-orange-600 px-4 py-2 rounded-xl text-white my-6 "
          >
            Log editor content
          </button>
        </div>
      </>

      <FilterSection />
    </main>
  );
}
