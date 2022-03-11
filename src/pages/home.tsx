import { Container, Heading, Text, Button } from "@chakra-ui/react";
import { Item } from "framer-motion/types/components/Reorder/Item";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardItem from "../components/CardItem"
import initialProducts from "../products.json"

const HomePage = () => {
  const [products, setProducts] = useState([] as any[])
  const [cart, setCart] = useState([] as Item[])
  const onAddToCart = (product: any) => {
    if (product.quantity > 0) {
      setCart([...cart, {...product, quantity: 1}])
      setProducts([...products.map(item => {
        if (item.id === product.id) {
          item.quantity -= 1
        }
        return item
      }), ])
    }
  }
  const onIncrement = (product: any) => {
    const available = products.find(item => item.id === product.id)
    if (available ? available.quantity > 0 : false) {
      setCart([...cart, {...product, quantity: product.quantity + 1}])
      setProducts([...products.filter(item => item.id !== product.id), {...product, quantity: product.quantity - 1}])
    }
  }
  const onDecrement = (product: any) => {
    if (product === 1) {
      setCart([...cart.filter(item => item.id !== product.id)])
      setProducts([...products.filter(item => item.id !== product.id), {...product, quantity: product.quantity + 1}])
    } else {
      setCart([...cart.filter(item => item.id !== product.id), {...product, quantity: product.quantity - 1}])
      setProducts([...products.filter(item => item.id !== product.id), {...product, quantity: product.quantity + 1}])

    }
  }
  const getTotal = () => {
    return cart.reduce((a, c) => a + c.price * c.quantity, 0)
  }
  useEffect(() => {
    const mappedProducts = initialProducts
    setProducts(mappedProducts)
  }, [])

  return (
    <div className="flex flex-row gap-2 w-screen h-screen">
        <div className="flex flex-wrap w-1/2">
        {products.length ? products.map(item => <CardItem prop={{...item, onSubmit: () => onAddToCart(item)}} key={item.id} />) : null}
        </div>
        <div className="cart flex flex-col flex-grow p-5">
          <h1 className="mb-5">Cart</h1>
          <div className="flex h-2/3">
            <div className="cat-item flex flex-col">
              {cart.map(item => (
                <>
                  <h2>{item.name}</h2>
                  <p>Rp. {item.price}</p>
                  <div className="flex justify-end">
                    <div className="p-5 border cursor-pointer" onClick={() => onDecrement(item)}>-</div>
                    <div className="p-5 border">{item.quantity}</div>
                    <div className="p-5 border cursor-pointer" onClick={() => onIncrement(item)}>+</div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="pt-5">
            <p>Total</p>
            <h1>Rp. {getTotal()}</h1>
          </div>
        </div>
      </div>
  );
};

export default HomePage;
