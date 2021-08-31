import React from 'react';
import {getCertifList} from '../utils/getCertifList'

function UserList({userListStored, setCertifListStored, session}){

    const handleClick = async (item) => {
        const list = await getCertifList(item.url, session)
        console.log('userList-list : ', list)
        setCertifListStored(list)
    }
    console.log("holders",userListStored)

    return(
        <div className="table-container holder-container">
            <span className="holder-count">
            Holders: {!userListStored ? "0"
                : userListStored.length}
            </span>
            <div className="table holder-list">
                { !userListStored ? <span>No holders found</span>
                    : userListStored.map( (item, index) => 
                        <div onClick={() => handleClick(item)} className="holder"> 
                            {(item.url.split("/")[4]).slice(0, -4)}
                            <img src="https://img.icons8.com/ios-glyphs/30/000000/arrow.png"/>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default UserList;