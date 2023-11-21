import { Link } from "react-router-dom"
import { footerLinks } from "../constants"

const Footer = () => {
  return (
    <footer className="mt-40 flex flex-col relative bottom-0
    text-black-100 border-t
    border-black-100">
      <div className="flex max-md:flex-col 
      flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col
        justify-start items-start gap-6">
          <img src="/logo.svg" alt="logo"
          width={118} height={18}
          className="object-contain"/>

          <p className="text-base text-gray-700">
            Ascari Auctions 2023<br/>
            All rights Reserved &copy;
          </p>
        </div>
        <div className="footer__links">
          {footerLinks.map((item) => (
            <div key={item.title} className="footer__link">
              <h3 className="font-bold">{item.title}</h3>
              {item.links.map((link) => (
                <Link 
                  key={link.title}
                  to={link.url}
                  className="text-gray-500">
                    {link.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

        <div className="flex justify-between
        items-center flex-wrap mt-10 border-t
        border-gray-100 sm:px-16 px-6 py-10">
          <p>@2023 Ascari Auctions. All Rights Reserved</p>
          <div 
          className="footer__copyrights-link">
            <Link to="/"
            className="text-gray-500">
              Privacy Policy
            </Link>
            <Link to="/"
            className="text-gray-500">
              Terms of Use
            </Link>
          </div>
        </div>
    </footer>
  )
}

export default Footer
