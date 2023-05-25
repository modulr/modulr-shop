<template>
    <div class="relative overflow-hidden before:absolute before:top-0 before:left-1/2 before:bg-[url('./16.jpg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('../svg/component/polygon-dark.svg')]">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-52">
            <div class="flex justify-center">
                <div class="max-w-5xl text-center">
                    <h1 class="font-bold text-4xl text-red-700 md:text-5xl">Your favorite dishes, right at your door</h1>
                    <form action="" class="w-full mt-12">
                        <div class="relative flex p-1 rounded-full bg-white border border-red-500 shadow-md md:p-2">
                            <select class="hidden p-3 rounded-full bg-transparent md:block md:p-4" name="domain" id="domain">
                                <option value="design">FastFood</option>
                                <option value="development">Restaurant</option>
                                <option value="marketing">Marketing</option>
                            </select>
                            <input placeholder="Your favorite food" class="w-full p-4 rounded-full" type="text">
                            <button type="button" title="Start buying" class="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-red-500 to-red-700 hover:to-red-800 md:px-12">
                                <span class="hidden text-white font-semibold md:block">
                                    Search
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 mx-auto text-red-900 md:hidden bi bi-search" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                    <p class="mt-8 text-gray-700">Sit amet consectetur adipisicing elit. <a href="#" class="text-red-700">connection</a> tenetur nihil quaerat suscipit, sunt dignissimos.</p>
                </div>
            </div>
        </div>
    </div>

    <section>
        <div class="relative overflow-hidden bg-no-repeat bg-cover" style=" background-position: 50%; background-image: url('./16.jpg'); height: 500px;">
            <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed" style="background-color: rgba(0, 0, 0, 0.75)">
                <div class="flex justify-center items-center h-full">
                    <div class="text-center text-white px-6 md:px-12">
                        <h1 class="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-300 md:text-5xl lg:text-6xl lg:max-w-7xl">
                            Long headline to turn <br class="hidden lg:block">your visitors into users
                        </h1>
                        <form action="" method="post" id="revue-form" name="revue-form" target="_blank" class="p-2 mt-8 transition duration-500 ease-in-out transform border2 bg-gray-50 md:mx-auto rounded-xl sm:max-w-3xl lg:flex">
                            <div class="divide-y lg:divide-x lg:divide-y-0 lg:flex space-y 4">
                            <div class="flex-1 min-w-0 revue-form-group">
                                <label for="name" class="sr-only">Name</label>
                                <input id="name" type="text" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform bg-transparent border border-transparent rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your name ">
                            </div>
                            <div class="flex-1 min-w-0 revue-form-group">
                                <label for="member_email" class="sr-only">Email address</label>
                                <input id="cta-email" type="email" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform bg-transparent border border-transparent rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your email  ">
                            </div>
                            </div>
                            <div class="mt-4 sm:mt-0 lg:ml-3 revue-form-actions">
                            <button type="submit" value="Subscribe" name="member[subscribe]" id="member_submit" class="block w-full px-5 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 sm:px-10">Notify me</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <div class="relative overflow-hidden before:absolute before:top-0 before:left-1/2 before:bg-[url('./16.jpg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('../svg/component/polygon-dark.svg')]">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div class="flex items-center flex-wrap px-2 md:px-0">
                <div class="relative lg:w-7/12 lg:py-24 xl:py-32">
                    <h1 class="font-bold text-4xl text-red-700 md:text-5xl">Your favorite dishes, right at your door</h1>
                    <form action="" class="w-full mt-12">
                        <div class="relative flex p-1 rounded-full bg-white border border-red-500 shadow-md md:p-2">
                            <select class="hidden p-3 rounded-full bg-transparent md:block md:p-4" name="domain" id="domain">
                                <option value="design">FastFood</option>
                                <option value="development">Restaurant</option>
                                <option value="marketing">Marketing</option>
                            </select>
                            <input placeholder="Your favorite food" class="w-full p-4 rounded-full" type="text">
                            <button type="button" title="Start buying" class="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-red-500 to-red-700 hover:to-red-800 md:px-12">
                                <span class="hidden text-white font-semibold md:block">
                                    Search
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 mx-auto text-red-900 md:hidden bi bi-search" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                    <p class="mt-8 text-gray-700">Sit amet consectetur adipisicing elit. <a href="#" class="text-red-700">connection</a> tenetur nihil quaerat suscipit, sunt dignissimos.</p>
                </div>
            </div>
        </div>
    </div>

</template>