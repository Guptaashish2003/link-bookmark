"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { set, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import axios from "axios";
import { toast } from "sonner";

type AuthFormData = {
  fullName?: string;
  email: string;
  password: string;
};

interface AuthProps {
  setIsLoginOpen: (isOpen: boolean) => void;
}

export function Auth({ setIsLoginOpen }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>();

  const onSubmit = async (data: AuthFormData) => {
  try {
    if (isSignUp) {
      // Signup request
        console.log("Signup data...............:", data);
      const res = await axios.post("http://localhost:3000/api/auth/sign-up", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      console.log(".................", res);
      if (res.data.success) {
        console.log("Signup successful:", res.data.user);

        // Auto-login after signup
        const loginRes = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (loginRes?.error) {
          console.error("Auto-login failed:", loginRes.error);
        } else {
            setIsLoginOpen(false); 
          toast.success("Auto-login successful");
        }
      }
    } else {
      // Login request
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (loginRes?.error) {
        console.error("Login failed:", loginRes.error);
      } else {
       toast.success("Login successful");
       setIsLoginOpen(false); 
      }
    }
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
  } finally {
    reset();
    if (isSignUp) setIsSignUp(false);
  }
};

  return (
    <Card className="w-full max-w-sm shadow-lg border rounded-xl">
      <CardHeader className="text-center">
        <CardTitle>{isSignUp ? "Create an account" : "Login to your account"}</CardTitle>
        <CardDescription>
          {isSignUp
            ? "Enter your details to get started"
            : "Enter your email and password to login"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Full Name Field (Sign Up Only) */}
          {isSignUp && (
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                {...register("fullName", {
                  required: isSignUp ? "Full name is required" : false,
                })}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {!isSignUp && (
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot?
                </a>
              )}
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 7,
                  message: "Password must be greater than 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <CardFooter className="flex-col gap-3 px-0">
            <Button type="submit" className="w-full">
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => signIn("google")}
            >
              Continue with Google
            </Button>

            {/* Toggle between Sign Up and Login */}
            <p className="text-sm text-center">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  reset();
                }}
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </p>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export default Auth;
