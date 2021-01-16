/* eslint-disable prettier/prettier */
import axios from "@/services/Base.service";

const resource = "fondeos";

// this.stripe.redirectToCheckout({ sessionId }

export const Add = async (data: any):Promise<any> => {
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	return await axios.post(`${resource}`,data, header);
}