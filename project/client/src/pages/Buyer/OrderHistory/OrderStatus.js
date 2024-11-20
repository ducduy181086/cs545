export default function OrderStatus(props) {
    return (
        <>
            {props === 'Pending' && <div className="text-md text-bold text-blue-500">{props}</div>}
            {props === 'Shipped' && <div className="text-md text-bold text-teal-500">{props}</div>}
            {props === 'Delivered' && <div className="text-md text-bold text-green-500">{props}</div>}
            {props === 'Cancelled' && <div className="text-md text-bold text-red-500">{props}</div>}
        </>
    );
};