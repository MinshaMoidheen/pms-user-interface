"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, ArrowRight, Lock } from "lucide-react";
import OTPInput from "@/components/OTPInput";
import AuthLayoutWrapper from "@/components/AuthLayoutWrapper";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "@/store/services/authApiSlice";

const LoginPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const [sendOTP, { isLoading: isSendingOTP }] = useSendOTPMutation();
  const [verifyOTP, { isLoading: isVerifyingOTP }] = useVerifyOTPMutation();

  const loading = isSendingOTP || isVerifyingOTP;

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length >= 10) {
      try {
        await sendOTP({ mobileNumber: mobile }).unwrap();
        setStep("otp");
      } catch (err: any) {
        console.error("Failed to send OTP:", err);
        // Handle error (e.g., show error message)
      }
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      try {
        await verifyOTP({ mobileNumber: mobile, otp }).unwrap();
        router.push("/"); // Redirect to home on success
      } catch (err: any) {
        console.error("Verification failed:", err);
      }
    }
  };

  return (
    <AuthLayoutWrapper
      title={step === "mobile" ? "Welcome Back" : "Verification Code"}
      subtitle={
        step === "mobile"
          ? "Please enter your details to sign in."
          : `We have sent a code to ${mobile}`
      }
    >
      {step === "mobile" ? (
        <form className="space-y-6" onSubmit={handleMobileSubmit}>
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
                id="mobile"
                name="mobile"
                type="tel"
                required
                className="appearance-none block w-full pl-10 pr-3 py-3 text-black border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Get OTP"}
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </button>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
            </span>
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </form>
      ) : (
        <form className="space-y-8" onSubmit={handleOtpSubmit}>
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

export default LoginPage;
