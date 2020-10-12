export const updateProductInfo=item=>({
    type:'UPDATE_PRODUCT',
    payload:item
})

export const addOrderProduct=item=>({
    type:'ADD_ORDER_PRODUCT',
    payload:item
})

export const toggleUserStatus=sno=>{
    return dispatch=>{
        dispatch({
          type: "TOGGLE_USER_STATUS",
          payload: sno,
        });
    }
}

export const blockUser=sno=>({
    type:"BLOCK_USER",
    payload:sno
})

export const setCurrentUser=user=>({
   type:'SET_CURRENT_USER',
   payload:user
})

