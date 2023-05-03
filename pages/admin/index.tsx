import AdminLayout from '@/components/layout/AdminLayout';
import { NextPage } from 'next';

interface Props { }


const Admin: NextPage<Props> = () => {
    return (
        <AdminLayout>
            <div>This is admin</div>
        </AdminLayout>
    )
}

export default Admin;