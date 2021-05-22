import Skeleton from "react-loading-skeleton";
import React from "react";
import { useState } from "react";
import AuditItem from "./../Components/AuditItem";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";

function AllAudits() {
	const [data, setData] = useState([]);
	const [loader, setLoader] = useState(true);
	const history = useHistory();

	console.log("hi");
	//self invoing function before render is complete
	React.useEffect(() => {
		renderList();
	}, []);

	async function renderList() {
		// POST request using fetch with async/await
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		};
		//show loader now

		try {
			const response = await fetch(
				"http://localhost:4000/api/v1/audit?page=1&limit=10",
				requestOptions
			);
			setLoader(false);
			const data = await response.json();
			setData(data.message);
		} catch (err) {
			setLoader(false);
		}
	}
	const edit = (code) => {
		history.push("/edit-audit/" + code);
	};

	const del = async (code) => {
		//show loader now
		try {
			const response = await axios.delete(
				"http://localhost:4000/api/v1/audit/" + code
			);
			if (response.data.success) {
				history.go(0);
			}
		} catch (err) {
			setLoader(false);
		}
	};

	return (
		<div>
			{loader === false ? (
				<div Style="margin:auto; text-align:center; width:80%; justifyContent:center; alignItems:center; ">
					<br></br>
					<Link
						to="/add-audit"
						Style="color:gray;text-decoration:none;"
					>
						<div Style="display:inline-block;"></div>
						<span Style="font-size:19px;">
							Want to make an entry? &nbsp;&nbsp;
						</span>
						<Button variant="contained" color="primary">
							Click Here
						</Button>
					</Link>

					{data.map((item) => {
						return (
							<AuditItem
								code={item.code}
								name={item.name}
								address={item.address}
								description={item.description}
								latitude={item.latitude}
								longitude={item.longitude}
								createdAt={item.createdAt}
								updatedAt={item.updatedAt}
								createdBy={item.createdBy}
								updatedBy={item.updatedBy}
								edit={edit}
								del={del}
							/>
						);
					})}
				</div>
			) : (
				<div Style="margin:auto; text-align:left; width:120vh; margin-top:10vh; justifyContent:left; alignItems:left; ">
					<Skeleton width={350} />
					<br></br>
					<Skeleton width={200} />
					<br></br>
					<Skeleton width={900}  />{" "}
					<br></br>
					<Skeleton width={900}  />{" "}
					<br></br>
					<Skeleton width={900}  />{" "}
					<br></br>
					<div Style="display: inline-block;">
						{" "}
						<Skeleton height={35} width={75} />{" "}
						<span Style="margin-left:10px;"></span>{" "}
						<Skeleton height={35} width={75} />{" "}
					</div>
					<br></br><br></br><br></br>

					<Skeleton width={350} />
					<br></br>
					<Skeleton width={200} />
					<br></br>
					<Skeleton width={900}  />{" "}
					<br></br>
					<Skeleton width={900}  />{" "}
					<br></br>
					<Skeleton width={900}  />{" "}
					<br></br>
					<div Style="display: inline-block;">
						{" "}
						<Skeleton height={35} width={75} />{" "}
						<span Style="margin-left:10px;"></span>{" "}
						<Skeleton height={35} width={75} />{" "}
					</div>
					<br></br><br></br><br></br>

					<Skeleton width={350} />
					<br></br>
					<Skeleton width={200} />
					<br></br>
					<Skeleton width={900}  />{" "}
					<br></br>
					<Skeleton width={900}  />{" "}
					<br></br>
					<Skeleton width={900}  />{" "}
					<br></br>
					<div Style="display: inline-block;">
						{" "}
						<Skeleton height={35} width={75} />{" "}
						<span Style="margin-left:10px;"></span>{" "}
						<Skeleton height={35} width={75} />{" "}
					</div>
				</div>
			)}
		</div>
	);
}

export default AllAudits;
