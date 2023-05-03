import { NextPage } from 'next';
import AdminNav from '@/components/common/AdminNav';
import {
    AiOutlineDashboard,
    AiOutlineContainer,
    AiOutlineTeam,
    AiOutlineMail
} from 'react-icons/ai'
interface Props {}

const navItems = [
    { label: 'Dashboard', icon: AiOutlineDashboard, href: '/admin' },
    { label: 'Posts', icon: AiOutlineContainer, href: '/admin/posts' },
    { label: 'Users', icon: AiOutlineTeam, href: '/admin/users' },
    { label: 'Comments', icon: AiOutlineMail, href: '/admin/comments' },
];

const Posts: NextPage<Props> = () => {
    return(
    <div className='dark'>
        <AdminNav navItems={navItems}/>
        posts
    </div>
        )
}

export default Posts;