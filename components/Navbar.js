import Link from 'next/link';
import style from './css/style.module.css';

const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <Link href="/">
                <a className={style.navbarbrand}>Catagories</a>
            </Link>
            <Link href="/new">
                <a className={style.create}>New Catagory</a>
            </Link>
        </nav>
    );
}

export default Navbar;