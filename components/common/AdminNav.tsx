import Link from 'next/link';
import { FC, useEffect, useRef } from 'react';
import Logo from './Logo';
import {
    AiOutlineDashboard,
    AiOutlineContainer,
    AiOutlineTeam,
    AiOutlineMail
} from 'react-icons/ai'
// import { GrDashboard } from 'react-icons/gr'
import { IconType } from 'react-icons';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import { useState } from 'react';


interface Props {
    navItems: { label: string, icon: IconType, href: string }[]
}

const NAV_OPEN_WIDTH = 'w-60'
const NAV_CLOSE_WIDTH = 'w-12'
const NAV_VISIBILITY = 'nav-visibility'
const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
    const navRef = useRef<HTMLElement>(null)
    const [visible, setVisible] = useState(true)

    const toggleNav = (visibility: boolean) => {
        const currentNav = navRef.current 
        // navRef.current?.style
        if(!currentNav) return;

        const { classList } = currentNav
        if(visibility){
            // hide nav
            classList.remove(NAV_OPEN_WIDTH)
            classList.add(NAV_CLOSE_WIDTH)
        }
        else {
            // show nav
            classList.add(NAV_OPEN_WIDTH)
            classList.remove(NAV_CLOSE_WIDTH)
        }
    }
    const updateNavState = () => {
        toggleNav(visible)
        const newState = !visible
        setVisible(newState);
        localStorage.setItem(NAV_VISIBILITY, JSON.stringify(newState))
    }

    useEffect(() => {
        const visibility = localStorage.getItem(NAV_VISIBILITY)
        if(visibility !== null){
            const parsedVisibility = JSON.parse(visibility)
            setVisible(parsedVisibility)
            toggleNav(!parsedVisibility)
        }
        else{
            // toggleNav(true)
            setVisible(true)
        }
    }, [])
    
    return (
        <nav ref={navRef} className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark
        flex flex-col justify-between transition-width overflow-hidden sticky top-0">
            {/* logo */}
            <div>

                <Link href="/admin">
                    <div className='flex items-center space-x-2 p-3 mb-10'>
                        <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />
                        {visible && <span className='fill-highlight-light dark:fill-highlight-dark text-xl font-semibold leading-none'>Admin</span>}
                    </div >
                </Link>

                {/* nav items */}

                <div className="space-y-6">
                    {navItems.map((item) => {
                        return <Link key={item.href} href={item.href}>
                            <div className='flex items-center fill-highlight-light dark:fill-highlight-dark text-xl p-3 hover:scale-[0.98] transition'>

                                <item.icon size={24} />
                                {visible && <span className='ml-2 leading-none'>{item.label}</span>}
                            </div>
                        </Link>
                    })}
                </div>
            </div>

            {/* menu button */}
            <button onClick={updateNavState} className='fill-highlight-light dark:fill-highlight-dark p-3 hover:scale-[0.98] transition
            self-end'>
                {visible ? <RiMenuFoldFill size={25} /> : <RiMenuUnfoldFill size={25} />}
            </button>

        </nav>
    );
};

export default AdminNav;