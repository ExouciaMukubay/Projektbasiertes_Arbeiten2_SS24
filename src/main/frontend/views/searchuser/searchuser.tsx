import React, {useRef, useState} from "react";
import {UserService} from "Frontend/generated/endpoints";
import SearchUserCards from "Frontend/views/searchuser/searchusercards";
import {Card} from "@mui/material";
import UserDto from "Frontend/generated/com/example/application/data/model/dto/UserDto";

/**
 * Displays view to search user
 * @constructor
 */
export default function SearchUserView() {

    const [username, setUsername] = useState("");
    const [searchedUsers, setSearchedUsers] = useState<UserDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const onHandleSearchUser = async (username: string) => {
        // needed to cancel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        setIsLoading(true);
        try {
            const res = await UserService.searchUser(username);
            setSearchedUsers(res);
            console.log(res);
        } catch (e: any) {
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        } finally {
            setIsLoading(false);

        }
    };

    return (
        <Card style={{marginBottom: "1rem"}}>
            <div className="px-40 mt-5">
                <input style={{height: "15px", marginTop: "0.5rem"}}
                       className="outline-none w-full rounded-full px-5 bg-transparent border-[#3b4054] border py-3"
                       type="text"
                       onChange={(e) => {
                           setUsername(e.target.value);
                           onHandleSearchUser(e.target.value);

                       }}
                       placeholder="Search user..."

                />

                {username && isLoading &&
                    <h1 style={{fontSize: "16px", marginTop: "1.75rem"}}> Search user is loading...</h1>}

                {username && !isLoading &&
                    searchedUsers.map((userToSearch) =>
                        <SearchUserCards key={userToSearch.id} userToSearch={userToSearch}/>
                    )}
            </div>
        </Card>

    )
};