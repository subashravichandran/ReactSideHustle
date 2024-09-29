interface UserListType {
  name: string
  dob: string
}

interface UserListProp {
  users: UserListType[]
}

export default function UserList( {users}: UserListProp) {
  return (
    <div>
      {users.map((user, index) => (
        <li key={index}>{user.name}</li>
      ))}
    </div>
  ); 
}