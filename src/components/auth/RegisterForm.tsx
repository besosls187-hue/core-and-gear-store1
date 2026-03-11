"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Cpu, Loader2 } from "lucide-react";

import { RegisterSchema } from "@/lib/zod";
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

export const RegisterForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>("");
    const [isPending, setIsPending] = useState(false);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setIsPending(true);

        try {
            // In a real app, you'd call an API route to register the user
            // For now, let's just log and simulate
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            router.push("/auth/login?registered=true");
        } catch (error) {
            setError("Something went wrong!");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 bg-[#0B0E14] border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(255,0,127,0.05)] relative overflow-hidden group">

            {/* Decorative Blur */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF007F] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex flex-col items-center mb-8">
                <Cpu className="text-[#FF007F] w-12 h-12 mb-4 drop-shadow-[0_0_8px_rgba(255,0,127,0.8)]" />
                <h1 className="text-2xl font-bold text-white tracking-wider">JOIN THE SQUAD</h1>
                <p className="text-sm text-slate-400 mt-2">Create your Core & Gear account</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="GamerTag"
                                            className="bg-white/5 border-white/10 text-white focus-visible:ring-[#FF007F] placeholder:text-slate-600"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[#00FFFF]" />
                                </FormItem>
                            )}
                        />
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
                                            className="bg-white/5 border-white/10 text-white focus-visible:ring-[#FF007F] placeholder:text-slate-600"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[#00FFFF]" />
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
                                            className="bg-white/5 border-white/10 text-white focus-visible:ring-[#FF007F] placeholder:text-slate-600"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[#00FFFF]" />
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
                        className="w-full bg-[#FF007F] hover:bg-[#FF007F]/80 text-white font-bold tracking-wide rounded-md uppercase"
                    >
                        {isPending ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign Up"}
                    </Button>
                </form>
            </Form>

            <div className="mt-8 text-center text-sm">
                <span className="text-slate-400">Already have an account? </span>
                <Link href="/auth/login" className="text-[#00FFFF] font-semibold hover:underline">
                    Log in
                </Link>
            </div>
        </div>
    );
};
