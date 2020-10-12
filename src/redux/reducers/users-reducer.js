
const INITIAL_STATE = {
  users: [
    {
      sno: "F8BGD6H",
      username: "Thanos",
      email: "abc@example.com",
      phoneno: "987654321",
      createdOn: new Date().toISOString(),
      active: true,
      blocked: true,
    },
    {
      sno: "KHUFV86B",
      username: "Groot",
      email: "CID@sony.tv",
      phoneno: "987654391",
      createdOn: new Date().toISOString(),
      active: false,
      blocked: false,
    },
    {
      sno: "HIUFV86B",
      username: "Dhoni",
      email: "IDE@io.tv",
      phoneno: "9980854391",
      createdOn: new Date().toISOString(),
      active: false,
      blocked: false,
    },
    {
      sno: "U7H5H4D5",
      username: "Rohit",
      email: "opD@nj.com",
      phoneno: "9562566756",
      createdOn: new Date().toISOString(),
      active: false,
      blocked: false,
    },
    {
      sno: "MNOHH9H",
      username: "Bhumrah",
      email: "op0@sd.nm",
      phoneno: "9764788867",
      createdOn: new Date().toISOString(),
      active: false,
      blocked: false,
    },
  ],
};

const toggleUserStatus=(users,sno)=>{
    var sno1 = users.findIndex(user => user['sno']===sno)
    var users1=users
    users1[sno1]['active']=!users[sno1]['active']
    return users1
}


const UsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case 'TOGGLE_USER_STATUS':
          return {
              ...state,
            users: toggleUserStatus(state.users, action.payload),
          };

    default:
      return state;
  }
};

export default UsersReducer;
