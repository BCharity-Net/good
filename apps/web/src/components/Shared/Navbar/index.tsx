import type { FC, ReactNode } from 'react';

import NavPost from '@components/Composer/Post/NavPost';
import Search from '@components/Search';
import cn from '@good/ui/cn';
import {
  BellIcon as BellIconOutline,
  EnvelopeIcon as EnvelopeIconOutline,
  HomeIcon as HomeIconOutline,
  MagnifyingGlassIcon as MagnifyingGlassIconOutline
} from '@heroicons/react/24/outline';
import {
  BellIcon as BellIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { usePreferencesStore } from 'src/store/non-persisted/usePreferencesStore';
import { useFeatureFlagsStore } from 'src/store/persisted/useFeatureFlagsStore';
import { useProfileStore } from 'src/store/persisted/useProfileStore';
import styled from 'styled-components';

import LoginButton from '../LoginButton';
import MenuItems from './MenuItems';
import MobileLogoButton from './MobileLogoButton';
import ModIcon from './ModIcon';
import MoreNavItems from './MoreNavItems';
import SignupButton from './SignupButton';
import StaffBar from './StaffBar';
import CreateCommunities from '@components/Communities/CreateCommunites';
import ErrorMsg from '@components/Communities/StatusMessages/ErrorMsg';
import SuccessMsg from '@components/Communities/StatusMessages/SuccessMsg';
import Success from '../Auth/Signup/Success';
import Error from 'next/error';
import { ErrorMessage } from '@good/ui';

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  .nav-text,
  .auth-buttons {
  display: block;
}

@media (max-width: 1024px) {
    .nav-text,
    .auth-buttons {
    display: none;
  }
}

  .hide-on-mobile {
  display: block; 
}


@media (max-width: 760px) {
  .hide-on-mobile {
    display: none; 
  }
}


  .display-on-mobile {
  display: none; 
}

@media (max-width: 760px) {
    .display-on-mobile {
    display: block; 
    }
  }

}


`;

const BottomButtonsContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const PostButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #da5597;
  color: white;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;

  @media (max-width: 430px) {
    display: none;
  }
`;

const MobilePostButton = styled.button`
  display: none;

  @media (max-width: 430px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #da5597;
    color: white;
    width: 56px;
    height: 56px;
    position: fixed;
    bottom: 80px;
    right: 20px;
    z-index: 10;
    font-size: 2rem;
  }
`;

const Navbar: FC = () => {
  const { currentProfile } = useProfileStore();
  const { staffMode } = useFeatureFlagsStore();
  const { appIcon } = usePreferencesStore();
  const [showSearch, setShowSearch] = useState(false);
  const [isShortScreen, setIsShortScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsShortScreen(window.innerHeight < 500);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  interface NavItemProps {
    current: boolean;
    icon: ReactNode;
    name: string;
    url: string;
  }

  const NavItem: FC<NavItemProps> = ({ current, icon, name, url }) => {
    return (
      <Link
        className={cn(
          'mb-4 flex cursor-pointer items-start space-x-2 rounded-md px-2 py-1 hover:bg-gray-300/20 md:flex',
          {
            'bg-gray-200 text-black dark:bg-gray-800 dark:text-white': current,
            'text-gray-700 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white':
              !current
          }
        )}
        href={url}
      >
        {icon}
        <div className="nav-text text-black dark:text-white">
          <span className={`text-xl ${current ? 'font-bold' : ''}`}>
            {name}
          </span>
        </div>
      </Link>
    );
  };

  const NavItems = () => {
    const { pathname } = useRouter();
    return (
      <>
        <NavItem
          current={pathname === '/'}
          icon={
            pathname === '/' ? (
              <HomeIconSolid className="size-8" />
            ) : (
              <HomeIconOutline className="size-8" />
            )
          }
          name="Home"
          url="/"
        />
        <NavItem
          current={pathname === '/explore'}
          icon={
            pathname === '/explore' ? (
              <MagnifyingGlassIconSolid className="size-8" />
            ) : (
              <MagnifyingGlassIconOutline className="size-8" />
            )
          }
          name="Explore"
          url="/explore"
        />
        <NavItem
          current={pathname === '/notifications'}
          icon={
            pathname === '/notifications' ? (
              <BellIconSolid className="size-8" />
            ) : (
              <BellIconOutline className="size-8" />
            )
          }
          name="Notifications"
          url="/notifications"
        />
        <NavItem
          current={pathname === '/messages'}
          icon={
            pathname === '/messages' ? (
              <EnvelopeIconSolid className="size-8" />
            ) : (
              <EnvelopeIconOutline className="size-8" />
            )
          }
          name="Messages"
          url="/messages"
        />
        <MoreNavItems />
      </>
    );
  };

  return (
    <header className="sticky top-0 z-10 min-w-fit bg-white dark:bg-black">
      {staffMode ? <StaffBar /> : null}
      <NavbarContainer className="container mx-auto w-1/12">
        <div className="relative flex h-full w-1/12 flex-col items-start justify-start">
          <button
            className="hide-on-mobile inline-flex items-start justify-start rounded-md text-gray-500 focus:outline-none md:hidden"
            onClick={() => setShowSearch(!showSearch)}
            type="button"
          />
          <Link className="hide-on-mobile" href="/">
            <div className="text-white-900 inline-flex flex-grow items-start justify-start font-bold">
              <div className="ml-6 text-3xl font-black">
                <img
                  alt="Logo"
                  className="h-12 w-12"
                  src="apps/web/public/logo1.svg"
                />
              </div>
              <span className="nav-text ml-3 mr-3 flex flex-grow">
                Goodcast
              </span>
            </div>
          </Link>
          <div className="display-on-mobile">
            <MobileLogoButton />
          </div>

          <div className="hidden max-h-[70vh] overflow-y-auto pr-4 pt-5 sm:ml-6 md:block">
            <div className="relative flex h-fit flex-col items-start">
              <NavItems />
              <div className="desktop-post-button mt-5 w-full">
                <NavPost />
               <CreateCommunities/>
                {/**  
                <SuccessMsg/>
                <ErrorMsg/>
                 */}
                
                
               
               
                {!currentProfile ? <LoginButton /> : null}
                {!currentProfile ? <SignupButton /> : null}
                <div
                  className={
                    isShortScreen
                      ? 'mt-4 flex items-start justify-between'
                      : 'fixed bottom-0 md:fixed'
                  }
                >
                  <Link
                    className={cn(
                      'max-h-[100vh] md:hidden',
                      !currentProfile?.id && 'ml-[60px]'
                    )}
                    href="/"
                  >
                    <img
                      alt="Logo"
                      className="size-7"
                      height={32}
                      src="/logo.png" //{`${STATIC_IMAGES_URL}/app-icon/${appIcon}.png`}
                      width={32}
                    />
                  </Link>
                  <div
                    className="mt-4 flex items-start justify-between"
                    id="profile"
                  >
                    <div className="flex items-center gap-2">
                      {currentProfile ? <MenuItems /> : null}
                      <ModIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NavbarContainer>
      <MobilePostButton className="mobile-post-button">+</MobilePostButton>
      {showSearch ? (
        <div className="m-3 md:hidden">
          <Search />
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
