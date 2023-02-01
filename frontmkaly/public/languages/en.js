
export default {
	LandingP: {
		Title: 'Welcome to MKALY',
		Subtitle: 'A helping hand',
		Description: 'Our company is ready to provide you with the best service and prices',
		CallButton: 'Call now',
		Menu: {
			Start: 'Start',
			About: 'About us',
			New: 'New projects',
			Contact: 'Contact',
			Consult: 'Consult bills',
			Language: 'Change language',
			Login: 'Login',
		},
	},
	AboutUs: {
		Title: 'ABOUT US',
		Description1: 'We are a multinational company that have been providing energy to more than 50 citys around the world.',
		Description2:
			'Providing a felling of trust whit our 30 years of experience bringing an excellent service, always been respectful and trying to solve any problem in record time',
	},
	ContactUs: {
		Title: 'CONTACT US',
		Place: 'Address/Neighborhood',
		ButtonSend: 'Send',
		Phone: 'PHONE:',
		NationalL: 'NATIONAL LINE:',
	},
	NewProject: {
		Title1: 'NEW',
		Title2: 'PROJECTS',
		Description1: 'We are always trying to get closer to you.',
		Description2: 'Following our propose we are finally starting projects in 2 new places.',
		Description3:
			'Our energy sources are renewable, so we care about the environment. At the same time we offer work to the surrounding communities so that they can also be part of the change.',
		Expansion: 'We are expanding to new zones: Tulua, Pradera and Miriti Paraná',
		Energy: 'Becoming clean,new solar panels and wind power',
	},
	Form:{
		userName:"User Name",
		password:"Password",
		first_name:"First Name",
		second_name:"Second Name",
		first_last_name:"First Last Name",
		second_last_name:"Second Last Name",
		Email:"Email",
		Rol:{
			Title: "User Role",
			Admin: "admin",
			Manager : "manager",
			Operator: "operator",
			Client: "client"

		},
		documentType:"Type of Document",
		IDNumber:"ID Number",
		City:"City",
		PhoneN:"Phone number",
		ClientType:{
			Title:"Client Type",
			Natural:"Natural",
			Bussiness:"Business"
		},
		HeadQuarters:{
			Title:"Headquarters",
			North:"North",
			West:"West",
			Est:"Est",
			South:"South",
		},
		RegisterB:"Register",
	},
	UserForm: {
		handleRegisterUser: {
			Success: 'User was created successfully',
			Warning: 'There was an error, try again later.',
		},
		handleUpdateUser: {
			Success: 'User was updated successfully',
		},
	},

	LoginP:{
		NoRegis:"haven't registered yet?",
		NoRegisP1:"Come to the nearest points and our operators will help you",
		NoRegisP2:"Or get in touch with us through our main line: ",
		Title:"LOGIN",
		LoginB:"Log In"
	},
	client_management:{
		payment :{
			FactureNumber: "Invoice number",
			TitleRegPago: 'Register your payment',
			ButtonPay: 'Submit',
			TitleMessage: 'Important',
			MessageImp : "Remember that you can only make payments for the past due months online. You also have the option to visit one of our branches or contact our call center.",
			success: "Payment was successful",
			warningAlreadyPaid: "Error, The bill is already paid",
			warning: "Bill not found",
			error: "There was an error"
		}
	},
	user_management:{
		payment :{
			TitleRegPago: 'Register payment',
		}
	},

	InvoiceCa:{
		UpTo:"UP TO DAY",
		Value:"Value : $20.000",
		Pay:"PAY"
	},
	ProfileD:{
		Hi:"Hi,",
		EditPro:"Edit Profile",
		ChangeLan: "Change Language",
		ButtonLogO:"Logout"
	},
	EditProfil:{
		Title:"Edit Profile",
		upProPic:"Upload Profile Picture",
		update:"Update"
	},
	Dashboar:{
		operatorD:{
			title:"CLIENT MANAGEMENT",
			registerCli:"REGISTER CLIENT",
			modifyCli:"MODIFY CLIENT",
			searchCli:"SEARCH CLIENT",
			registerPay:"REGISTER PAYMENTS",
		},
		managerD:{
			sales:"Sales",
			clientSta:"Clients State",
			activeSuspend:"Active/Suspended services",
			onlineFace:"Online vs Face-to-face Payments",
			clientSservices:{
				clientDebt:"In debt",
				clientUpto:"Up to date",
				clientSus:"Suspended",
				clientActive:"Active",
			},
		},
		adminD:{
			sales:"Sales",
			usersSimus:"Users simultaneously logged on",
			users:{
				Title:"Users",
				Admins: "Admins",
				Managers: "Managers",
				Operators: "Operators",
				Clients: "Clients"
			}
		}
	},
	EditClient:{
		Title:"Edit Client Profile",
		description:"Write down the Id number of the client you are willing to edit",
		search:"Search",
		warningNotCli:"The user you are trying to edit is not a client.",
		warningNotFou:"User not found.",

	},
	userManageP:{
		Title:"USER MANAGEMENT",
		registeU:"REGISTER USER",
		modifyU:"MODIFY USER",
		searchU:"SEARCH USER",
	},
	userRegistration:"User Registration",
	EditUser:{
		Title:"Edit User Profile",
		description:"Write down the Id number of the user you are willing to edit",
		idNumber:"ID Number",
		warningNotFou:"User not found.",
	},
	InfoUser: {
		email: 'Email',
		username: 'Username',
		idCard: 'Id Card',
		city: 'City',
		active: 'Active',
		role: 'Role',
		buttonCreateContract: 'Create New Contract',
		contract: {
			contractStart: 'Contract #',
			contractAddress: 'Address: ',
		},
	},
	ContractForm: {
		contractNumber: 'Contract Number',
		startContract: 'Start Contract',
		service: 'Service',
		serviceDescription: 'Services Description',
		postalCode: 'Postal Code',
		city: 'City',
		neighbourhood: 'Neighbourhood',
		typeOfAvenue: 'Type Of Avenue',
		firstNumber: 'First Number',
		secondNumber: 'Second Number',
		stratumSocial: 'Social Stratum',
		numberElectricTranformer: '# Of Electric Transformers',
		transformerProperty: 'Transformer Property',
		typeOfConnection: 'Type Of Connection',
		interiorTypeOfConnection: 'Interior',
		exteriorTypeOfConnection: 'Exterior',
		buttonCreateContract: 'Create',
		handleCreateContract: {
			Success: 'Contract was created successfully',
			Warning: 'There was an error, try again later.',
			warningNoFields: 'You need to fill all the fields',
		},
	},
};

