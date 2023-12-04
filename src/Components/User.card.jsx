import { useUser } from "../Context/User.context";
import { useRole } from "../Context/Role.context";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

function UserCard({ user, onEdit, onDelete }) {
    const { toggleUserStatus } = useUser();
    const { role } = useRole();

    const roles = role.find(
        (rol) => rol.ID_Role === user.Role_ID
    );

    const barraClass = user.State ? "" : "desactivado";

    return (
        <tr>
            <td className="border border-gray-400 px-4 py-2 text-center width-column">{user.Type_Document}</td>
            <td className="border border-gray-400 px-4 py-2 text-center width-column">{user.Document}</td>
            <td className="border border-gray-400 px-4 py-2 text-center width-column">{user.Name_User}</td>
            <td className="border border-gray-400 px-4 py-2 text-center width-column">{user.LastName_User}</td>
            <td className="border border-gray-400 px-4 py-2 text-center width-column">{user.Email}</td>
            <td className="border border-gray-400 px-4 py-2 text-center width-column">
                {roles && roles.Name_Role}
            </td>
            <td className={`border border-gray-400 px-4 py-2 text-center width-column ${barraClass}`}>
                {user.State ? "Habilitado" : "Deshabilitado"}
            </td>
            <td className="border border-gray-400 px-4 py-2 text-center">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                        onClick={onEdit}
                        className={`text-orange-500 hover:text-orange-700 mr-2 ${!user.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                        disabled={!user.State}
                        style={{ marginLeft: "14%" }}
                    >
                        <AiFillEdit size={24} />
                    </button>
                    <button
                        onClick={onDelete}
                        className={`text-red-500 hover:text-red-800 mr-2 ${!user.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                        style={{ marginRight: "-20px" }}
                        disabled={!user.State}
                    >
                        <AiFillDelete size={24} />
                    </button>
                    <button
                        className={`barra-container ${barraClass} adjust`}
                        onClick={() => toggleUserStatus(user.ID_User)}
                    >
                        {user.State ? (
                            <MdToggleOn className={`estado-icon active ${barraClass}`} />
                        ) : (
                            <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
                        )}
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default UserCard;