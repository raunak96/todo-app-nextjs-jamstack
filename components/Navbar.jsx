const Navbar = ({ user }) => {
	return (
		<nav className="flex justify-between py-10 items-center">
			<p className="text-2xl font-bold text-blue-800">
				{user.name}'s Todos
			</p>
			<div className="flex">
				{user && (
					<a
						href="/api/auth/logout"
						className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">
						Logout
					</a>
				)}
				{!user && (
					<a
						href="/api/auth/login"
						className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">
						Login
					</a>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
