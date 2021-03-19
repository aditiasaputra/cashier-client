import React, { useState, useMemo } from 'react';
import { Table as TableBS } from 'react-bootstrap';
import {
	useTable,
	useFilters,
	useGlobalFilter,
	useSortBy,
	usePagination,
	useAsyncDebounce,
} from 'react-table';
import { COLUMNS_PRODUCT } from '../../../constants';

// GLOBAL FILTER
const GlobalFilter = ({ filter, setFilter }) => {
	const [value, setValue] = useState(filter);

	const onChange = useAsyncDebounce((value) => {
		setFilter(value || undefined);
	}, 1000);
	return (
		<span>
			Search:{' '}
			<input
				className="form-control form-control-sm d-inline-block w-auto"
				value={value || ''}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
			/>
		</span>
	);
};

const TableProduct = (props) => {
	const columns = useMemo(
		() =>
			[...COLUMNS_PRODUCT].concat({
				id: 'action',
				Header: 'Action',
				Footer: 'Action',
				accessor: 'action',
				Cell: (cellInfo) => (
					<>
						{/* <button
							className="btn btn btn-info btn-sm mr-2"
							onClick={(e) => {
								e.preventDefault();
							}}
						>
							<i className="fas fa-fw fa-info fa-md"></i>
							<span>Detail</span>
						</button> */}
						<button
							className="btn btn btn-warning btn-sm mr-2"
							onClick={(e) => {
								e.preventDefault();
								props.setShow(true);
								const row = cellInfo.data.find(
									(el) => el.id === cellInfo.row.values.id
								);
								props.setProduct(row);
							}}
						>
							<i className="fas fa-fw fa-edit fa-md"></i>
							<span>Edit</span>
						</button>
						<button
							className="btn btn btn-danger btn-sm mr-2"
							onClick={(e) => {
								e.preventDefault();
								props.setDeleteShow(true);
								const row = cellInfo.data.find(
									(el) => el.id === cellInfo.row.values.id
								);
								props.setProduct(row);
							}}
						>
							<i className="fas fa-fw fa-trash fa-md"></i>
							<span>Delete</span>
						</button>
					</>
				),
			}),
		[props]
	);
	const data = useMemo(() => props.data, [props.data]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		pageOptions,
		page,
		state: { globalFilter, pageIndex, pageSize },
		gotoPage,
		nextPage,
		previousPage,
		canPreviousPage,
		canNextPage,
		pageCount,
		setPageSize,
		setGlobalFilter,
		prepareRow,
	} = useTable(
		{
			columns,
			data,
			initialState: {
				sortBy: [
					{
						id: 'id',
						desc: false,
					},
				],
				pageSize: 5,
			},
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const { editModal: EditProductModal } = props;
	const { deleteModal: DeleteProductModal } = props;

	return (
		<React.Fragment>
			{EditProductModal}
			{DeleteProductModal}
			<div className="float-md-left mb-2">
				<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
			</div>
			<TableBS responsive striped bordered hover {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render('Header')}
									<span>
										{column.isSorted
											? column.isSortedDesc
												? ' 🔽'
												: ' 🔼'
											: ''}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
				<tfoot>
					{footerGroups.map((footerGroup) => (
						<tr {...footerGroup.getFooterGroupProps()}>
							{footerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render('Footer')}
									<span>
										{column.isSorted
											? column.isSortedDesc
												? ' 🔽'
												: ' 🔼'
											: ''}
									</span>
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</TableBS>
			<div className="my-2">
				<button
					className="btn btn-light btn-sm"
					onClick={() => gotoPage(0)}
					disabled={!canPreviousPage}
				>
					{'<<'}
				</button>{' '}
				<button
					className="btn btn-info btn-sm"
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					Previous
				</button>{' '}
				<button
					className="btn btn-info btn-sm"
					onClick={() => nextPage()}
					disabled={!canNextPage}
				>
					Next
				</button>{' '}
				<button
					className="btn btn-light btn-sm"
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					{'>>'}
				</button>{' '}
				<span>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>
				<span>
					| Go to page:{' '}
					<input
						className="form-control form-control-sm d-inline-block"
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const pageNumber = e.target.value
								? Number(e.target.value) - 1
								: 0;
							gotoPage(pageNumber);
						}}
						style={{ width: '50px' }}
					/>
				</span>{' '}
				<select
					className="form-control form-control-sm w-auto d-inline-block d-md-inline-block mt-md-1"
					value={pageSize}
					onChange={(e) => setPageSize(Number(e.target.value))}
				>
					{[5, 10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</React.Fragment>
	);
};

export default TableProduct;
