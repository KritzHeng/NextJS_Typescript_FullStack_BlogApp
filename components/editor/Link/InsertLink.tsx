import { FC, useEffect, useRef, useState } from "react";
import Button from "../ToolBar/Button";
import { BsLink45Deg } from "react-icons/bs";
import LinkForm, { linkOption } from "./LinkForm";

interface Props {
    onSubmit(link: linkOption): void;
}

const InsertLink: FC<Props> = ({ onSubmit }): JSX.Element => {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
    const handleSubmit = (link: linkOption) => {
        if(!link.url) return hideForm()

        onSubmit(link);
        hideForm()
    }

    const hideForm = () => setVisible(false);
    const showForm = () => setVisible(true);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                // Clicked outside the form, hide it 
                hideForm();
            }
        };

        document.addEventListener("click", handleClickOutside);
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                hideForm();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, []);
    return (
        <div
            ref={ref}
            // onKeyDown={({ key }) => {
            //     // console.log(key);
            //     if (key === 'Escape') setVisible(false);
            // }}
            className="relative">
            <Button onClick={visible ? hideForm : showForm}>
                <BsLink45Deg />
            </Button>

            <div className="absolute top-full right-0 mt-4 z-50">
                <LinkForm
                    visible={visible}
                    onSubmit={handleSubmit}
                // onKeyDown={({ key }) => {
                //     if (key === "Escape") setVisible(false);
                // }}
                />
                {/* <LinkForm visible={visible} /> */}
            </div>
        </div>)
}

export default InsertLink;