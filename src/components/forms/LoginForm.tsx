"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";

import { login } from "@/lib/action";
import { loginSchema, LoginSchema } from "@/lib/formValidationSchema";
import { toast } from "react-toastify";
import { useFormState } from "react-dom";
import InputField from "../InputField";
import Image from "next/image";

export default function LoginForm() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [state, loginAction] = useFormState(login, {
    success: false,
    error: false,
  });

  useEffect(() => {
    if (state.success) {
      toast(`Successfully logged in!`);

      redirect("/dashboard");
    } else if (state.error) {
      toast("Logged in! failed");
    }
  }, [state]);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <div className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Image src="/logo.png" alt="" width={24} height={24} /> Famous
        </h1>
        <h2 className="text-gray-400">Sign in to your account </h2>

        <form action={loginAction} className="space-y-4">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <InputField
              label="Email"
              name="email"
              register={register}
              error={errors?.email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <InputField
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors?.password}
            />
          </div>

          {/* Error Message */}
          {/* {state.error && (
            <span className="text-red-500 text-center block">
              Something went wrong!
            </span>
          )} */}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
