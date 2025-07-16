import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			return toast.error('All fileds are required!', {id: 'alf'})
		}
		await login(email, password);
	};

	return (
		<div className="xs:px-1 xs:mx-5 relative mx-4 mb-32 max-w-[1200px] justify-center pt-10 md:pt-20 sm:px-5 md:mx-auto md:px-10">
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full mx-auto bg-gray-300 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Welcome
				</h2>

				<h4 className="mb-6 text-center bg-gradient-to-r from-amber-600 to-orange-400 text-transparent bg-clip-text font-semibold">
					Delightsome Juice Smothies & Whole Foods
				</h4>

				<form onSubmit={handleLogin}>
					<Input
						icon={Mail}
						type='email'
						placeholder='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<div className='flex items-center mb-6'>
						<Link to='/forgot-password' className='text-sm text-green-700 hover:underline'>
							Forgot password?
						</Link>
					</div>
					{error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
					</motion.button>
				</form>
			</div>

			<div className='px-8 py-4 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-500'>
					{'Don\'t have an account?'}{" "}
					<Link to='/signup' className='text-green-600 font-semibold hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
		</motion.div>
		</div>
	);
};
export default LoginPage;
