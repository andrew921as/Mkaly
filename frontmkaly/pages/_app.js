import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider} from '@emotion/react';
import theme from '../src/theme/theme';
import createEmotionCache from '../src/createEmotionCache';
import FullLayout from '../src/layouts/FullLayout';

// Context
import {UserContext, UserProvider} from '../src/context/UserContext';

import '../styles/style.css';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
	const router = useRouter();
	const {user, isUserAuthenticated} = React.useContext(UserContext);
	const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
	// States
	// const [user, setUser] = useState(null);

	React.useEffect(() => {
		if (!isUserAuthenticated) {
			router.push('/');
		}
	}, [user]);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>Energeia ⚡️</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{/* <Login /> */}
				<UserProvider>
					<FullLayout>
						<Component {...pageProps} />
					</FullLayout>
				</UserProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};
