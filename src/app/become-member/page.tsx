import Image from 'next/image';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <main className="min-h-screen relative flex flex-col">
      <div className="flex w-full bg-[#F3EBE7] h-[75vh]">
        <div className="relative w-[40%] h-full">
          <Image
            objectFit="cover"
            fill
            src="/membership/membership.webp"
            className="rounded-r-[20%]"
            alt=""
          />
        </div>
        <div className="w-[60%] text-center justify-center flex flex-col p-8 align-middle h-fit m-auto">
          <div className="w-2/3 m-auto">
            <div className="w-full m-auto h-[1px] border-[1px] border-black" />
            <h1 className="text-5xl my-6 tracking-[0.2rem]">
              How to become <br /> <span className="italic">a member</span>
            </h1>
            <div className="w-full m-auto h-[1px] border-[1px] border-black" />

            <p className=" m-auto my-8 text-lg">
              Fill out the questionnaire. That is all. This will help us to get
              to know you better. In it, you will be asked questions about your
              property that are easy to answer. It will take you 6 minutes to
              complete. Once we will review your application we will get back to
              you.
            </p>
            <button className="bg-[#E78426] hover:bg-[#e78326d8] text-[#fff] font-bold px-4 py-2 rounded-3xl">
              Apply now
            </button>
          </div>
        </div>
      </div>
      <p className="mt-14 m-auto ml-[10vw] justify-center flex w-[40%]">
        SWOM&apos;s selection process is rigorous and highly selective. All
        applicants must pass a screening process that verifies their
        trustworthiness, reveals their familiarity with family and friends, and
        assesses how well they fit into the design values of the community. Read
        our terms and conditions
      </p>
      <div className="  h-[45vh]  w-1/4 z-10 right-0 bottom-0 absolute">
        <Image
          src="/profile/profile-bg.png"
          alt="hero"
          fill
          objectFit="contain"
        />
      </div>
    </main>
  );
};

export default Page;