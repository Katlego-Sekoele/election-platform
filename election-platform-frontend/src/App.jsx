import './App.css';
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Outlet, Link } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "./@/components/ui/navigation-menu";
import supabaseClient, {
	SupabaseSessionContext,
} from "utilities/supabase-client";
import ApiClient from "utilities/api-client";
import { supabase } from "@supabase/auth-ui-shared";

function App() {
	const [session, setSession] = useState(null);
	// useEffect(() => {
	// 	supabaseClient.auth.getSession().then(({ data: { session } }) => {
	// 		setSession(session);
	// 	});

	// 	const {
	// 		data: { subscription },
	// 	} = supabaseClient.auth.onAuthStateChange((_event, session) => {
	// 		setSession(session);
	// 	});

	// 	const getToken = () => {
	// 		const storageKey = `sb-${process.env.REACT_APP_SUPABASE_PROJECT_ID}-auth-token`;
	// 		const sessionDataString = localStorage.getItem(storageKey);
	// 		const sessionData = JSON.parse(sessionDataString || "null");
	// 		const token = sessionData?.access_token;

	// 		return token;
	// 	};

	// 	supabaseClient.auth.refreshSession().then(({ data: { session } }) => {
	// 		setSession(session);
	// 		console.log("Session refreshed", session);
	// 		ApiClient.setJwt(getToken());
	// 	});

	// 	return () => subscription.unsubscribe();
	// }, []);

	function handleSupabase() {
		supabaseClient.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			ApiClient.setJwt(session?.access_token);
			ApiClient.setRefreshToken(session?.refresh_token);
		});

		setSession(session);
		ApiClient.setJwt(session?.access_token);
		ApiClient.setRefreshToken(session?.refresh_token);

		return () => subscription.unsubscribe();
	}

	useEffect(() => {
		handleSupabase();
	}, []);

	return useMemo(
		() => (
			<SupabaseSessionContext.Provider value={[session, setSession]}>
				<Navigation />
				<div id="App">
					<Outlet />
				</div>
				<Footer />
			</SupabaseSessionContext.Provider>
		),
		[session, setSession]
	);
}

function Footer() {
	return (
		<footer className="footer">
			<p>&copy; {new Date().getFullYear()} Maesela Sekoele</p>
		</footer>
	);
}

function Navigation() {
	const [session, _] = useContext(SupabaseSessionContext);

	const authenticationLinkText = session ? "Profile" : "Sign In";

	return (
		<nav className="centered">
			<NavigationMenu className="padding-small">
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link to="/">
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}
							>
								Home
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<Link to="/election">
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}
							>
								Elections
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<Link to="/authentication">
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}
							>
								{authenticationLinkText}
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</nav>
	);
}

export default App;
