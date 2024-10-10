import SearchUserView from "Frontend/views/searchuser/searchuser";
import UserSuggestionsCard from "Frontend/views/usersuggestions/usersuggestion";
import {Card} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import UserDto from "Frontend/generated/com/example/application/data/model/dto/UserDto";
import {UserService} from "Frontend/generated/endpoints";
import {useAuth} from "Frontend/util/auth";

export default function HomerightView() {
    const {state} = useAuth();
    const [unfriendedUsers, setUnfriendedUsers] = useState<UserDto[]>([]); // Zustand zum Speichern der Posts
    const [isLoading, setIsLoading] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        //update user all the time
        fetchUnfriendedUsers();
    }, [])

    const fetchUnfriendedUsers = async () => {
        // needed to cancel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        setIsLoading(true);
        try{
            const res = await UserService.findAllUnfriendedUsers(state.user?.id as string);
            console.log(res.length);
            setUnfriendedUsers(res);

        }catch (e: any){
            if(e.name === "AbortError"){
                console.log("Aborted");
                return;
            }
        }finally{
            setIsLoading(false);
        }
    };

    return (
        <div className="pr-5">
          <SearchUserView/>
            <Card className="p-5">
            <div className="flex justify-between py-5 items-center">
                <p className="font-semibold opacizy-70">Suggestions for you</p>
                {/* <p className="text-xs font-semibold opacity-95">View All</p> */}
            </div>
            <div className="userSuggestionCards">
                {isLoading && <h1 style={{fontSize: "16px", marginTop: "1.75rem"}}> Suggested users are loading...</h1>}
                {!isLoading && unfriendedUsers.map((item) => <UserSuggestionsCard key={item.id} userSuggestion={item} fetchUnfriendedUsers={fetchUnfriendedUsers}/>)}
            </div>
            </Card>
        </div>
    );
}