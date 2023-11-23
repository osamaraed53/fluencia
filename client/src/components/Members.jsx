
import React from 'react'

const Members = () => {
    const members = [
        {
            img: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
            name: "John lorin",
            email: "john@example.com"
        }, {
            img: "https://randomuser.me/api/portraits/men/86.jpg",
            name: "Chris bondi",
            email: "chridbondi@example.com"
        }, {
            img: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
            name: "yasmine",
            email: "yasmine@example.com"
        }, {
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
            name: "Joseph",
            email: "joseph@example.com"
        },
    ]
  return (
    <div className='mt-6'>
        <div className="max-w-2xl mx-auto px-4">
        <div className="items-start justify-between sm:flex">
            <div>
                <h4 className="text-gray-800 text-xl font-semibold">All Student</h4>
                <p className="mt-2 text-gray-600 text-base sm:text-sm">Text text text text</p>
            </div>
            <a href="javascript:void(0)" className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-fluencia-yellow-first hover:bg-fluencia-yellow-second active:bg-fluencia-yellow-second rounded-lg sm:mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                Add Student
            </a>
        </div>
        <ul className="mt-12 divide-y">
            {
                members.map((member, id) => (
                    <li key={id} className="py-5 flex items-start justify-between">
                        <div className="flex gap-3">
                            <img src={member.img} className="flex-none w-12 h-12 rounded-full" />
                            <div>
                                <span className="block text-sm text-gray-700 font-semibold">{member.name}</span>
                                <span className="block text-sm text-gray-600">{member.email}</span>
                            </div>
                        </div>
                        <a href="javascript:void(0)" className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-red-600">Remove</a>
                    </li>
                ))
            }
        </ul>
    </div>
    </div>
  )
}

export default Members;
