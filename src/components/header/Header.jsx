
import { BiLogoCodepen } from "react-icons/bi";
import logoImage from '/src/assets/logo.jpeg';

function Header() {
  return (
    <div className="flex justify-between items-center py-3">
      <div className="flex items-center">
        <div className="mr-2">
          <img src={logoImage} alt="Logo" className="h-8" />
        </div>
        <a href="/" className="text-black text-2xl font-bold">BlogWise</a>
      </div>
      {/* */}
    </div>
  )
}

export default Header;