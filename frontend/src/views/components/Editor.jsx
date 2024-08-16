import React, { useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

const Editor = () => {
  const [blocks, setBlocks] = useState([]);
  const editor = useCreateBlockNote({
    initialContent: JSON.parse(localStorage.getItem("data")),
  });

  const darkRedTheme = {
    colors: {
      editor: {
        text: "#ffffff",
        background: "#000000",
      },
      sideMenu: "#ffffff7a",
    },
  };

  return (
    <div style={{ marginInline: "50px" }}>
      <BlockNoteView
        editor={editor}
        editable={true}
        onChange={() => {
          setBlocks(editor.document);
        }}
        theme={darkRedTheme}
      />
    </div>
  );
};

export default Editor;
