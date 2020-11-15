/* eslint-disable prettier/prettier */
import axios from "@/services/Base.service";

const resource = "data";

export const GetData = async() => await axios.get(resource);
