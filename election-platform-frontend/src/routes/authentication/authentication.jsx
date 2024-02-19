import supabaseClient, {
	SupabaseSessionContext,
} from "utilities/supabase-client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthenticationForm } from "@/components/component/authentication-form";
import "./authentication.css";
import { toast, useToast } from "@/components/ui/use-toast";
import ApiClient from "utilities/api-client";

export default function Authentication() {
	const [session, setSession] = useContext(SupabaseSessionContext);

	async function signOut() {
		await supabaseClient.auth.signOut({ scope: "local" });
	}

	async function signUpNewUser({ email, password }) {
		const { data, error } = await supabaseClient.auth.signUp({
			email,
			password,
			options: {
				// emailRedirectTo: "https://example.com/welcome",
			},
		});

		if (error) {
			toast({
				variant: "destructive",
				description: error.message,
			});
		} else if (data) {
			toast({
				description: "Signed up successfully",
			});
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
			console.log("Signed in successfully", data);
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
				<h1>Authentication</h1>
				<div className="centered">
					<Button>
						<Link onClick={signOut} to="/">
							Sign out
						</Link>
					</Button>
				</div>
			</div>
		);
	}
}
