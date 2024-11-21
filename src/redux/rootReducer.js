import { GuardianSlice } from "../modules/guardian/redux/slice";
import { HomeSlice } from "../modules/home/redux/slice";
import { NewYorkTimesSlice } from "../modules/newYorkTimes/redux/slice";

let rootReducer = {
  home: HomeSlice.reducer,
  newYorkTimes: NewYorkTimesSlice.reducer,
  guardian: GuardianSlice.reducer,
};
export default rootReducer;
