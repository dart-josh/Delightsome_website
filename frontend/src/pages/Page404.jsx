/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { usePageHooks } from "../Hooks/useGeneralHooks";
import { Link } from "react-router-dom";
import MetaWrap from "../utils/MetaWrap";

const Page404 = ({path}) => {
  const { setCurrentPage } = usePageHooks();

  useEffect(() => {
    setCurrentPage("Page not found");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setCurrentPage]);

  return (
    <MetaWrap path={path}>
    <div className="xs:px-1 xs:mx-5 relative mx-4 mb-32 max-w-[1200px] justify-center pt-5 sm:px-5 md:mx-auto">
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <div className="m-7 text-4xl font-extrabold">404</div>
        <div className="mb-5 text-center font-semibold">
          Page does not exist
        </div>
        <Link
          to={"/shop"}
          className="cursor-pointer rounded-md border border-gray-800 bg-gray-800 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-transparent hover:text-black"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
    </MetaWrap>
  );
};

export default Page404;
