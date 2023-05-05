import { FC } from 'react';
import { Editor } from '@tiptap/react'
import DropdownOptions from "../../common/DropdownOptions"

interface Props {
    editor: Editor | null;
}

const ToolBar: FC<Props> = ({ editor }): JSX.Element | null => {
    if (!editor) return null;

    return <div>
        <DropdownOptions
            options={[
                {
                    label: 'Paragraph', onClick: () => { }
                },
                {
                    label: 'Heading 1', onClick: () => { }
                },
                {
                    label: 'Heading 2', onClick: () => { }
                },
                {
                    label: 'Heading 3', onClick: () => { }
                },
            ]}
            head={<p>Paragraph</p>}
                />
    </div>
}

export default ToolBar