import {BiLogoCodepen} from "react-icons/bi";

function Logo() {
    return (
        <>
            <div className={" text-black text-3xl font-bold py-3"}>
                <div className={"flex items-center"}>
                    <div className={"text-[#6DC093] mr-1"}>
                        <BiLogoCodepen/>
                    </div>
                    <a href="/">BlogWise</a>
                </div>

            </div>
        </>
    )
}

export default Logo;