import React, { useEffect, useState, useCallback, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { LoaderData } from '../../../components/atoms';
import { ClaimGiftService } from '../../../service';
import './list-claim-gift.scss';
import TableClaimGift from '../../../components/molecules/TableClaimGift';

const ListClaimGift = (props) => {
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
		ClaimGiftService.getClaimGifts()
			.then((response) => {
				setData(response.data.claim_gifts);
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
			{/* List data claim gift */}
			<div className="card shadow mb-4">
				<div className="card-header py-3">
					<h6 className="m-0 font-weight-bold text-dark">List of Claim Gift</h6>
				</div>
				<div className="card-body">
					{loading ? (
						<div className="text-center">
							<LoaderData />
						</div>
					) : (
						<TableClaimGift data={data} />
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default ListClaimGift;
