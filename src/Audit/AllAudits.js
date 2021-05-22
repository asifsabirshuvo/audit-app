import Skeleton from "react-loading-skeleton";
import React from "react";
import { useState } from "react";
import AuditItem from './../Components/AuditItem';
import {Link, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

function AllAudits() {
	const [data, setData] = useState([]);
	const [loader, setLoader] = useState(true);
    const history = useHistory();

    console.log("hi");
	//self invoing function before render is complete
	React.useEffect(() => {
		tryInfo();
	}, []);

	async function tryInfo() {
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
            const data = await response.json();
			setData(data.message);
		} catch (err) {
            setLoader(false);
		}
	}
      const edit = (code) => {
		history.push("/edit-audit/"+code);

      };


	return (
		<div Style="margin:auto; text-align:center; width:80%; justifyContent:center; alignItems:center; ">
			<br></br>
            <Link  to="/add-audit" Style="color:gray;text-decoration:none;">
            <div Style="display:inline-block;"></div>
            <span Style="font-size:19px;">Want to make an entry? &nbsp;&nbsp;</span>
            <Button variant="contained" color="primary">
                Click Here
            </Button>
            </Link>

            	{data.map((item)=> {
					 return <AuditItem
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
                     edit = {edit}
                   />
				})}
			{/* <Skeleton width={300} />
			<br></br>
			<div Style="display: inline-block;">
				<Skeleton height={60} width={60} />
				<span Style="margin-left:10px;"></span>
				<Skeleton height={60} width={60} />
				<span Style="margin-left:10px;"></span>
				<Skeleton height={60} width={60} />
				<span Style="margin-left:10px;"></span>
				<Skeleton height={60} width={60} />
				<span Style="margin-left:10px;"></span>
				<Skeleton height={60} width={60} />
			</div>
			<Skeleton count={3} />
			<div Style="display: inline-block;">
				<Skeleton height={35} width={35} />
				<span Style="margin-left:10px;"></span>
				<Skeleton height={35} width={35} />
			</div> */}
		</div>
	);
}

export default AllAudits;
