import {
    useUpdate,
} from "@vulcanjs/react-hooks";
import { CustomUser } from "../../models/customUser";

const ProfileForm = (props) => {
    const [updateCustomUser] = useUpdate({ model: CustomUser });
    return (
        <form
            onSubmit={async (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                const newName = (evt.target as any).newName.value;
                const input = {
                    // id: "60e305d3ae8e4f564073a455",
                    filter: {
                        email: {_eq: 'myEmail@mail.com'}
                        // _id: {_eq: "60e305d3ae8e4f564073a455"}
                    },
                    data: {
                        username: newName,
                    },
                };
                await updateCustomUser({ input });
            }}
        >
            <input
                placeholder="name"
                type="text"
                name="newName"
            />
            <button type="submit">Update</button>
        </form>
    );
};
export default ProfileForm
