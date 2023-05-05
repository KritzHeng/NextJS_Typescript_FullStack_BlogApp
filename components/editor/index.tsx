import { FC } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TollBar from "./ToolBar";

interface Props { }

const Editor: FC<Props> = (props): JSX.Element => {
    const editor = useEditor({ extensions: [StarterKit] })
    return (
        <div>
            {/* <button onClick={() => {
                if(!editor) return
                editor.chain()
                .toggleBold()
                .run()
            }}>Bold</button> */}
            <TollBar editor={editor} />
            <EditorContent editor={editor} />
        </div>)
}

export default Editor;