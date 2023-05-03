import { FC } from "react";

interface Props { 
    className?: string;
 }

const Logo: FC<Props> = ({ className }) => (
    <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    xmlns="http:/www.w3.org/2000/svg"
    className={className}
    >

    </svg>
)


export default Logo;