import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail, resendEmail, user, logout } = useAuthStore();

  const [hideResend, setHideResend] = useState(false);

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/shop");
      toast.success("Email verified successfully", { id: "tlf" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleResend = async () => {
    if (isLoading || hideResend) return;
    try {
      setCode(["", "", "", "", "", ""]);

      await resendEmail(user.email);
      setHideResend(true);
      toast.success("Email Sent successfully", { id: "tlf" });
    } catch (error) {
      console.log(error);
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div className="xs:px-1 xs:mx-5 relative mx-4 mb-32 max-w-[1200px] justify-center pt-10 sm:px-5 md:mx-auto md:px-10 md:pt-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-gray-300 bg-opacity-50 p-8 shadow-xl backdrop-blur-xl backdrop-filter"
      >
        <h2 className="mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-center text-3xl font-bold text-transparent">
          Verify Your Email
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="6"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-12 w-12 rounded-lg border-2 border-gray-400 bg-gray-300 text-center text-2xl font-bold text-green-800 focus:border-green-600 focus:outline-none"
              />
            ))}
          </div>
          {error && <p className="mt-2 font-semibold text-red-500">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-bold text-white shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>

        <div className="flex justify-start bg-opacity-50 px-8 py-4">
          <div
            onClick={handleResend}
            className={hideResend ? 'cursor-not-allowed text-gray-600' : `font-semibold cursor-pointer text-green-600 hover:underline`}
          >
            {isLoading ? '...' : hideResend ? 'Verification code sent' : 'Resend verification code'}
          </div>
        </div>

        <div className="flex justify-center bg-opacity-50 px-8 py-4">
          <div
            onClick={() => logout()}
            className="font-semibold cursor-pointer text-green-600 hover:underline"
          >
            Logout
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default EmailVerificationPage;
