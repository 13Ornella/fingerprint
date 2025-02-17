import StaggeredDropDown from "../droopdown";


export function Header(){
    return(
<div>
<div>

<div class="flex flex-col py-4 my-2 m-h-screen relative">

<div class="absolute top-0 left-6 w-15">
    <div class="bg-white items-center justify-between  w-full py-1 flex rounded-full shadow-lg">
       <input class="font-bold uppercase rounded-full mx-2 w-full py-1.5 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" type="text" placeholder="Search" />

        <div class="bg-gray-400 p-2 hover:bg-blue-900 cursor-pointer mx-2 rounded-full">
            <svg class="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
        </div>
    </div>
</div>
<div className="absolute top-0 right-6 bg-white rounded-full p-2 shadow" >
<StaggeredDropDown/>
  </div>
</div>

  
</div>
</div>
    );
}