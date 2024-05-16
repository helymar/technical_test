'use client'

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";
import { useEffect, useState } from "react";

export const Navbar = () => {
	const [token, setToken] = useState('');

	function handleClick() {
		// delete token
		localStorage.removeItem('token');
		// redirect to login
		window.location.href = '/';
	}
	
	// verfy token
	useEffect(() => {
		function useToken() {
			const getToken = () => {
				const tokenString = localStorage.getItem('token');
				if (tokenString) {
					const userToken = JSON.parse(tokenString);
					return userToken?.token

				};
			};
			setToken(getToken());
		}
	}, [])

	return (
		<NextUINavbar maxWidth="xl" position="sticky">


			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				{
					token ? '' :
					(<NavbarItem className="md:flex">
					<Button
						className="text-sm font-normal text-default-600 bg-default-100"
						variant="flat"
						onPress={handleClick}
					>
						Salir
					</Button>
				</NavbarItem>) 

				}
				
			</NavbarContent>
		</NextUINavbar>
	);
};
