import React, { useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

const Editor = ({ editable, blocks, setBlocks }) => {
  const editor = useCreateBlockNote({
    initialContent: blocks,
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
    <div
      style={
        editable == true ? { marginInline: "50px" } : { marginInline: "5%" }
      }
    >
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={() => {
          setBlocks(editor.document);
        }}
        theme={darkRedTheme}
      />
    </div>
  );
};

export default Editor;
