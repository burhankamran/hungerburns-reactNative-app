import { ipAddress } from "../../ipAdress";

export const PLACE_ORDER='PLACE_ORDER';
export const CANCEL_ORDER='CANCEL_ORDER';
export const PLACE_ORDER_ALL='PLACE_ORDER_ALL';

export const placeOrder=(comment)=>{
   
    return (dispatch,getState)=>{
        const token = getState().auth.token;
        const address = getState().auth.userData.address;
        fetch(ipAddress+'/orders', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            authorization: token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
           address:address,
           comment:comment
        })
        }).then(res=>{
           return  res.json();
        })
        .then(res=>{
          console.log(res,'inOrder');
        dispatch({type:PLACE_ORDER,orders:res.orders});
        })
        .catch(err=>console.log(err));
    }
}


export const getOrders=()=>{
   
  return (dispatch,getState)=>{
      const token = getState().auth.token;
      fetch(ipAddress+'/orders', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          authorization: token,
          'Content-Type': 'application/json'
        },
      }).then(res=>{
         return  res.json();
      })
      .then(res=>{
        
      dispatch({type:PLACE_ORDER_ALL,orders:res.orders});
      })
      .catch(err=>console.log(err));
  }
}


export const orderDelete=(id)=>{
  return (dispatch,getState)=>{
    const token = getState().auth.token;
    fetch(ipAddress+'/cancelOrder', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      id:id,
     })
    }).then(res=>{
       return  res.json();
    })
    .then(res=>{
      console.log(res,'inOrder');
      getOrders();
    })
    .catch(err=>console.log(err));
}
}