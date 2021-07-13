import React, { useState } from 'react';
import { useCreate, useDelete } from "@vulcanjs/react-hooks";
import { useUser } from "~/components/user/hooks";
import { CustomUser } from "~/models/customUser";
import ProfileForm from "../components/user/profileForm"

export default function CustomPage() {
    const user = useUser({ redirectTo: "/login" });
    const [createCustomUser] = useCreate({ model: CustomUser });
    const [deleteCustomUser] = useDelete({ model: CustomUser });

    const handleClick = async () => {
        console.log("Creation");
        try {
            const input = {
                data: {
                    // username: 'myUserName',
                    // isAdmin: false,
                    email: 'myEmail2@mail.com'
                }
            };
            await createCustomUser({ input });
        } catch (err) {
            console.log("\n\n\n\n\n\n\n\n\n\nERREUR LORS DE lA CREATION : ", err);
        }
    }

    const handleClickDelete = async () => {
        console.log("Suppression");
        try {
            const input = {
                id: '60ec594be4948215a6be0376'
            };
            await deleteCustomUser({ input });
        } catch (err) {
            console.log("\n\n\n\n\n\n\n\n\n\nERREUR LORS DE lA SUPPRESSION : ", err);
        }
    }

    return (
        <div>
            <h1> Form </h1>
            <ProfileForm user={user} />
            <button onClick={handleClick}>Créer le profil</button>
            <button onClick={handleClickDelete}>Supprimer le profil</button>
            <h2> Insert code here : {CustomUser.graphql.defaultFragment} </h2>
            <h2>Profile</h2>
            {user && <p>Your session: {JSON.stringify(user)}</p>}
        </div>
    )
}