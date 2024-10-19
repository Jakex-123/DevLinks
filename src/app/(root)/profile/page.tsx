// @ts-nocheck
"use client"
import { getUser } from '@/actions/User.action';
import { LinkType } from '@/types/types';
import React, { useEffect, useState } from 'react';
import { userDataProps } from '../../../types/types';
import { formatPlatformName } from '../../../utils/options';
import Image from 'next/image';


const Profile = () => {
  const [user, setUser] = useState<userDataProps>({
    name: '',
    email: '',
    image: '',
    links:[] // URL or path to the user's image
  });


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let userData:userDataProps = await getUser();
        userData =JSON.parse(userData) // Fetch user data
        setUser({
          name: userData?.name || '',
          email: userData?.email || '',
          image: userData?.image || '',
          links: userData?.links || [], // Ensure links is an array
        });
      } catch (err) {
        console.error(err);
        // @ts-nocheck
        setError(err.message); // Set error state
      }
    };
    fetchUserData();
    console.log(user)
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <img
        src={user.image}
        alt={user.name}
        className="w-32 h-32 rounded-full mb-4"
      />
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <h3 className='text-xl font-bold'>Links</h3>
      {user?.links?.length > 0 ? (
  user.links.map((linkGroup:LinkType[], index:number) => (
    <div key={index} className="mb-4 w-64 p-4 flex items-center justify-center flex-col border rounded-lg shadow-md bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Link Group {index + 1}</h3>
        {linkGroup.map((link:LinkType, linkIndex:number) => (
          <div key={linkIndex} className="text-gray-700 flex gap-2 list-none	">
            <Image src={`/images/icon-${link.platform}.svg`} width={20} height={20}/>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              
               {formatPlatformName(link.platform)}
            </a>
          </div>
        ))}
    </div>
  ))
) : (
  <div className="text-gray-500">No links to show</div>
)}
    </div>
  );
};

export default Profile;
