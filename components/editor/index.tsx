import { FC, useEffect, useState } from "react";
import { useEditor, EditorContent, getMarkRange, Range } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TollBar from "./ToolBar";
import Youtube from '@tiptap/extension-youtube'
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from '@tiptap/extension-link'
// import { SelectionRange } from "prosemirror-state";
import EditLink from "./Link/EditLink";
import GalleryModal, { ImageSelectionResult } from "./GalleryModal";
import TipTapImage from '@tiptap/extension-image'
import axios from 'axios'

interface Props { }

const Editor: FC<Props> = (props): JSX.Element => {
    const [selectionRange, setSelectionRange] = useState<Range>();
    const [showGallery, setShowGallery] = useState(false);
    const [images, setImages] = useState<{ src: string }[]>([]);
    const [uploading, setUploading] = useState(false);

    const fetchImages = async () => {
        const { data } = await axios('/api/image');
        console.log(data);
        setImages(data);
    };

    const handleImageUpload = async (image: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', image);
        const { data } = await axios.post('/api/image', formData);
        setUploading(false);
        console.log(data);
        const newImage = { src: data.url }
        setImages([newImage, ...images]);
    };


    const editor = useEditor({
        extensions: [StarterKit, Underline,
            Link.configure({
                autolink: false,
                linkOnPaste: false,
                openOnClick: false,
                HTMLAttributes: {
                    target: ''
                }

            }),
            Placeholder.configure({
                placeholder: 'type something'
            }),
            Youtube.configure({
                width: 840,
                height: 472.5,
                HTMLAttributes: {
                    class: 'mx-auto rounded'
                }
            }),
            TipTapImage.configure({
                HTMLAttributes: {
                    class: 'mx-auto'
                }
            })
        ],
        editorProps: {
            handleClick(view, pos, event) {
                const { state } = view
                const selectionRange = getMarkRange(state.doc.resolve(pos), state.schema.marks.link);
                if (selectionRange) setSelectionRange(selectionRange);
            },
            attributes: {
                class: 'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full'
            }
        },
    }
    )

    const handleImageSelection = (result: ImageSelectionResult) => {
        // if (!editor) return;
        editor?.chain().focus().setImage({ src: result.src, alt: result.altText }).run();

    }

    useEffect(() => {
        if (editor && selectionRange) {
            editor.commands.setTextSelection(selectionRange);
        }
    }, [editor, selectionRange])

    useEffect(() => {
        fetchImages();
    }, [])

    return (
        <>
            <div className="p-3 dark:bd-primary-dark bg-primary transition">
                {/* <button onClick={() => {
                if(!editor) return
                editor.chain()
                .toggleBold()
                .run()
            }}>Bold</button> */}
                <TollBar editor={editor} onOpenImageClick={() => setShowGallery(true)} />
                <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light mx-3" />
                {editor ? <EditLink editor={editor} /> : null}
                <EditorContent editor={editor} />
            </div>

            <GalleryModal
                visible={showGallery}
                onClose={() => setShowGallery(false)}
                onSelect={handleImageSelection}
                images={images}
                onFileSelect={handleImageUpload}
                uploading={uploading}
            />
        </>
    )
}

export default Editor;