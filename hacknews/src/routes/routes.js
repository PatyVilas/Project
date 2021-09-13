import {
	Home,
	RegistrationForm,
	ValidateUser,
	Login,
	Profile,
	EditUser,
	NewEntry,
	ReadEntry,
	EditEntry,
	ContactForm,
	NotFound,
	RecoverPass,
	ResetPass,
} from '../pages';

const routes = [
	{
		path: '/registration',
		Page: RegistrationForm,
	},
	{
		path: '/login',
		Page: Login,
	},
	{
		path: '/users/validate',
		Page: ValidateUser,
	},
	{
		path: '/users/:idUser',
		exact: true,
		Page: Profile,
	},
	{
		path: '/editUser/:idUser',
		Page: EditUser,
	},
	{
		path: '/newEntry',
		Page: NewEntry,
	},
	{
		path: '/recoverPass',
		Page: RecoverPass,
	},
	{
		path: '/resetPass',
		Page: ResetPass,
	},
	{
		path: '/editEntry/:idEntry',
		Page: EditEntry,
	},
	{
		path: '/entries/:idEntry',
		Page: ReadEntry,
	},
	{
		path: '/contact',
		exact: true,
		Page: ContactForm,
	},
	{
		path: '/',
		exact: true,
		Page: Home,
	},
	{
		path: '*',
		Page: NotFound,
	},
];

export default routes;
