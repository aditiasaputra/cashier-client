import React, { useEffect, useState, useCallback, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { LoaderData } from '../../../components/atoms';
import { TransactionService } from '../../../service';
import './list-transaction.scss';
import TableTransaction from '../../../components/molecules/TableTransaction';

const ListTransaction = (props) => {
	const mounted = useRef(false);

	const [data, setData] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!mounted.current) {
			// mounting
		} else {
			// updating
		}
	});

	const fetchData = useCallback(() => {
		TransactionService.getTransactions()
			.then((response) => {
				setData(response.data.transactions);
				setLoading(false);
			})
			.catch((error) => {
				toast.error(error, { duration: 3000 });
			});
	}, []);

	useEffect(() => {
		if (!mounted.current) {
			// mounting
			fetchData();
		} else {
			// updating
			mounted.current = true;
		}
	}, [fetchData]);

	return (
		<React.Fragment>
			<Toaster position="top-center" />
			{/* List data transaction */}
			<div className="card shadow mb-4">
				<div className="card-header py-3">
					<h6 className="m-0 font-weight-bold text-dark">
						List of Transactions
					</h6>
				</div>
				<div className="card-body">
					{loading ? (
						<div className="text-center">
							<LoaderData />
						</div>
					) : (
						<TableTransaction data={data} />
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default ListTransaction;
