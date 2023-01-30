import React from 'react';
import {useRouter} from 'next/router';
import {Button} from '@mui/material';
import {UserContractForm} from '../../../src/components';

// Diccionaries
import es from '../../../public/languages/es';
import en from '../../../public/languages/en';

const UserContract = () => {
	const router = useRouter();
	const {locale} = router;
	const t = locale === 'en' ? en : es;

	return (
		<div className="w-full h-full overflow-hidden">
			<h1 className="font-black text-4xl sm:ml-16">
				<span className="cursor-pointer" onClick={() => router.back()}>
					⬅️
				</span>
				Crear Nuevo Contrato
			</h1>
			<div className="text-lg flex flex-col sm:flex-row mt-16 items-center justify-around bg-primary">
				<UserContractForm></UserContractForm>
				{/* <div className="mb-16 sm:mb-0">
					<Button onClick={() => router.push(`/user-management/contracts/${userId}`)} sx={{color: 'white'}} color="blue" size="large" variant="contained">
						{t.InfoUser.buttonCreateContract}
					</Button>
				</div> */}
			</div>
		</div>
	);
};

export default UserContract;
