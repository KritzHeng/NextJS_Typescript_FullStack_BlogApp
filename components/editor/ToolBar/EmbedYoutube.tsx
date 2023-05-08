import { FC, useEffect, useRef, useState } from "react";
import Button from "../ToolBar/Button";
import { BsLink45Deg, BsYoutube } from "react-icons/bs";

interface Props {
    onSubmit(link: string): void;
}

const EmbedYoutube: FC<Props> = ({ onSubmit }): JSX.Element => {
    const [url, setUrl] = useState('');
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleSubmit = () => {
        if (!url.trim()) return hideForm()

        onSubmit(url);
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
                <BsYoutube />
            </Button>

            {visible && <div className="absolute top-full right-0 mt-4 z-50">
                <div className="flex space-x-2">
                    <input type="text"
                        autoFocus
                        className="bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2 text-primary-dark dark:text-primary"
                        placeholder="https://www.youtube.com"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-action p-2 text-primary rounded text-sm">Embed</button>
                </div>
            </div>}
        </div>)
}

export default EmbedYoutube;