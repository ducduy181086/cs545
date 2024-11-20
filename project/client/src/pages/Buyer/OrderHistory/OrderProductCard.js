export default function OrderProductCard(props) {

    return (
        <>
            <div className="border p-4 rounded rounded-md">
            <div className="flex items-center w-full justify-between ">
                <div className="flex items-center">
                    <img src="https://via.placeholder.com/80" alt="Product Image"  className="w-16 h-16 object-cover rounded-lg" />
                    <div className="ml-4">
                        <p className="font-bold">{props.productName}</p>
                        <p className="text-gray-500">Quantity: {props.quantity}</p>
                    </div>
                    
                </div>
                
                <div className="items-center">
                    <p className="text-sm text-gray-500">${props.price}</p>
                    <p className="font-bold text-blue-500">${props.totalPrice}</p>
                </div>
            </div>
            <button className="mt-4 text-sm">Write review</button>
            </div>
        </>
    );
}