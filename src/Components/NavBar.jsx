import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, Button, NavLink, NavbarText } from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";
import './NavBar.css';

export default function NavBar() {
    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
    console.log(user)

    function LoginOrLogout() {
        if (!isAuthenticated)
            return (
                <NavItem>
                    <Button onClick={() => loginWithRedirect()}>
                        Login
                    </Button>
                </NavItem>
            );
        else {
            return (
                <NavItem>
                    <NavbarText>
                        <span className='logged-in'>{user.nickname}</span>
                    </NavbarText>
                    <Button color="danger" onClick={() => logout()}>
                        Logout
                    </Button>
                </NavItem>
            );
        }
    }
    return (
        <div>
            <Navbar
                color="dark"
                dark
                expand="md"
            >
                <NavbarBrand href="/">
                    Manager Dashboard
                </NavbarBrand>
                <NavbarText navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        {LoginOrLogout()}
                    </Nav>
                </NavbarText>
            </Navbar>
        </div>
    );
}