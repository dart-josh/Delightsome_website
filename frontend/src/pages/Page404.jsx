import { useEffect } from "react";
import { usePageHooks } from "../Hooks/useGeneralHooks";
import { Link } from "react-router-dom";

const Page404 = () => {
  const { setCurrentPage } = usePageHooks();

  useEffect(() => {
    setCurrentPage("Page not found");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setCurrentPage]);

  return (
    <div className="xs:px-1 xs:mx-5 relative mx-4 mb-32 max-w-[1200px] justify-center pt-5 sm:px-5 md:mx-auto">
      
      <div className="flex flex-col justify-center items-center h-[60vh]">
      <div className="font-extrabold text-4xl m-7">404</div>
      <div className="font-semibold text-center mb-5">Oops, Seems like you hit a snag!</div>
      <Link to={'/shop'} className="px-6 py-2 bg-gray-800 text-white font-semibold cursor-pointer transition duration-300 hover:bg-transparent hover:text-black border border-gray-800 rounded-md">Continue Shopping</Link>
      </div>
      </div>);
};

export default Page404;
