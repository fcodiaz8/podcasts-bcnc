import { useContext } from "react";
import LoadingContext from "../contexts/LoadingProvider";

export const useGlobalLoading = () => useContext(LoadingContext);
