import { Container, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const CardItem = (props: {prop: Item}) => {

  return (
    <div className="flex flex-col w-96 h-96 p-2 border rounded-md">
      <img src={props.prop.imageUrl} alt={props.prop.name} />
      <h3 className="text-gray-700">{props.prop.name}</h3>
      <button className="bg-blue-500 text-white font-bold" onClick={props.prop.onSubmit}>Add to cart</button>
    </div>
  );
};

export default CardItem;
