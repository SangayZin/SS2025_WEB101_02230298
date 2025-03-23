import { Home } from "lucide-react"; // Removed the Heart icon import
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};
export default Sidebar;

// DesktopSidebar component for larger screens
const DesktopSidebar = () => {
  return (
    <div className='p-3 md:p-10 border-r min-h-screen w-24 md:w-64 hidden sm:block'>
      <div className='flex flex-col gap-20 sticky top-10 left-0'>
        <div className='w-full'>
          {/* Logo for desktop and mobile views */}
          <img src='/image.png' alt='logo' className='hidden md:block' />
          <img src='/mobile-logo.svg' alt='logo' className='block md:hidden' />
        </div>
        <ul className='flex flex-col items-center md:items-start gap-8'>
          {/* Link to Home page */}
          <Link to={'/'} className='flex gap-1'>
            <Home size={'24'} />
            <span className='font-bold hidden md:block'>Home</span>
          </Link>
        </ul>
      </div>
    </div>
  );
};

// MobileSidebar component for smaller screens
const MobileSidebar = () => {
  return (
    <div
      className='flex justify-center gap-10 border-b fixed w-full top-0 left-0 bg-white z-10 p-2 sm:hidden'
    >
      {/* Link to Home page */}
      <Link to={'/'}>
        <Home size={'24'} className='cursor-pointer' />
      </Link>
    </div>
  );
};
