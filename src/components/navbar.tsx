import Link from "next/link";
import {Button} from "@/components/ui/button";
import {
    LoginLink,
    RegisterLink,
    LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";


export default async function Navbar() {
    const {isAuthenticated} = getKindeServerSession();
    const isLoggedin = await isAuthenticated();
    return (
        <nav>
            {
                isLoggedin ? (
                    <LogoutLink>
                        <Button>Logout</Button>
                    </LogoutLink>
                ) : (
                    <>
                        <LoginLink>
                            <Button>Login</Button>
                        </LoginLink>
                        <RegisterLink>
                            <Button>Register</Button>
                        </RegisterLink>
                    </>
                )
            }

        </nav>
    );
}