import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginForm = z.infer<typeof loginSchema>

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  })

  const onSubmit = async (data: LoginForm) => {
    console.log("Logging in with", data)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username")}
              aria-invalid={errors.username ? "true" : "false"}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-indigo-500 ${
                errors.username
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300"
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 flex items-center rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
                className="w-full rounded-l-lg border-none bg-transparent px-3 py-2 text-sm outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="px-3 text-sm font-medium text-indigo-600 hover:text-indigo-800 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
