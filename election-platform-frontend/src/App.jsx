import './App.css';
import { Outlet, Link } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from "./@/components/ui/navigation-menu";

function App() {
	return (
		<>
			<Navigation />
			<div id="App">
				<Outlet />
			</div>
			<Footer />
		</>
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
								Profile
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</nav>
	);
}

export default App;
