/* eslint-disable prettier/prettier */
import axios from "@/services/Base.service";

const resource = "ventas";

export const BuyProduct = async (product: any):Promise<any> => {
		const jwt = localStorage.getItem("jwt")
		const header = {headers:{ Authorization: "Bearer " + jwt }};
		return await axios.post(`${resource}`,product, header);
}