import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppState } from "flux/store";

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default useAppSelector;

export function useAppState() {
  return useAppSelector((state) => state);
}
