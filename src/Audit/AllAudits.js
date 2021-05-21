import Skeleton from "react-loading-skeleton";
import React from "react";
import axios from "axios";
import { useState } from "react";
import AuditItem from './../Components/AuditItem';

function AllAudits() {
	const [data, setData] = useState([]);
	const [loader, setLoader] = useState(true);

    // var del = async (index) => {
    //     console.log("inside del");
    
    //     var bearer = "Bearer " + localStorage.getItem("token");
    
    //     console.log(list[index]._id);
    
    //     const requestOptions = {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: bearer,
    //       },
    //       body: JSON.stringify({ productId: list[index]._id }),
    //     };
    //     //show loader now
    //     setLoader(true);
    
    //     const response = await fetch(
    //       "https://api.rannaghor.xyz/seller/delete-product",
    //       requestOptions
    //     );
    //     const data = await response.json();
    
    //     //remove loader
    //     setLoader(false);
    
    //     console.log(data);
    //     console.log(response.ok);
    //     if (response.ok) {
    //       //all good so look for all product
    //       showSnackBar("Product deleted!");
    //       refreshList();
    //     } else {
    //       //deleting error
    //       showSnackBar("Error deleting");
    //     }
    //   };

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

	return (
		<div Style="margin:auto; text-align:center; width:80%; justifyContent:center; alignItems:center; ">
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
                     edit = {item.edit}
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
