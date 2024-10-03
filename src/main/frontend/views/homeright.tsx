import SearchUserView from "Frontend/views/searchuser/searchuser";
import UserSuggestionsCard from "Frontend/views/home/usersuggestion";
import {Card} from "@mui/material";

const popularUser=[1,1,1,1,1]
export default function HomerightView() {
    return (
        <div className="pr-5">
          <SearchUserView/>
            <Card className="p-5">
            <div className="flex justify-between py-5 items-center">
                <p className="font-semibold opacizy-70">Suggestions for you</p>
                <p className="text-xs font-semibold opacity-95">View All</p>
            </div>
            <div className="">
                {popularUser.map((items) => <UserSuggestionsCard/>)}
            </div>
            </Card>
        </div>
    );
}