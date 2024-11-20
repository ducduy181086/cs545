export default function EmptyCart() {
    return (
        <div className="flex justify-center  items-center mt-6 mb-6 w-full max-w pt-20 pb-20">
            <div className="text-center">
                <span className="w-20 material-symbols-outlined text-8xl text-primary"> add_shopping_cart</span>
                <p>Looks like you haven't added anything to your cart yet.</p>
            </div>
        </div>
    );
}