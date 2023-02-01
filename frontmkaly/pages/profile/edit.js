import React from 'react';
import { useRouter } from 'next/router';
import {ProfileForm} from '../../src/components';

import en from '../../public/languages/en';
import es from '../../public/languages/es';

const EditProfile = () => {
	const router = useRouter()
	const {locale}= router
	const t = locale === 'en' ? en : es
	return (
		<>
			<ProfileForm title={t.EditProfil.Title}/>
		</>
	);
};

export default EditProfile;
