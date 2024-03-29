import {MenuUnstyledContext} from '@mui/base';

export default {
	LandingP: {
		Title: 'Bienvenido a  MKALY',
		Subtitle: 'Siempre a tu lado',
		Description: 'Nuestra compañia esta lista para proveerte con los mejores servicios y precios',
		CallButton: 'Llama ya',
		Menu: {
			Start: 'Inicio',
			About: 'Acerca de nosotros',
			New: 'Nuvos Proyectos',
			Contact: 'Contactanos',
			Consult: 'Consultar Factura',
			Download: 'Descargar Factura',
			Language: 'Cambiar idioma',
			Login: 'Iniciar sesion',
		},
	},
	AboutUs: {
		Title: 'ACERCA DE NOSOTROS',
		Description1: 'Somos una empresa multinacional que ah estado suministrando energia a mas de 50 ciudades al rededor del mundo.',
		Description2:
			'Dando una sensacion de confianza con nustros mas de 30 años de experiencia brindando un excelente ServiceWorkerRegistration, siempre respetuose y tratando de resolver cada problema en tiempo record.',
	},
	ContactUs: {
		Title: 'CONTACTANOS',
		Place: 'Direccion/Barrio',
		ButtonSend: 'Enviar',
		Phone: 'TELEFONO:',
		NationalL: 'LINEA NACIONAL:',
	},

	NewProject: {
		Title1: 'PROYECTOS',
		Title2: 'EN CAMINO',
		Description1: 'Nosotros siempre intentamos estar cada día mas cerca de ti.',
		Description2: 'Con este proposito en mente, finalmente iniciamos obras para 2 nuevas sedes.',
		Description3:
			'Nuestras fuentes de energía son renovables, mostrando nuestra preocupación por el medio ambiente. Al mismo tiempo ofrecemos puestos de trabajo a las comunidades cercanas para que así hagan parte del cambio.',
		Expansion: 'Nos estamos expandiendo a dos nuevas zonas: Tulua, Pradera y Miriti Paraná',
		Energy: 'Suminstrando energía limpia, nuevos paneles solares y aerogeneradores',
	},

	Form: {
		userName: 'Nombre de Usuario',
		password: 'Contraseña',
		first_name: 'Primer Nombre',
		second_name: 'Segundo nombre',
		first_last_name: 'Primer Apellido',
		second_last_name: 'Segundo Apellido',
		Email: 'Email',
		Rol: {
			Title: 'Rol de usuario',
			admin: 'administrador',
			manager: 'gerente',
			operator: 'operador',
			client: 'cliente',
		},
		documentType: 'Tipo de documento',
		IDNumber: 'Numero de identificacion',
		City: 'Ciudad',
		PhoneN: 'Numero de telefono',
		ClientType: {
			Title: 'Tipo de cliente',
			Natural: 'Natural',
			Bussiness: 'Empresarial',
		},
		HeadQuarters: {
			Title: 'Sedes',
			North: 'Norte',
			West: 'Oeste',
			Est: 'Este',
			South: 'Sur',
		},
		RegisterB: 'Registrar',
	},
	UserForm: {
		handleRegisterUser: {
			Success: 'El usuario fue creado correctamente',
			Warning: 'Hubo un error, Intenta mas tarde.',
		},
		handleUpdateUser: {
			Success: 'El usuario fue actualizado correctamente',
		},
	},
	LoginP: {
		NoRegis: 'Aun no estas registrado?',
		NoRegisP1: 'Acercate al punto de atencion mas cercano y un operador te atendera',
		NoRegisP2: 'O contactanos por nuestra linea principal: ',
		Title: 'Iniciar sesion',
		LoginB: 'Iniciar sesion',
	},
	client_management: {
		payment: {
			FactureNumber: 'Numero de factura',
			TitleRegPago: 'Registrar pago en línea',
			ButtonPay: 'Pagar',
			TitleMessage: 'Importante',
			MessageImp:
				'Recuerde que solo se pueden hacer pagos de los meses vencidos en linea. En tambien tiene la opion de acérquese a una de nuestras sedes o contactar nuestro call center.',
			success: 'Pago exitoso',
			warningAlreadyPaid: 'Error, la factura ya está pagada',
			warning: 'No se encontró la factura',
			error: 'Hubo un error',
		},
	},
	user_management: {
		payment: {
			FactureNumber: 'Numero de factura',
			TitleRegPago: 'Registrar pago',
			ButtonPay: 'Pagar',
			TitleMessage: 'Importante',
			MessageImp:
				'Recuerde que solo se pueden hacer pagos de los meses vencidos en linea. En tambien tiene la opion de acérquese a una de nuestras sedes o contactar nuestro call center.',
			success: 'Pago exitoso',
			warningAlreadyPaid: 'Error, la factura ya está pagada',
			warning: 'No se encontró la factura',
			error: 'Hubo un error',
		},
	},
	InvoiceCa: {
		UpTo: 'AL DIA',
		Value: 'Valor : $20.000',
		Pay: 'PAGO',
	},
	ProfileD: {
		Hi: 'Hola,',
		EditPro: 'Editar Perfil',
		ChangeLan: 'Cambiar idioma',
		ButtonLogO: 'Cerrar sesión',
	},
	EditProfil: {
		Title: 'Ediar Perfil',
		upProPic: 'Cargar foto de perfil',
		update: 'Actualizar',
	},
	Dashboar: {
		operatorD: {
			title: 'MANEJO DE CLIENTES',
			registerCli: 'REGISTRAR CLIENTE',
			modifyCli: 'MODIFICAR CLIENTE',
			searchCli: 'BUSCAR CLIENTES',
			registerPay: 'REGISTRAR PAGOS',
		},
		managerD: {
			sales: 'Ventas',
			clientSta: 'Estado de clientes',
			activeSuspend: 'Servicios Activos/Suspendidos',
			onlineFace: 'Pagos en Linea vs Presenciales',
			clientSservices: {
				clientDebt: 'En deuda',
				clientUpto: 'Al dia',
				clientSus: 'Suspendidos',
				clientActive: 'Activos',
			},
		},
		adminD: {
			sales: 'Ventas',
			usersSimus: 'Usuarios activos al tiempo',
			users: {
				Title: 'Usuarios',
				Admins: 'Administradores',
				Managers: 'Gerentes',
				Operators: 'Operadores',
				Clients: 'Clientes',
			},
		},
	},
	EditClient: {
		Title: 'Editar Perfil del Cliente',
		description: 'Escribe el numero de identificacion del cliente que deseas modificar',
		search: 'Buscar',
		warningNotCli: 'El usuario que estas deseando buscar no es un cliente.',
		warningNotFou: 'Usuario no encontrado.',
	},
	userManageP: {
		Title: 'MANEJO DE USUARIOS',
		registeU: 'REGISTRAR USUARIO',
		modifyU: 'MODIFICAR USUARIO',
		searchU: 'BUSCAR USUARIO',
	},
	userRegistration: 'Registrar Usuario',
	EditUser: {
		Title: 'Editar Perfil del Usuario',
		description: 'Escribe el numero de identificacion del usuario que deseas modificar',
		idNumber: 'Numero ID',
		warningNotFou: 'Usuario no encontrado.',
	},
	InfoUser: {
		email: 'Email',
		username: 'Nombre de usuario',
		idCard: 'Número de identificación',
		city: 'Ciudad',
		active: 'Activo',
		role: 'Rol',
		buttonCreateContract: 'Crear Nuevo Contrato',
		contract: {
			contractStart: 'Contrato #',
			contractAddress: 'Dirección: ',
		},
	},
	ContractForm: {
		contractNumber: 'Número de contrato',
		startContract: 'Inicio de contrato (fecha)',
		service: 'Servicio',
		serviceDescription: 'Descripción del servicio',
		postalCode: 'Código postal',
		city: 'Ciudad',
		neighbourhood: 'Barrio',
		typeOfAvenue: 'Tipo de calle',
		firstNumber: 'Primer Número',
		secondNumber: 'Segundo Número',
		stratumSocial: 'Estrato social',
		numberElectricTranformer: '# De transformadores eléctricos',
		transformerProperty: 'Propiedad del transformador',
		typeOfConnection: 'Tipo de conexión',
		interiorTypeOfConnection: 'Interior',
		exteriorTypeOfConnection: 'Exterior',
		buttonCreateContract: 'Crear',
		handleCreateContract: {
			Success: 'Contrato creado correctamente',
			Warning: 'Hubo un error, Intenta mas tarde.',
			warningNoFields: 'Debes llenar todos los campos',
		},
	},
	BillTable: {
		title: 'Tabla de facturas',
		search: 'Buscar Factura',
		billNumber: '# De Factura',
		expeditionDate: 'Fecha de expedición',
		expirationDate: 'Fecha de expiración',
		status: 'Estado',
		totalPayout: 'Cargo',
		isPaid: 'Pagado',
		pending: 'Pendiente',
		success: 'Pagado',
		mora: 'En mora',
		// contract: {
		// 	contractStart: 'Contract #',
		// 	contractAddress: 'Address: ',
		// },
	},
	UsersTable: {
		userName: 'User Name',
		password: 'Password',
		first_name: 'Nombre',
		second_name: 'Second Name',
		first_last_name: 'Apellido',
		second_last_name: 'Second Last Name',
		Email: 'Email',
		status: 'Estado',
		activate: 'Activar/Desactivar',
		Rol: {
			Title: 'Rol',
			Admin: 'Administrador',
			Manager: 'Gerente',
			Operator: 'Operador',
			Client: 'Cliente',
		},
		documentType: 'Type of Document',
		IDNumber: 'ID Number',
		City: 'City',
		PhoneN: 'Phone number',
		ClientType: {
			Title: 'Client Type',
			Natural: 'Natural',
			Bussiness: 'Business',
		},
		HeadQuarters: {
			Title: 'Headquarters',
			North: 'North',
			West: 'West',
			Est: 'Est',
			South: 'South',
		},
		RegisterB: 'Register',
		title: 'Tabla de usuarios',
		search: 'Buscar usuarios',
	},
	ClientsTable: {
		first_name: 'Nombre',
		first_last_name: 'Apellido',
		Email: 'Email',
		status: 'Estado',
		activate: 'Activate/Deactivate',
		title: 'Tabla de clientes',
		search: 'Buscar Clientes',
	},
	consultBill: {
		Title: 'Consultar factura',
		description: 'Enivar factura electronica',
		billNumber: '# Numero de factura',
		billEmail: '@ Correo electronico',
		Title2: 'Descargar factura',
	},
};
