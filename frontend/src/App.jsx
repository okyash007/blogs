import { useCallback, useEffect, useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Button } from "@/components/ui/button";

function App() {
  const [blocks, setBlocks] = useState([]);
  const editor = useCreateBlockNote({
    initialContent: JSON.parse(localStorage.getItem("data")),
  });

  const darkRedTheme = {
    colors: {
      editor: {
        text: "#ffffff",
        background: "#1a1a1a",
      },
      sideMenu: "#ffffff5a",
    },
  };

  return (
    <>
      <h1>hiii</h1>
      <Button
        variant="secondary"
        onClick={() => {
          localStorage.setItem("data", JSON.stringify(blocks));
        }}
      >
        Click me
      </Button>
      <div style={{ marginInline: "5%" }}>
        <BlockNoteView
          editor={editor}
          editable={false}
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
