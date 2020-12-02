import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import CompanyCardBlock from './Sections/CompanyCardBlock';
import { Empty } from 'antd';

function CartPage(props) {
    const dispatch = useDispatch();

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)



    useEffect(() => {

        let cartItems = []
        //리덕스 User state안에 카트 안에 상품이 들어있는지 확인
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then(response => { calculateTotal(response.payload) })
            }
        }

    }, [props.user.userData])


    let calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        })

        setTotal(total)
        setShowTotal(true)
    }

    let removeFromCart = (productId) => {

        dispatch(removeCartItem(productId))
            .then(response => {

                if (response.payload.productInfo.length <= 0) {
                    setShowTotal(false)
                }
            })

    }
    //console.log(props.user.userData&&props.user.userData._id)


    if (props.user.userData && props.user.userData.role === 1) {
        return (
            <div style={{ width: '1100px', margin: '3rem auto' }}>
                <h1> 과제 관리 </h1>
                <div>
                    <CompanyCardBlock companyId={props.user.userData && props.user.userData._id} CartPageHistory={props.history} />
                </div>

            </div>
        )

    } else {
        return (
            <div style={{ width: '1100px', margin: '3rem auto' }}>
                <h1 style={{ marginLeft: '20px' }}> 과제 pick 목록 </h1>

                <div>
                    <UserCardBlock
                        products={props.user.cartDetail}
                        userId={props.user.userData && props.user.userData._id}
                        removeItem={removeFromCart}
                    />
                </div>



            </div>

        )

    }



}

export default CartPage
