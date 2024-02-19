import supabaseClient, {
	SupabaseSessionContext,
} from "utilities/supabase-client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthenticationForm } from "@/components/component/authentication-form";
import "./authentication.css";
import { toast, useToast } from "@/components/ui/use-toast";
import ApiClient from "utilities/api-client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Authentication() {
	const [session, setSession] = useContext(SupabaseSessionContext);
	const [backendUser, setBackendUser] = useState(null);
	const api = new ApiClient(process.env.REACT_APP_API_URL);

	async function fetchUser() {
		const user = await api.get.me();
		setBackendUser(user);
	}

	useEffect(() => {
		if (session) {
			fetchUser();
		}
	}, [session]);

	async function signOut() {
		await supabaseClient.auth.signOut({ scope: "local" });
	}

    async function signUpNewUser({ email, password }) {
		const mailCheckResponse = await (
			await fetch(`https://api.mailcheck.ai/email/${email}`)
		).json();

		if (mailCheckResponse.disposable) {
			toast({
				variant: "destructive",
				title: "Unauthorized email address",
				description:
					"For the integrity of the platform, we do not allow disposable email addresses. Please use a valid email address.",
			});
			return;
		}

		const { data, error } = await supabaseClient.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: process.env.REACT_APP_URL,
			},
		});

		if (error) {
			toast({
				variant: "destructive",
				description: error.message,
			});
		} else if (data) {
			console.log(data);

			if (!data.role) {
				toast({
					variant: "destructive",
					title: "User already exists",
					description:
						"Please sign in with your credentials, or check your inbox for a confirmation email.",
				});
			} else {
				toast({
					title: "Signed up successfully",
					description:
						"Please check your inbox for a confirmation email.",
				});
			}
		}
	}

	async function signInWithEmail({ email, password }) {
		const { data, error } = await supabaseClient.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			toast({
				variant: "destructive",
				description: error.message,
			});
		} else if (data) {
			ApiClient.setJwt(data.session.access_token);
			ApiClient.setRefreshToken(data.session.refresh_token);
			toast({
				description: "Signed in successfully",
			});
		}
	}

	if (!session) {
		return (
			<section className="authentication-form">
				<AuthenticationForm
					onSignInClick={signInWithEmail}
					onSignUpClick={signUpNewUser}
				/>
				{/* <Auth
					supabaseClient={supabaseClient}
					appearance={{ theme: ThemeSupa }}
					providers={[]}
				/> */}
			</section>
		);
	} else {
		return (
			<div className="authentication">
				<Profile
					fetchUser={fetchUser}
					user={backendUser}
					signOut={signOut}
				/>
			</div>
		);
	}
}

function Profile({ signOut, user, fetchUser }) {
	const firstNameRef = useRef(null);
	const lastNameRef = useRef(null);
	const idNumberRef = useRef(null);
	const phoneRef = useRef(null);

	const api = new ApiClient(process.env.REACT_APP_API_URL);

	async function onFormSubmit() {
		const formData = {
			firstName: firstNameRef.current.value.trim() || user.firstName,
			lastName: lastNameRef.current.value.trim() || user.lastName,
			identityNumber:
				idNumberRef.current.value.trim() || user.identityNumber,
			phone: phoneRef.current.value.trim() || user.phone,
		};

		const response = await api.put.user(user._id, formData);

		if (response.error) {
			toast({
				variant: "destructive",
				description: response.error.message,
			});
		} else {
			toast({
				description: "User updated",
			});
			fetchUser();
		}
	}

	return (
		<div className="grid min-h-screen">
			<div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
				<div className="p-4 flex items-center justify-between">
					<h1 className="text-2xl font-semibold">Account Overview</h1>
					<Button className="ml-auto">
						<Link onClick={signOut} to="/">
							Sign out
						</Link>
					</Button>
				</div>
				<div className="p-4">
					<div className="grid gap-2 mt-2">
						<div>
							<Card>
								<CardHeader>
									{user?.firstName || user?.lastName ? (
										<CardTitle>{`${user?.firstName} ${user?.lastName}`}</CardTitle>
									) : null}
								</CardHeader>
								<CardContent>
									{user?.email ? (
										<div>
											<span className="font-medium">
												Email:{" "}
											</span>
											{user.email}
										</div>
									) : null}
									{user?.identityNumber ? (
										<div>
											<span className="font-medium">
												ID Number:{" "}
											</span>
											{user.identityNumber}
										</div>
									) : null}
									{user?.phone ? (
										<div>
											<span className="font-medium">
												Phone:{" "}
											</span>
											{user.phone}
										</div>
									) : (
										<>{user?.phone}</>
									)}
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
				<div className="grid gap-4 p-4 lg:p-8">
					<div className="grid gap-2">
						<label className="form-label" htmlFor="first-name">
							First Name
						</label>
						<Input
							ref={firstNameRef}
							className="max-w-md"
							id="first-name"
							placeholder="Enter your first name"
						/>
					</div>
					<div className="grid gap-2">
						<label className="form-label" htmlFor="last-name">
							Last Name
						</label>
						<Input
							ref={lastNameRef}
							className="max-w-md"
							id="last-name"
							placeholder="Enter your last name"
						/>
					</div>
					<div className="grid gap-2">
						<label className="form-label" htmlFor="id-number">
							ID Number
						</label>
						<Input
							ref={idNumberRef}
							className="max-w-md"
							id="id-number"
							placeholder="Enter your ID number"
						/>
					</div>
					<div className="grid gap-2">
						<label className="form-label" htmlFor="phone">
							Phone
						</label>
						<Input
							ref={phoneRef}
							className="max-w-md"
							id="phone"
							placeholder="Enter your phone"
							type="tel"
						/>
					</div>
					<div className="flex justify-end">
						<Link
							className="inline-flex items-center gap-2 text-sm font-medium rounded-md border border-gray-200 border-gray-200 bg-white px-4 py-2 shadow-sm hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
							href="#"
							onClick={() => onFormSubmit()}
						>
							Save Changes
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

