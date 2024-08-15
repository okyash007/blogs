import { useCallback, useEffect, useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

function App() {
  const [blocks, setBlocks] = useState([]);
  const editor = useCreateBlockNote({
    // editable: true,
    initialContent: [
      {
        id: "e1bdae88-96e1-48d2-bd26-9ca675602a20",
        type: "heading",
        props: {
          textColor: "default",
          backgroundColor: "default",
          textAlignment: "left",
          level: 2,
        },
        content: [
          {
            type: "text",
            text: "njvevefvfevef",
            styles: {},
          },
        ],
        children: [],
      },
      {
        id: "2498f9b7-b575-47cf-b70a-12437b51633b",
        type: "paragraph",
        props: {
          textColor: "default",
          backgroundColor: "default",
          textAlignment: "left",
        },
        content: [],
        children: [],
      },
    ],
  });

  const darkRedTheme = {
    colors: {
      editor: {
        text: "#ffffff",
        background: "#242424",
      },
      sideMenu: "#ffffff",
    },
  };

  return (
    <>
      <h1>hiii</h1>
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
      {/* <pre>
        <code>{JSON.stringify(blocks, null, 2)}</code>
      </pre> */}
    </>
  );
}

export default App;
