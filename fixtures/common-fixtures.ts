import {test as baseTest} from "../fixtures/pom-fixtures";
import { CommonUtils } from "../utils/CommonUtils";

// This fixture is chaining of pom-fixtures, all the features of pom are available here.

type CommonFixtureType = {
    commonUtils: CommonUtils
}

export const test = baseTest.extend<CommonFixtureType>({
    commonUtils : async({}, use)=>{
        await use(new CommonUtils());
    }
});