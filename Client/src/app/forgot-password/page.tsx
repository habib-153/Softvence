"use client";
import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Link,
  Spinner,
} from "@heroui/react";
import { Mail, ArrowLeft, Shield, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

import { forgotPassword } from "@/src/services/AuthService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");

      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Sending recovery instructions...");
    const userData = { email: email };

    const res = await forgotPassword(userData);

    if (res?.err) {
      setIsLoading(false);
      toast.error(res?.message || "Failed to send recovery email", {
        id: toastId,
      });
    } else {
      setIsSuccess(true);
      setIsLoading(false);
      setEmail("");
      toast.success("Recovery instructions sent successfully.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80">
          <CardHeader className="pb-2">
            <div className="w-full text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Forgot Password?
                </h1>
                <p className="text-sm text-gray-600 leading-relaxed">
                  No worries! Enter your email address and we&apos;ll send you
                  instructions to reset your password.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardBody className="pt-2">
            {isSuccess ? (
              <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Check Your Email
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We&apos;ve sent password recovery instructions to your email
                    address. Please check your inbox and follow the link to
                    reset your password.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-amber-800">
                        Didn&apos;t receive the email?
                      </p>
                      <p className="text-xs text-amber-700 mt-1">
                        Check your spam folder or wait a few minutes for
                        delivery
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    size="lg"
                    onPress={() => {
                      setIsSuccess(false);
                      setEmail("");
                    }}
                  >
                    Send Another Email
                  </Button>

                  <Button
                    as={Link}
                    className="w-full"
                    color="primary"
                    href="/"
                    size="lg"
                    startContent={<ArrowLeft size={16} />}
                    variant="bordered"
                  >
                    Back to Login
                  </Button>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Input
                    required
                    className="text-gray-900"
                    classNames={{
                      input: "text-gray-900",
                      label: "text-gray-700 font-medium",
                    }}
                    label="Email Address"
                    placeholder="Enter your email address"
                    size="lg"
                    startContent={<Mail className="text-gray-400" size={18} />}
                    type="email"
                    value={email}
                    variant="bordered"
                    onValueChange={setEmail}
                  />
                </div>

                <Button
                  className="w-full bg-primary text-white font-medium  transition-all duration-200 shadow-lg"
                  isDisabled={!email}
                  isLoading={isLoading}
                  size="lg"
                  spinner={<Spinner color="white" size="sm" />}
                  type="submit"
                >
                  {isLoading ? "Sending..." : "Send Reset Instructions"}
                </Button>

                <div className="text-center">
                  <Button
                    as={Link}
                    className="text-gray-600 hover:text-gray-900"
                    color="default"
                    href="/login"
                    startContent={<ArrowLeft size={16} />}
                    variant="light"
                  >
                    Back to Login
                  </Button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-blue-900">
                        Security Notice
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        Reset links expire in 20 minutes for your security
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </CardBody>
        </Card>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Remember your password?{" "}
            <Link
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              href="/"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}