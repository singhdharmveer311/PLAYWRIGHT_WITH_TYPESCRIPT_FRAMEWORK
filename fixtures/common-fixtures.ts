import {test as baseTest} from "@playwright/test";
import { CommonUtils } from "../utils/CommonUtils";


type CommonFixtureType = {
    commonUtils: CommonUtils
}

export const test = baseTest.extend<CommonFixtureType>({
    commonUtils : async({}, use)=>{
        use(new CommonUtils);
    }
});