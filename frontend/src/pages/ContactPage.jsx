import { useEffect } from "react";
import { usePageHooks } from "../Hooks/useGeneralHooks";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const ContactPage = () => {
  const { setCurrentPage } = usePageHooks();

  useEffect(() => {
    setCurrentPage("Contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setCurrentPage]);

  return (
    <div className="xs:px-1 xs:mx-5 relative mx-4 mb-32 max-w-[1200px] justify-center pt-5 sm:px-5 md:mx-auto">
      {/* Top bar */}
      <div className="hidden md:block">
        <div className="text-md mb-6 flex justify-between">
          <div className="flex gap-3">
            <Link to="/">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">Contact</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8 text-2xl font-bold">Contact</div>
      </div>

      {/* office info */}
      <div className="mt-10 flex w-full flex-col gap-5 md:flex-row md:gap-10">
        <div className="w-full">
          <div className="flex items-center">
            <MapPin size={24} className="text-green-700" />
            <div className="ml-2 text-xl font-bold">Lagos</div>
          </div>
          <div className="text-md mt-2 text-gray-800">
            46 Beach Road(TOS Benson Road),<br></br>Opposite Ikorodu General
            Hospital,<br/>Ikorodu, Lagos
          </div>
        </div>

        <div className="w-full">
          <div className="text-xl font-bold">Opening Hours</div>
          <div className="text-md mt-2 text-gray-800">
            The store’s opening hours are{" "}
            <span className="font-bold">8 a.m. to 7 p.m.</span>
          </div>
        </div>
      </div>

      <div className="mt-10 flex w-full flex-col gap-10 md:flex-row">
        {/* contact form */}
        <div className="w-full rounded-lg bg-gray-100 px-5 md:px-7 py-6">
          <div className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-md">
                Fullname <span className="text-red-800">*</span>
              </label>
              <input type="text" className="w-full rounded-lg p-3" />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-md">
                Email <span className="text-red-800">*</span>
              </label>
              <input type="text" className="w-full rounded-lg p-3" />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">
              <label className="text-md">
                Subject <span className="text-red-800">*</span>
              </label>
              <input type="text" className="w-full rounded-lg p-3" />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-md">Your Message (optional)</label>
              <textarea className="w-full rounded-lg p-3" rows="5"></textarea>
            </div>
            
            {/* Submit Button */}
            <button className="bg-green-700 text-white mt-4 rounded-lg p-3 font-bold text-lg transition duration-300 hover:bg-green-600">
              Submit
            </button>
          </div>
        </div>

        <div className="w-full">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.30125180662!2d3.496522273329108!3d6.60943982216213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bec2ab7f091a1%3A0x3dcf925b615829ed!2sDelightsome%20Juice%2C%20Smoothies%20%26%20Whole%20Foods!5e0!3m2!1sen!2sng!4v1736294156727!5m2!1sen!2sng" allowfullscreen="" className="size-full w-full rounded-lg" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
