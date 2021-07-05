import {
    useUpdate,
} from "@vulcanjs/react-hooks";
import { CustomUser } from "../../models/customUser";
const ProfileForm = (props) => {
    const [updateDocument] = useUpdate({ model: CustomUser });
    if (props.user) {
        return (
            <form
                onSubmit={async (evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    const displayName = (evt.target as any).displayName.value;
                    // const url = (evt.target as any).url.value;
                    await updateDocument({
                        input: { id: props.user._id, data: { displayName } },
                    });
                }}
            >
                <input
                    placeholder="name"
                    type="text"
                    name="displayName"
                    defaultValue={props.user.displayName}
                />
                <button type="submit">Update</button>
            </form>
        );
    } else {
        return null
    }
};
export default ProfileForm
