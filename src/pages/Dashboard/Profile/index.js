import React from 'react';

const Profile = () => {
	return (
		<React.Fragment>
			<div className="row justify-content-center">
				<div className="col-lg-8 order-lg-2">
					<div className="card shadow mb-4">
						<div className="card-profile-image mt-4">
							<figure
								className="rounded-circle avatar avatar font-weight-bold"
								style={{ fontSize: '60px', height: '180px', width: '180px' }}
								data-initial="Muhamad Aditia Saputra"
							/>
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col-lg-12">
									<div className="text-center">
										<h5 className="font-weight-bold">Muhamad Aditia Saputra</h5>
										<p>Administrator</p>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-4">
									<div className="card-profile-stats">
										<span className="font-weight-bold d-block">Email</span>
										<span className="description">youremail@mail.com</span>
									</div>
								</div>
								<div className="col-md-4">
									<div className="card-profile-stats">
										<span className="font-weight-bold d-block">Gender</span>
										<span className="description">Male</span>
									</div>
								</div>
								<div className="col-md-4">
									<div className="card-profile-stats">
										<span className="font-weight-bold d-block">Point</span>
										<span className="description">35</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Profile;
