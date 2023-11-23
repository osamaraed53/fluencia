 const Banner = () => {
    return (
        <div className="bg-fluencia-blue">
            <div className="max-w-screen-xl mx-auto px-4 py-3 items-center gap-x-4 justify-center text-white sm:flex md:px-8">
                <p className="py-2 font-medium">
                    We just launched our new podcast! you can listen now.
                </p>
                <a href="javascript:void(0)" className="flex-none inline-block w-full mt-3 py-2 px-3 text-center text-fluencia-dark-purple font-medium bg-white duration-150 hover:bg-gray-100 active:bg-gray-200 rounded-lg sm:w-auto sm:mt-0 sm:text-sm">
                listen
                </a>
            </div>
        </div>
    )
}

export default Banner;