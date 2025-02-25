import React, { useState } from 'react'
import useUser from '../hooks/useUser';
import { Logo } from '../assets';
import { Link } from 'react-router-dom';
import { AnimatePresence , motion} from 'framer-motion';
import { PuffLoader } from 'react-spinners';

import {HiLogout} from "react-icons/hi"
import { FadeInOutWithOpacity, slideUpDownMenu } from '../animations';
import { auth } from '../config/firebase.config';
import { useQueryClient } from 'react-query';
import { adminIds } from '../utils/helpers';

const Header = () => {
  const {data , isLoading , isError} = useUser();
  const [isMenu, setIsMenu] = useState(false);
  
  const queryClient = useQueryClient()
  const signOutUser = async() => {
    await auth.signOut().then(() => {
      queryClient.setQueryData("user", null);

    });
  };
    
  return (
  <header className="w-full flex items-center justify-between px-4 py-3 lg:px border-b border-gray-300 bg-bgPrimary z-50 gap-12 sticky top-0">
    
    <Link to={"/"} >
    <img src = {Logo} className="w-8 h-auto object-contain" alt=""/> 
    </Link>
    {/* input */}
    <div className="flex-1 border border-gray-300 px-4 py-1 rounded-md flex items-center justify-between bg-gray-200">
      <input type="text" placeholder="Search here..." className="flex-1 h-10 bg-transparent text-base font-semibold outline-none border-none"/>
    </div>
    {/* profile section */}
    <AnimatePresence>
      {isLoading ? (
      <PuffLoader color="#498FCD" size={40} /> 
      ): (
      <React.Fragment> 
        {data ? (
        <motion.div {...FadeInOutWithOpacity} className="relative" 
        onClick={() => setIsMenu(!isMenu)}
        >
          {data?.photoURL ? (
          <div className="w-12 h-12 rounded-md relative flex items-center justify-center cursor-pointer  ">
            <img src={data?.photoURL} 
            className="w-full h-full object-cover rounded-md" referrerPolicy="no-referrer" 
            alt="" />

          </div> 

          ) : ( 
          <div className="w-12 h-12 rounded-md relative flex items-center justify-center bg-blue-700 shadow-md cursor-pointer ">
            <p className="text-lg text-white"> {data?.email[0]}</p>
            </div>
            )}

         {/* dropdown menu */}
      <AnimatePresence>
      {isMenu && (<motion.div 
     {...slideUpDownMenu}
      className="absolute px-4 py-3  rounded-md  bg-white
         right-0 top-14 flex flex-col items-center justify-start 
         gap-3 w-64 pt-12"  onMouseLeave={() => setIsMenu(false)}> 
          {data?.photoURL ? (
          <div className="w-20 h-20 rounded-full relative flex items-center  justify-center cursor-pointer  ">
            <img src={data?.photoURL } 
            className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" 
            alt="" />

         

          </div> 

          ) : ( 
          <div className="w-20 h-20 rounded-full relative flex items-center justify-center bg-blue-700 shadow-md cursor-pointer ">
            <p className="text-3xl text-white"> {data?.email[0]}</p>
            </div>
            )}
             {data?.displayName && (
            <p className="text-lg text-txtDark">
               {data?.displayName}
            </p>

          )}
          {/* menus */}

          <div className="w-full flex-col items-start flex gap-8 pt-6">
            <Link className="text-txtLight
             hover:text-txtDark text-base 
             whitespace-nowrap" to = {"/Profile"}>
              My Account</Link>
            
            {
              adminIds.includes(data?.uid) && (
                <Link className="text-txtLight
             hover:text-txtDark text-base 
             whitespace-nowrap" to = {"/template/create"}>
              Add New Template</Link>
              )
            }

              {/* sign out */}
          <div className="w-full px-2 py-2 border-t border-gray-300 flex items-center justify-between group cursor-pointer" onClick={signOutUser}>
            <p  className="group-hover:text-txtDark text text-txtLight" >Sign Out</p>
            <HiLogout className="group-hover:text-txtDark text text-txtLight" />

          </div>

          </div>

         </motion.div> )}
      </AnimatePresence>

        </motion.div> 
        ) : ( <Link to={"/auth"}>
          <motion.button className="px-4 py-2 rounded-md border border-gray-300 bg-gray-200 hover:shadow-md active:scale-95 duration-150" type="button"
          {...FadeInOutWithOpacity}
          >
            Login
            </motion.button>
            </Link>
            )}
      </React.Fragment>
      )}
    </AnimatePresence>
  </header>
  );
};

export default Header;