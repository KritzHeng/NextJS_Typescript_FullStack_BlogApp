import { FC, ReactNode } from 'react';
import AdminNav from '../common/AdminNav';
import {
    AiOutlineDashboard,
    AiOutlineContainer,
    AiOutlineTeam,
    AiOutlineMail,
    AiOutlineFileAdd,
} from 'react-icons/ai'
import Link from 'next/link';

interface Props {
    children: ReactNode;
}

const navItems = [
    { label: 'Dashboard', icon: AiOutlineDashboard, href: '/admin' },
    { label: 'Posts', icon: AiOutlineContainer, href: '/admin/posts' },
    { label: 'Users', icon: AiOutlineTeam, href: '/admin/users' },
    { label: 'Comments', icon: AiOutlineMail, href: '/admin/comments' },
];
const AdminLayout: FC<Props> = ({ children }): JSX.Element => {
    return (
        <div className="flex">
            <AdminNav navItems={navItems} />
            <div className="flex-1 p-4">
                {children}
            </div>
            {/* create button */}
            <Link href='/admin/post/create'>
                <div className="bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary fixed z-10 right-10 bottom-10 p-3 rounded-full 
                hover:scale-90 sgadiw-sm transition">
                    <AiOutlineFileAdd size={24} />
                </div>
            </Link>
        </div>
    )
}

export default AdminLayout;