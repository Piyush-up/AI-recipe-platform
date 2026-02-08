import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Cookie, Refrigerator } from "lucide-react";
import UserDropdown from "./UserDropdown";
import checkUser from "@/lib/checkUser";

async function Header() {
  let user = await checkUser();

  return (
    <header className=" fixed top-0 w-full border-b border-stone-400 bg-stone-50/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-stone-50/60">
      <nav className=" container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={user ? "/dashobard" : "/"}>
          <Image
            src="/orange-logo.png"
            alt="Servd logo"
            width={60}
            height={60}
            className="w-16"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-600">
          <Link
            href="/recipes"
            className="hover:text-orange-600 transition-colors flex gap-1.5 items-center"
          >
            <Cookie className="h-4 w-4" />
            Recipes
          </Link>
          <Link
            href="/pantry"
            className=" hover:text-orange-600 transition-colors flex gap-1.5 items-center"
          >
            <Refrigerator className="h-4 w-4" />
            Pantry
          </Link>
        </div>

        {/* AUTHENTICATION STATE */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            {/* See recipes and learn how to cook */}
            <UserDropdown />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="text-stone-600 hover:bg-orange-50 hover:text-orange-600"
              >
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                variant="primary"
                className=" bg-orange-400 rounded-full px-6"
              >
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}

export default Header;
