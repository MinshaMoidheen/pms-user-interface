"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, Lock } from "lucide-react";
import AuthLayoutWrapper from "@/components/AuthLayoutWrapper";
import {
  useRegisterMutation,
  useVerifyOTPMutation,
} from "@/store/services/authApiSlice";
import OTPInput from "@/components/OTPInput";

const RegisterPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
  });
  const [otp, setOtp] = useState("");

  const [registerUser, { isLoading: isRegistering, isError }] =
    useRegisterMutation();
  const [verifyOTP, { isLoading: isVerifyingOTP }] = useVerifyOTPMutation();

  const loading = isRegistering || isVerifyingOTP;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      setStep("otp");
    } catch (err: any) {
      console.error("Registration failed:", err);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      try {
        await verifyOTP({ mobileNumber: formData.mobileNumber, otp }).unwrap();
        router.push("/"); // Redirect to home on success
      } catch (err: any) {
        console.error("Verification failed:", err);
      }
    }
  };

  return (
    <AuthLayoutWrapper
      title={step === "mobile" ? "Create Account" : "Verification Code"}
      subtitle={
        step === "mobile"
          ? "Join PMSClub today to start your journey."
          : `We have sent a code to ${formData.mobileNumber}`
      }
    >
      {step === "mobile" ? (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none block w-full pl-10 pr-3 py-3 text-black border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                required
                className="appearance-none block w-full pl-10 pr-3 py-3 text-black border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="Enter your mobile number"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            {isError && <p className="text-red-500 text-sm mt-2">{isError}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </form>
      ) : (
        <form className="space-y-8"  onSubmit={handleOtpSubmit}>
          <div>
            <div className="flex justify-center mb-6">
              <OTPInput length={6} value={otp} onChange={setOtp} />
            </div>

            <div className="text-center">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Resend Code
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              {loading ? "Verifying..." : "Verify & Login"}
              {!loading && <Lock className="ml-2 h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => setStep("mobile")}
              className="w-full py-3 px-4 bg-gray-50 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm"
            >
              Change Phone Number
            </button>
          </div>
        </form>
      )}
    </AuthLayoutWrapper>
  );
};

export default RegisterPage;
