import {ipAddress} from '../../ipAdress';

export const GET_CART='GET_CART';

export const ADD_CART='ADD_CART';

export const REMOVE_CART='REMOVE_CART';

export const REMOVE_CART_ALL='REMOVE_CART_ALL';

export const addToCart=(prodId,qty,variation)=>{
    return (dispatch,getState)=>{
        const token = getState().auth.token;
        console.log('inininininin');
        fetch(ipAddress+'/cart', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              authorization: token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId:prodId,
              qty:qty,
              variation:variation,
            })
          }).then(res=>{
             return  res.json();
          })
          .then(res=>{
            console.log(res,'inCart');
            dispatch({type:REMOVE_CART,cartData:res.products,
              totalPrice:res.totalPrice});
          })
          .catch(err=>console.log(err));
      
    }
}

export const getCart=()=>{
  return (dispatch,getState)=>{
      const token = getState().auth.token;
    
      fetch(ipAddress+'/cart', {
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
          console.log(res.totalPrice,'inCartGet');
         dispatch({type:GET_CART,cartData:res.products,total:res.totalPrice});
        })
        .catch(err=>console.log(err));
    
  }
}

export const removeToCart=(cartItemId)=>{
  return (dispatch,getState)=>{
      const token = getState().auth.token;
      console.log('inininininin');
      fetch(ipAddress+'/cartDelete', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            authorization: token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              cartItemId:cartItemId,
          })
        }).then(res=>{
           return  res.json();
        })
        .then(res=>{
          console.log(res,'inCart');
          dispatch({type:REMOVE_CART,cartData:res.resD,
          totalPrice:res.totalPrice});
        })
        .catch(err=>console.log(err));
    
  }
}

export const incToCart=(cartItemId)=>{
  return (dispatch,getState)=>{
      const token = getState().auth.token;
      fetch(ipAddress+'/cartIncrease', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            authorization: token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              cartItemId:cartItemId,
          })
        }).then(res=>{
           return  res.json();
        })
        .then(res=>{
          console.log(res,'inCart');
          dispatch({type:REMOVE_CART,cartData:res.resD,
          totalPrice:res.totalPrice});
        })
        .catch(err=>console.log(err));
    
  }
}

export const cartAllDelete=()=>{
       
       return {type:REMOVE_CART_ALL};
}