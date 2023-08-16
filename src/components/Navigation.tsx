'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Input,
} from '@material-tailwind/react';

type Props = {};

const Navigation = (props: Props) => {
  const [mobileActive, setMobileActive] = React.useState(false);

  return (
    <nav className=" relative  md:px-12 px-4  py-4 bg-[#fff] flex justify-between">
      <div className="flex w-[150px] h-auto relative  justify-center items-center">
        <Link href="/home">
          <Image src="/swom-logo.jpg" alt="logo" fill objectFit="contain" />
        </Link>
      </div>
      <div className="hidden lg:flex gap-8 align-middle">
        <Link className="m-auto" href="/how-it-works">
          HOW IT WORKS
        </Link>
        <Link className="m-auto" href="/messages">
          MESSAGES
        </Link>
        <Link className="m-auto" href="/profile">
          PROFILE
        </Link>
        <Link className="m-auto" href="/membership">
          MEMBERSHIP
        </Link>
        <Link className="m-auto" href="/listings">
          LISTINGS
        </Link>
        <button>US</button>
        <Link href="/">BECOME A MEMEBER</Link>
        <Link href="/">SIGN IN</Link>

        <Menu
          dismiss={{
            itemPress: false,
          }}>
          <MenuHandler>
            <Button className="bg-[#fff] shadow-none">
              <Image
                alt="search"
                width={20}
                height={20}
                src="/search-icon.svg"></Image>
            </Button>
          </MenuHandler>
          <MenuList>
            <Input
              crossOrigin=""
              type="text"
              label="Search"
              containerProps={{
                className: 'mb-4',
              }}
            />
            <MenuItem>Menu Item 1</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
            <MenuItem>Menu Item 3</MenuItem>
          </MenuList>
        </Menu>
      </div>

      <div className="lg:hidden">
        <button onClick={() => setMobileActive(!mobileActive)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.66667 3.33333H18.3333V5.83333H1.66667V3.33333ZM1.66667 8.33333H18.3333V10.8333H1.66667V8.33333ZM1.66667 13.3333H18.3333V15.8333H1.66667V13.3333Z"
              fill="#000000"
            />
          </svg>
        </button>
      </div>

      <div
        style={{
          maxHeight: mobileActive ? '100vh' : '0',
          borderTop: mobileActive ? '1px solid #a9a9a9' : 'none',
          padding: mobileActive ? '5px 0' : '0',
        }}
        className={`lg:hidden z-[10000] align-middle gap-4 box-border top-full flex flex-col justify-center text-center transition-all duration-300 ease-in-out overflow-hidden max-h-[100vh] left-0 bg-[#F4ECE8] w-full absolute`}>
        <button>US</button>
        <Link className="m-auto" href="/how-it-works">
          HOW IT WORKS
        </Link>
        <Link className="m-auto" href="/messages">
          MESSAGES
        </Link>
        <Link className="m-auto" href="/profile">
          PROFILE
        </Link>
        <Link className="m-auto" href="/membership">
          MEMBERSHIP
        </Link>
        <Link className="m-auto" href="/listings">
          LISTINGS
        </Link>
        <button>US</button>
        <Link className="m-auto" href="/">
          BECOME A MEMEBER
        </Link>
        <Link className="m-auto" href="/">
          SIGN IN
        </Link>
        <Menu
          dismiss={{
            itemPress: false,
          }}>
          <MenuHandler>
            <Button className="bg-[#fff] mx-auto shadow-none">
              <Image
                alt="search"
                width={20}
                height={20}
                src="/search-icon.svg"></Image>
            </Button>
          </MenuHandler>
          <MenuList>
            <Input
              crossOrigin=""
              type="text"
              label="Search"
              containerProps={{
                className: 'mb-4',
              }}
            />
            <MenuItem>Menu Item 1</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
            <MenuItem>Menu Item 3</MenuItem>
          </MenuList>
        </Menu>
        {/* <Image
            alt="search"
            width={20}
            height={20}
            src="/search-icon.svg"></Image> */}
        {/* </button> */}
      </div>
    </nav>
  );
};

export default Navigation;
