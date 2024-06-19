import { useState } from 'react';
import {BiArrowToLeft} from "react-icons/bi";
import Logo from "../../components/header/Logo.jsx";
import {FaPlus} from "react-icons/fa6";
import MBlog from "../../modal/MBlog";

function DashHeader(){
    const [isModalOpen, setModalOpen] = useState(false);

    const handleSaveBlog = (blog) => {
        console.log(blog);
    };
    return (
        <>
            <header className="w-full flex items-center justify-between pr-4">
                <div className="flex items-center gap-4">
                    <button className="text-2xl">
                        <BiArrowToLeft />
                    </button>
                    <Logo />
                </div>
                <button
                    className="bg-[#ACEBC9] text-[20px] rounded px-5 py-1 flex items-center gap-2"
                    onClick={() => setModalOpen(true)}
                >
                    <FaPlus /> Nuevo Blog
                </button>
            </header>

            <MBlog
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveBlog}
            />
        </>
    );
}

export default DashHeader;