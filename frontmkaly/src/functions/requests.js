import axios from 'axios';
const API = 'http://localhost:8000';

// POST REQUESTS
export const payBill = async (billId) => {
	try {
		const res = await axios.put(`${API}/client_pay/${billId}`, {});
		// const res = await axios.get(`${API}/admin_view/`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const loginRequest = async (username, password) => {
	try {
		const res = await axios.post(`${API}/autenticate_view/`, {email: username, password});
		// const res = await axios.get(`${API}/admin_view/`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const registerUser = async (data) => {
	try {
		const res = await axios.post(`${API}/admin_view/`, data);

		// const res = await axios.get(`${API}/admin_view/`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const createContract = async (userId, data) => {
	try {
		const res = await axios.post(`${API}/create_contract/${userId}`, data);

		// const res = await axios.get(`${API}/admin_view/`);
		return res;
	} catch (err) {
		throw err;
	}
};

// PUT REQUESTS

export const userEnableDisable = async (userId, data) => {
	try {
		const userD = await axios.put(`${API}/admin_enable/${userId}`, data);
		return userD;
	} catch (e) {
		throw e;
	}
};

export const updateUser = async (userId, data) => {
	try {
		const userD = await axios.put(`${API}/admin_view/${userId}`, data);
		return userD;
	} catch (e) {
		throw e;
	}
};

export const updateUserAdmin = async (userId, data) => {
	try {
		const userD = await axios.put(`${API}/admin_edit/${userId}`, data);
		return userD;
	} catch (e) {
		throw e;
	}
};

export const updateUserClient = async (userId, data) => {
	try {
		const userD = await axios.put(`${API}/client_edit/${userId}`, data);
		return userD;
	} catch (e) {
		throw e;
	}
};

export const updateUserOperator = async (userId, data) => {
	try {
		const userD = await axios.put(`${API}/operator_edit/${userId}`, data);
		return userD;
	} catch (e) {
		throw e;
	}
};

export const updateUserManager = async (userId, data) => {
	try {
		const userD = await axios.put(`${API}/manager_edit/${userId}`, data);
		return userD;
	} catch (e) {
		throw e;
	}
};

// GET REQUESTS

export const getIsPaidBill = async (billId) => {
	try {
		const userD = await axios.get(`${API}/client_pay/${billId}`);
		return userD;
	} catch (e) {
		throw e;
	}
};

export const getUser = async (userId) => {
	try {
		const userD = await axios.get(`${API}/admin_view/${userId}`);
		return userD;
	} catch (e) {
		throw e;
	}
};

export const getUsers = async () => {
	try {
		const usersD = await axios.get(`${API}/admin_view/`);
		return usersD;
	} catch (e) {
		throw e;
	}
};

export const searchClient = async (clientId) => {
	try {
		const clientD = await axios.get(`${API}/manager_view/${clientId}`);
		return clientD;
	} catch (e) {
		throw e;
	}
};

export const getClients = async () => {
	try {
		const clientsD = await axios.get(`${API}/manager_view/`);
		return clientsD;
	} catch (e) {
		throw e;
	}
};

export const getClientContracts = async (clientId) => {
	try {
		const clientsD = await axios.get(`${API}/client_view/${clientId}`);
		return clientsD;
	} catch (e) {
		throw e;
	}
};

export const getClientBills = async (clientId) => {
	try {
		const clientsD = await axios.get(`${API}/search_all_bills/${clientId}`);
		return clientsD;
  } catch (e) {
    throw e;
  }

export const getPDF = async (data) => {
	try {
		const PDF = await axios.get(`${API}/pdf_view_download/${data}`);
		return PDF;

	} catch (e) {
		throw e;
	}
};

export const postCorreoPdf = async (data)=> {
	try {
		const PDF = await axios.post(`${API}/pdf_view/`,data);
		return PDF;
	} catch (e) {
		throw e;
	}
};

// export const postCorreoPdf = async (billN, email)=> {
// 	try {
// 		const PDF = await axios.post(`${API}/pdf_view`,{"email": email, "bill_number":billN});
// 		return PDF;
// 	} catch (e) {
// 		throw e;
// 	}
// };

