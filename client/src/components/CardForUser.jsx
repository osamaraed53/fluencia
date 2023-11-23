import React from 'react'

const CardForUser = () => {
  return (
    <div> 

<button class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow-lg relative ring-2 ring-blue-500 focus:outline-none">
    <div class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
      <img
        src="https://assets.codepen.io/344846/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1582611188&width=512"
        class="w-7 h-7 mr-2 rounded-full"
        alt="profile"
      />
      Mert Cukuren
    </div>
    <div class="flex items-center w-full">
      <div class="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-green-100 text-green-600 rounded-md">
        Sales
      </div>
      <div class="ml-auto text-xs text-gray-500">$2,794.00</div>
    </div>
  </button>
  </div>
  )
}

export default CardForUser