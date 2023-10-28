'use client';
import CarouselPage from '@/components/Carousel';
import DropZone from '@/components/DropZone';
import GoogleMapComponent from '@/components/GoogleMapComponent';
import { useStateContext } from '@/context/StateContext';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabaseClient } from '@/utils/supabaseClient';
import ProfilePicDropZone from '@/components/ProfilePicDropZone';

type Props = {};

const Page = (props: Props) => {
  const [editUserInfo, setEditUserInfo] = useState(false);
  const [userName, setUserName] = useState('');
  const [profession, setProfession] = useState('');
  const [age, setAge] = useState('');
  const [aboutYou, setAboutYou] = useState('');
  const { state, setState } = useStateContext();
  const [profileImage, setProfileImage] = useState<File[]>([]);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const supabase = supabaseClient();
  const [selectedImage, setSelectedImage] = useState(0); // Track selected image
  const aboutYourHomeRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      age: '',
      profession: '',
      location: '',
      city: '',
      otherDestinations: false,
      property: '',
      bedrooms: '',
      locatedIn: '',
      kindOfProperty: '',
      bathrooms: '',
      area: '',
      aboutYou: '',
      aboutYourHome: '',
      amenities: {
        bike: false, // Default value for the "bike" radio button
        car: false, // Default value for the "car" radio button
        tv: false, // Default value for the "tv" radio button
        dishwasher: false, // Default value for the "dishwasher" radio button
        pingpong: false, // Default value for the "pingpong" radio button
        billiards: false, // Default value for the "billiards" radio button
        washer: false, // Default value for the "washer" radio button
        dryer: false, // Default value for the "dryer" radio button
        wifi: false, // Default value for the "wifi" radio button
        elevator: false, // Default value for the "elevator" radio button
        terrace: false, // Default value for the "terrace" radio button
        scooter: false, // Default value for the "scooter" radio button
        bbq: false, // Default value for the "bbq" radio button
        computer: false, // Default value for the "computer" radio button
        piano: false, // Default value for the "piano" radio button
        pool: false, // Default value for the "pool" radio button
        playground: false, // Default value for the "playground" radio button
        babyGear: false, // Default value for the "babyGear" radio button
        ac: false, // Default value for the "ac" radio button
        fireplace: false, // Default value for the "fireplace" radio button
        parking: false, // Default value for the "parking" radio button
        hotTub: false, // Default value for the "hotTub" radio button
        sauna: false, // Default value for the "sauna" radio button
        other: false, // Default value for the "other" radio button
        doorman: false, // Default value for the "doorman" radio button
        cleaningService: false, // Default value for the "cleaningService" radio button
        videoGames: false, // Default value for the "videoGames" radio button
        tennisCourt: false, // Default value for the "tennisCourt" radio button
        gym: false,
      },
    },
  });

  const { ref, ...rest } = register('aboutYourHome');

  useEffect(() => {
    const textarea = aboutYourHomeRef.current;

    // Adjust the textarea's height based on its scrollHeight
    if (textarea) {
      textarea.style.height = 'auto'; // Set the starting height
      textarea.style.height = textarea.scrollHeight + 'px';

      // Set a maximum height of 300px
      if (textarea.scrollHeight > 300) {
        textarea.style.height = '300px';
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.overflowY = 'hidden';
      }
    }
  }, [watch('aboutYourHome')]);

  const onSubmit = async (data: any) => {
    console.log(data);

    // const { data: fileData, error: fileError } = await supabase.storage
    //   .from('listingImages')
    //   .upload(filePath, formData);

    // if (fileError) {
    //   console.log('file error', fileError);
    // }

    // if (fileError?.message == 'The resource already exists') {
    //   const { data: fileData, error: fileError } = await supabase.storage
    //     .from('listingImages')
    //     .update(filePath, formData);
    //   console.log('file updated', fileData);
    // } else {
    //   console.log('file data', fileData);
    // }
  };

  const onError = (errors: any, e: any) => {
    console.log(errors, e);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="bg-[#F7F1EE] relative">
      <div className="py-8 px-8 md:px-16 flex-col md:flex-row flex justify-center">
        <div className="md:w-1/4 my-4 flex justify-center text-center flex-col">
          {editUserInfo ? (
            <>
              <ProfilePicDropZone setProfileImage={setProfileImage} />
              <div className="px-4 flex gap-2 flex-col">
                <input
                  className="bg-transparent border-b border-[#172544] focus:outline-none"
                  placeholder="Name"
                  {...register('name')}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  className="bg-transparent border-b border-[#172544] focus:outline-none"
                  placeholder="Profession"
                  {...register('profession')}
                  onChange={(e) => setProfession(e.target.value)}
                />
                <input
                  className="bg-transparent border-b border-[#172544] focus:outline-none"
                  placeholder="Age"
                  {...register('age')}
                  onChange={(e) => setAge(e.target.value)}
                />
                {/* save button */}
                <button
                  onClick={() => {
                    setEditUserInfo(!editUserInfo);
                  }}>
                  Close
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="relative w-[80px] my-4 mx-auto h-[80px]">
                <Image
                  src={
                    profileImage.length > 0
                      ? URL.createObjectURL(profileImage[0])
                      : '/placeholder.png'
                  }
                  alt="hero"
                  fill
                  objectPosition="center"
                  // objectFit="cover"
                  className="object-cover rounded-full"
                />
                <div className="absolute bg-[#F87C1B] rounded-full w-[30px] -right-2 align-middle my-auto flex h-[30px]">
                  <button
                    onClick={() => {
                      setEditUserInfo(!editUserInfo);
                    }}>
                    <Image
                      fill
                      // objectFit="contain"
                      className="m-auto filter-invert object-contain"
                      src="https://img.icons8.com/ios/50/000000/pencil-tip.png"
                      alt=""
                    />
                  </button>
                </div>
              </div>

              <h2 className="font-serif text-4xl ">
                {userName ? userName : 'Name'}
              </h2>
              <p className="font-sans my-1 font-bold uppercase tracking-[0.1rem]">
                {profession ? profession : 'Profession'}
              </p>
              <p className="font-sans  uppercase">{age ? age : 'Age'}</p>
            </>
          )}
        </div>
        <div className="md:w-3/4">
          <div className="grid py-2 text-center grid-cols-5 border-b border-[#172544]">
            <h3>First Name</h3>
            <h3>Last Name</h3>
            <h3>User Name</h3>
            <h3>Age</h3>
            <h3>Profession</h3>
          </div>
          <div className="grid py-2 text-center grid-cols-5 border-b border-[#172544]">
            <h3>{userName ? userName.split(' ')[0] : 'First Name'}</h3>
            <h3>{userName ? userName.split(' ')[1] : 'Last Name'}</h3>
            <h3>XX</h3>
            <h3>
              {age ? age : 'Age'} {age ? 'years' : ''}
            </h3>
            <h3>{profession ? profession : 'Profession'}</h3>
          </div>
          <div className="flex justify-between py-2 border-b border-[#172544]">
            <h2>About you</h2>

            <button
              type="button"
              onClick={() => {
                setState({ ...state, aboutYou: !state.aboutYou });
              }}>
              <div className="relative w-[30px] align-middle my-auto flex h-[30px]">
                <Image
                  fill
                  // objectFit="contain"
                  className="m-auto object-contain"
                  src="https://img.icons8.com/ios/50/000000/pencil-tip.png"
                  alt=""
                />
              </div>
            </button>
          </div>
          {state.aboutYou ? (
            <textarea
              {...register('aboutYou')}
              onChange={(e) => setAboutYou(e.target.value)}
              placeholder="Tell us more about you."
              className="bg-transparent w-full my-4 p-2 outline-none border-b border-[#c5c5c5]"
            />
          ) : (
            <p className="my-4">
              {aboutYou ? aboutYou : 'Tell us more about you.'}
            </p>
          )}

          <div className="flex flex-col md:flex-row gap-8 py-4 border-y border-[#172544]">
            <h4 className="text-2xl font-serif italic">
              Where would you like to go?
            </h4>

            <select
              {...register('location')}
              className="bg-transparent focus:outline-none  rounded-xl border w-1/3 border-[#172544]">
              <option value="bogota">Bogota, Colombia</option>
              <option value="paris">Paris, France</option>
              <option value="london">London, England</option>
              <option value="newYork">New York, USA</option>
              <option value="tokyo">Tokyo, Japan</option>
              <option value="sydney">Sydney, Australia</option>
              <option value="dubai">Dubai, UAE</option>
              <option value="rome">Rome, Italy</option>
              <option value="barcelona">Barcelona, Spain</option>
              <option value="berlin">Berlin, Germany</option>
              <option value="amsterdam">Amsterdam, Netherlands</option>
              <option value="madrid">Madrid, Spain</option>
              <option value="miami">Miami, USA</option>
              <option value="istanbul">Istanbul, Turkey</option>
              <option value="singapore">Singapore, Singapore</option>
            </select>
          </div>

          <div className="flex flex-col justify-between py-4 ">
            <h4 className="text-2xl font-serif italic">
              Open to other destinations?
            </h4>
            <div className="flex my-2">
              <input
                className="appearance-none h-fit my-auto bg-transparent checked:bg-[#7F8119] rounded-full border border-[#172544] p-2 mx-2"
                type="radio"
                id="yesRadio"
                {...register('otherDestinations')}
              />
              <label htmlFor="yesRadio">Yes</label>

              <input
                className="appearance-none ml-4 h-fit my-auto bg-transparent checked:bg-[#7F8119] rounded-full border border-[#172544] p-2 mx-2"
                type="radio"
                id="noRadio"
                {...register('otherDestinations')}
              />
              <label htmlFor="noRadio">No</label>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col px-8 md:px-16 m-auto">
        <div className="flex my-4 flex-col md:flex-row border-y border-[#172544] py-4 justify-between">
          <h2 className="text-xl">Cartagena, Colombia</h2>
          <div className="flex gap-2 justify-evenly">
            <div className="relative w-[20px] my-auto h-[20px]">
              <Image
                fill
                // objectFit="contain"
                className="h-full object-contain"
                src="/logo-icons.png"
                alt=""
              />
            </div>
            <h2 className="text-xl my-auto font-sans">
              Listing <span className="font-bold">No. XXX</span>
            </h2>
            <button
              className="ml-4 bg-[#FE8217] my-auto py-2 px-4 text-white rounded-xl"
              onClick={() => {
                setState({ ...state, imgUploadPopUp: !state.imgUploadPopUp });
              }}
              type="button">
              Upload Photos
            </button>

            {state.imgUploadPopUp && (
              <DropZone imageFiles={imageFiles} setImageFiles={setImageFiles} />
            )}
          </div>
        </div>
        <div>
          {imageFiles.length > 0 && (
            <>
              <div className="relative mt-8 mb-6 w-[95%] mx-auto h-[50vh]">
                <Image
                  src={
                    imageFiles[selectedImage]
                      ? URL.createObjectURL(imageFiles[selectedImage])
                      : '/placeholder.png'
                  }
                  alt=""
                  className="rounded-3xl object-contain"
                  fill
                  objectPosition="center"
                />
              </div>

              <div className="relative w-[95%] mx-auto h-[30vh]">
                <CarouselPage
                  picturesPerSlide={3}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  overlay={false}
                  contain={true}
                  images={imageFiles.map((file) => ({
                    src: URL.createObjectURL(file),
                  }))}
                />
              </div>
            </>
          )}

          <div className="flex my-4  border-b border-[#172544] py-4 justify-between">
            <h2 className="text-xl italic font-serif">Name of the city</h2>
          </div>

          <div className="w-full flex p-2 my-4  rounded-xl border border-[#172544]">
            <input
              className=" bg-transparent w-full outline-none"
              type="text"
              placeholder="What's the city?"
              {...register('city')}
            />
            <img
              className="w-[20px] my-auto h-[20px]"
              src="/search-icon.svg"
              alt=""
            />
          </div>
        </div>
        <p className="font-sans text-sm my-6">
          Cartagena, Colombia, is a vibrant coastal city on the northern
          Caribbean coast. Known for its rich history, colonial architecture,
          and stunning beaches, it&apos;s a popular tourist destination. The
          city&apos;s walled Old Town, a UNESCO World Heritage site, is a maze
          of colorful buildings, cobbled streets, and charming squares. Visitors
          can explore historic forts like Castillo San Felipe de Barajas, enjoy
          local cuisine, and soak up the lively atmosphere. Cartagena offers a
          unique blend of history, culture, and natural beauty.
        </p>

        <div className="flex my-4  border-y border-[#172544] py-4 justify-between">
          <h2 className="text-xl italic font-serif">Tell us about your home</h2>
        </div>

        <textarea
          {...rest}
          name="aboutYourHome"
          ref={(e) => {
            ref(e);
            aboutYourHomeRef.current = e;
          }}
          // i want the rows to only be present when no input is present in the textarea and no rows when there is input
          className="w-full h-fit max-h-[300px] my-4 p-2 bg-transparent outline-none border-b border-[#c5c5c5] resize-none"
          placeholder="Villa linda is dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hen. Lorem ipsum dolor sit amet,
          consec- tetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat."></textarea>

        <div className="px-8 py-4 flex flex-col md:flex-row border rounded-xl my-8 border-[#172544]">
          <div className="flex flex-col text-center justify-center py-2 md:py-0 h-full md:w-1/3 border-b md:border-b-0 md:border-r border-[#172544]">
            <label className="font-bold" htmlFor="property">
              Type of property*
            </label>
            <select
              className="w-fit m-auto bg-transparent outline-none p-2 my-2 rounded-lg border-[#172544] border"
              {...register('property')}
              id="property">
              <option value="">House</option>
              <option value="">Apartment</option>
              <option value="">Condo</option>
              <option value="">Townhouse</option>
            </select>
          </div>

          <div className="flex flex-col text-center justify-center h-full py-2 md:py-0 md:w-1/3 border-b md:border-b-0 md:border-r border-[#172544]">
            <label className="font-bold" htmlFor="bedrooms">
              Bedrooms
            </label>
            <select
              className="w-fit m-auto bg-transparent outline-none p-2 my-2 rounded-lg border-[#172544] border"
              {...register('bedrooms')}
              id="bedrooms">
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4+</option>
            </select>
          </div>

          <div className="flex flex-col text-center justify-center h-full border-b  py-2 md:py-0 md:w-1/3 ">
            <label className="font-bold" htmlFor="locatedIn">
              Property located in
            </label>
            <select
              className="w-fit m-auto bg-transparent outline-none p-2 my-2 rounded-lg border-[#172544] border"
              {...register('locatedIn')}
              id="locatedIn">
              <option value="">a condiminium</option>
              <option value="">a gated community</option>
              <option value="">a neighborhood</option>
              <option value="">a rural area</option>
            </select>
          </div>
        </div>

        <div className="px-8 py-4 flex flex-col md:flex-row border rounded-xl my-8 border-[#172544]">
          <div className="flex flex-col py-2 md:py-0 text-center justify-center h-full md:w-1/3 border-b md:border-b-0 md:border-r border-[#172544]">
            <label className="font-bold" htmlFor="kindOfProperty">
              Kind of property
            </label>
            <select
              className="w-fit m-auto bg-transparent outline-none p-2 my-2 rounded-lg border-[#172544] border"
              {...register('kindOfProperty')}
              id="kindOfProperty">
              <option value="">Main property </option>
              <option value="">Second property</option>
              <option value="">Third property</option>
            </select>
          </div>

          <div className="flex flex-col text-center py-2 md:py-0 justify-center h-full border-b md:w-1/3 md:border-b-0 md:border-r border-[#172544]">
            <label className="font-bold" htmlFor="bathrooms">
              Bathrooms
            </label>
            <select
              className="w-fit m-auto bg-transparent outline-none p-2 my-2 rounded-lg border-[#172544] border"
              {...register('bathrooms')}
              id="bathrooms">
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4+</option>
            </select>
          </div>

          <div className="flex flex-col py-2 md:py-0 text-center justify-center h-full md:w-1/3 ">
            <label className="font-bold" htmlFor="area">
              Area
            </label>
            <select
              className="w-fit m-auto bg-transparent outline-none p-2 my-2 rounded-lg border-[#172544] border"
              {...register('area')}
              id="area">
              <option value="">60 - 100 m2</option>
              <option value="">100 - 150 m2</option>
              <option value="">150 - 200 m2</option>
              <option value="">200 - 250 m2</option>
              <option value="">250 - 300 m2</option>
              <option value="">300 - 350 m2</option>
              <option value="">350 - 400 m2</option>
              <option value="">400 - 450 m2</option>
              <option value="">450 - 500 m2</option>
              <option value="">500 - 550 m2</option>
              <option value="">550 - 600 m2</option>
            </select>
          </div>
        </div>
        <div className="flex my-4  border-y border-[#172544] py-4 justify-between">
          <h2 className="text-xl  font-serif">Where is it?</h2>
        </div>

        <input className="w-full rounded-xl p-2 outline-none" type="text" />

        <div className={`w-full h-[30vh] my-4 rounded-xl`}>
          <GoogleMapComponent city="Colombia" />
        </div>

        <div className="flex my-4  border-y border-[#172544] py-4 justify-between">
          <h2 className="text-xl  font-serif">Amenities and advantages</h2>
        </div>

        <div className="flex flex-wrap pb-8">
          <div className="md:w-1/5 w-1/2 gap-2 flex flex-col">
            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.bike')}
                id="bike"
              />
              <label className="" htmlFor="bike">
                Bike
              </label>
            </div>
            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.car')}
                id="car"
              />
              <label className="" htmlFor="car">
                Car
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.tv')}
                id="tv"
              />
              <label className="" htmlFor="tv">
                TV
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.dishwasher')}
                id="dishwasher"
              />
              <label className="" htmlFor="dishwasher">
                Dishwasher
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.pingpong')}
                id="pingpong"
              />
              <label className="" htmlFor="pinpong">
                Ping pong
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.billiards')}
                id="billiards"
              />
              <label className="" htmlFor="billiards">
                Billiards
              </label>
            </div>
          </div>

          <div className="md:w-1/5 w-1/2 gap-2 flex flex-col">
            <div className="gap-2 flex">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.washer')}
                id="washer"
              />
              <label className="" htmlFor="washer">
                Washer
              </label>
            </div>
            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.dryer')}
                id="dryer"
              />
              <label className="" htmlFor="dryer">
                Dryer
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.wifi')}
                id="wifi"
              />
              <label className="" htmlFor="wifi">
                Wifi
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.elevator')}
                id="elevator"
              />
              <label className="" htmlFor="elevator">
                Elevator
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.terrace')}
                id="terrace"
              />
              <label className="" htmlFor="terrace">
                Terrace
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.scooter')}
                id="scooter"
              />
              <label className="" htmlFor="scooter">
                Scooter
              </label>
            </div>
          </div>

          <div className="md:w-1/5 w-1/2 gap-2 flex flex-col">
            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.bbq')}
                id="bbq"
              />
              <label className="" htmlFor="bbq">
                BBQ
              </label>
            </div>
            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.computer')}
                id="computer"
              />
              <label className="" htmlFor="computer">
                Home Computer
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                {...register('amenities.piano')}
                type="checkbox"
                id="wc"
              />
              <label className="" htmlFor="wc">
                WC Access
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.pool')}
                id="pool"
              />
              <label className="" htmlFor="pool">
                Pool
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.playground')}
                id="playground"
              />
              <label className="" htmlFor="playground">
                Playground
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.babyGear')}
                id="babyGear"
              />
              <label className="" htmlFor="babyGear">
                Baby gear
              </label>
            </div>
          </div>

          <div className="md:w-1/5 w-1/2 gap-2 flex flex-col">
            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.ac')}
                id="ac"
              />
              <label className="" htmlFor="ac">
                AC
              </label>
            </div>
            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.fireplace')}
                id="fireplace"
              />
              <label className="" htmlFor="fireplace">
                Fireplace
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.parking')}
                id="parking"
              />
              <label className="" htmlFor="parking">
                Private parking
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.hotTub')}
                id="hotTub"
              />
              <label className="" htmlFor="hotTub">
                Hot tub
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.sauna')}
                id="sauna"
              />
              <label className="" htmlFor="sauna">
                Sauna
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.other')}
                id="other"
              />
              <label className="" htmlFor="other">
                Other...
              </label>
            </div>
          </div>

          <div className="md:w-1/5 w-1/2 gap-2 flex flex-col">
            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.doorman')}
                id="doorman"
              />
              <label className="" htmlFor="doorman">
                Doorman
              </label>
            </div>
            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.cleaningService')}
                id="cleaningService"
              />
              <label className="" htmlFor="cleaningService">
                Cleaning service
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.videoGames')}
                id="videoGames"
              />
              <label className="" htmlFor="videoGames">
                Video games
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.tennisCourt')}
                id="tennisCourt"
              />
              <label className="" htmlFor="tennisCourt">
                Tennis court
              </label>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-transparent checked:bg-[#7F8119] appearance-none border border-[#172544] rounded-xl p-[6px] my-auto"
                type="checkbox"
                {...register('amenities.gym')}
                id="gym"
              />
              <label className="" htmlFor="gym">
                Gym
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="uppercase mb-8 mx-auto rounded-lg w-fit text-white text-lg px-4 font-extralight bg-[#F87C1B] py-2">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Page;
