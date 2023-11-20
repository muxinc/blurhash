import Link from 'next/link';

const Home = () => (
	<>
		<h1>@mux/blurhash + Next.js</h1>
		<ul>
			<li>
				<Link href="/basic">
					<a>Basic Usage</a>
				</Link>
			</li>
			<li>
				<Link href="/lazy">
					<a>Lazy Loading</a>
				</Link>
			</li>
		</ul>
	</>
);

export default Home;
