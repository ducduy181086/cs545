export default function OrderStatus(props) {
    return (
        <>
            {props === 'PENDING' && <div className="bg-blue-500 text-white py-1 px-2 rounded-md text-sm text-bold">{props}</div>}
            {props === 'SHIPPED' && <div className="bg-teal-500 text-white py-1 px-2 rounded-md text-sm text-bold">{props}</div>}
            {props === 'DELIVERED' && <div className="bg-green-500 text-white py-1 px-2 rounded-md text-sm text-bold">{props}</div>}
            {props === 'CANCELLED' && <div className="bg-red-500 text-white py-1 px-2 rounded-md text-sm text-bold">{props}</div>}
        </>
    );
};