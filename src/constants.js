import { format } from 'date-fns';
export const API_CASHIER = 'http://localhost:8000';

// Image file format
export const FILE_SIZE = 1024 * 2000; // 2mb
// export const FILE_SIZE = 2000000; // 2mb
export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const COLUMNS_USER = [
	{
		Id: 'id',
		Header: 'Id',
		Footer: 'Id',
		accessor: 'id',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'name',
		Header: 'Name',
		Footer: 'Name',
		accessor: 'name',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'email',
		Header: 'Email',
		Footer: 'Email',
		accessor: 'email',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'place',
		Header: 'Place',
		Footer: 'Place',
		accessor: 'place_of_birth',
	},
	{
		Id: 'date_of_birth',
		Header: 'Date of Birth',
		Footer: 'Date of Birth',
		accessor: 'date_of_birth',
		Cell: ({ value }) => {
			return format(new Date(value), 'dd/MM/yyyy');
		},
	},
	{
		Id: 'gender',
		Header: 'Gender',
		Footer: 'Gender',
		accessor: 'gender',
	},
	{
		Id: 'point',
		Header: 'Point',
		Footer: 'Point',
		accessor: 'point',
	},
];

export const COLUMNS_CATEGORY = [
	{
		Id: 'id',
		Header: 'Id',
		Footer: 'Id',
		accessor: 'id',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'name',
		Header: 'Name',
		Footer: 'Name',
		accessor: 'name',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'description',
		Header: 'Description',
		Footer: 'Description',
		accessor: 'description',
		sticky: 'left',
		sortType: 'basic',
	},
];

export const COLUMNS_PRODUCT = [
	{
		Id: 'id',
		Header: 'Id',
		Footer: 'Id',
		accessor: 'id',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'name',
		Header: 'Name',
		Footer: 'Name',
		accessor: 'name',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'category',
		Header: 'Category',
		Footer: 'Category',
		accessor: 'category',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'weight',
		Header: 'Weight',
		Footer: 'Weight',
		accessor: 'weight',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'price',
		Header: 'Price',
		Footer: 'Price',
		accessor: 'price',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'stock',
		Header: 'Stock',
		Footer: 'Stock',
		accessor: 'stock',
		sticky: 'left',
		sortType: 'basic',
	},
];

export const COLUMNS_GIFT = [
	{
		Id: 'id',
		Header: 'Id',
		Footer: 'Id',
		accessor: 'id',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'name',
		Header: 'Name',
		Footer: 'Name',
		accessor: 'name',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'point',
		Header: 'Point',
		Footer: 'Point',
		accessor: 'point',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'stock',
		Header: 'Stock',
		Footer: 'Stock',
		accessor: 'stock',
		sticky: 'left',
		sortType: 'basic',
	},
];

export const COLUMNS_TRANSACTION = [
	{
		Id: 'id',
		Header: 'Id',
		Footer: 'Id',
		accessor: 'id',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'invoice_number',
		Header: 'Invoice number',
		Footer: 'Invoice number',
		accessor: 'invoice_number',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'product',
		Header: 'Product',
		Footer: 'Product',
		accessor: 'product',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'customer_name',
		Header: 'Customer Name',
		Footer: 'Customer Name',
		accessor: 'customer_name',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'cashier_name',
		Header: 'Cashier Name',
		Footer: 'Cashier Name',
		accessor: 'cashier_name',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'quantity',
		Header: 'Quantity',
		Footer: 'Quantity',
		accessor: 'quantity',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'price',
		Header: 'Price',
		Footer: 'Price',
		accessor: 'price',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'total',
		Header: 'Total',
		Footer: 'Total',
		accessor: 'total',
		sticky: 'left',
		sortType: 'basic',
	},
];

export const COLUMNS_CLAIM_GIFT = [
	{
		Id: 'id',
		Header: 'Id',
		Footer: 'Id',
		accessor: 'id',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'customer_name',
		Header: 'Customer Name',
		Footer: 'Customer Name',
		accessor: 'customer_name',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'gift_name',
		Header: 'Gift Name',
		Footer: 'Gift Name',
		accessor: 'gift_name',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'quantity',
		Header: 'Quantity',
		Footer: 'Quantity',
		accessor: 'quantity',
		sticky: 'left',
		sortType: 'basic',
	},
	{
		Id: 'total_point',
		Header: 'Total Point',
		Footer: 'Total Point',
		accessor: 'total_point',
		sticky: 'left',
		sortType: 'basic',
	},
];
