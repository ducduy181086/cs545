export default function OrderStatus(props) {
    return (
        <>
            {props === 'Pending' && <div className="bg-blue-500 text-white py-1 px-2 rounded-md text-sm text-bold">{props}</div>}
            {props === 'Shipped' && <div className="bg-teal-500 text-white py-1 px-2 rounded-md text-sm text-bold">{props}</div>}
            {props === 'Delivered' && <div className="bg-green-500 text-white py-1 px-2 rounded-md text-sm text-bold">{props}</div>}
            {props === 'Cancelled' && <div className="bg-red-500 text-white py-1 px-2 rounded-md text-sm text-bold">{props}</div>}
        </>
    );
};