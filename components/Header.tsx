'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {MagnifyingGlassIcon, UserCircleIcon} from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
import { useBoardStore } from '@/store/BoardStore'


const Header = () => {

  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString, state.setSearchString
  ]);


  

  return (
    <>
    {/* // Using super css to make the presentation prettier */}
    <div className = "flex flex-col md:flex-row p-5 items-center bg-gray-500/10 rounded-b-2xl">

      {/* Invisible div that willa ct as a gradient for us */}
      <div
       className =" absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50"
      />
    <header>
      <Image 
       src = "https://links.papareact.com/c2cdd5"
       alt = "Trello Logo"
       width = {300}
       height = {100}
       className = "w-44 md:w-56 pb-10 md:pb-0 object-contain"
      />
    </header>
    
    {/* Adding extra CSS  */}
    <div className ="flex items-center space-x-5 flex-1 justify-end w-full">
        {/* Search Box */}
        {/* adjusting the form css */}
         <form className = "flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            {/* Setting up the ehro icons and form part of the header with image */}
            <MagnifyingGlassIcon className = "h-6 w-6 text-gray-400" />
            {/* flex-1 tells the code to take the maximum length that is available to the child */}
            <input type="text" placeholder = "Search" className = "flex-1 outline-none p-2" value = {searchString} onChange={(e) => setSearchString(e.target.value)}/>
            <button type = "submit" hidden>Search</button>
         </form>
        {/* Avatar */}
         <Avatar name = "Samik Gahatraj" round size= "50" color = "#0055D1"/>
    </div>
    </div>
     {/* // Suggestion Box that gives summaries */}
     <div className = "flex items-center justify-center px-5 md: py-5">
      <p className = "flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
        <UserCircleIcon className = {`inline-block h-10 w-10 text-[#0055D1] mr-1
         ${"animate-spin"}
        `}/>
        Your tasks for today!
      </p>
    </div>
    </>
  )
}

export default Header
