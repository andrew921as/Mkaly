import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider} from '@emotion/react';
import theme from '../src/theme/theme';
import createEmotionCache from '../src/createEmotionCache';
import Login from './Login';
import FullLayout from '../src/layouts/FullLayout';
import '../styles/style.css';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
	const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
	// States
	// const [user, setUser] = useState(null);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>Energeia ⚡️</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Login />
				{/* <FullLayout>
					<Component {...pageProps} />
				</FullLayout> */}
			</ThemeProvider>
		</CacheProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};
