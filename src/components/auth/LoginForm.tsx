"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Cpu, Loader2 } from "lucide-react";

import { LoginSchema } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>("");
    const [isPending, setIsPending] = useState(false);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setIsPending(true);

        try {
            const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
                setIsPending(false);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (error) {
            setError("Something went wrong!");
            setIsPending(false);
        }
    };

    const onGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/dashboard" });
    };

    return (
        <div className="w-full max-w-md p-8 bg-[#0B0E14] border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,255,255,0.05)] relative overflow-hidden group">

            {/* Decorative Blur */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex flex-col items-center mb-8">
                <Cpu className="text-[#00FFFF] w-12 h-12 mb-4 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
                <h1 className="text-2xl font-bold text-white tracking-wider">WELCOME BACK</h1>
                <p className="text-sm text-slate-400 mt-2">Log in to your Core & Gear account</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Email Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="gamer@example.com"
                                            type="email"
                                            className="bg-white/5 border-white/10 text-white focus-visible:ring-[#00FFFF] placeholder:text-slate-600"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[#FF007F]" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="******"
                                            type="password"
                                            className="bg-white/5 border-white/10 text-white focus-visible:ring-[#00FFFF] placeholder:text-slate-600"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[#FF007F]" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {error && (
                        <div className="bg-[#FF007F]/10 border border-[#FF007F]/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-[#FF007F]">
                            <p>{error}</p>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-[#00FFFF] hover:bg-[#00FFFF]/80 text-[#0B0E14] font-bold tracking-wide rounded-md uppercase"
                    >
                        {isPending ? <Loader2 className="animate-spin w-5 h-5" /> : "Log In"}
                    </Button>
                </form>
            </Form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-[#0B0E14] text-slate-500">Or continue with</span>
                    </div>
                </div>

                <Button
                    onClick={onGoogleSignIn}
                    disabled={isPending}
                    variant="outline"
                    className="w-full mt-6 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Google
                </Button>
            </div>

            <div className="mt-8 text-center text-sm">
                <span className="text-slate-400">Don't have an account? </span>
                <Link href="/auth/register" className="text-[#FF007F] font-semibold hover:underline">
                    Sign up
                </Link>
            </div>
        </div>
    );
};
