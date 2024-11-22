import { ShippingContext } from "context/ShippingContext";
import React, { useContext } from "react";
import { formatPhoneNumber } from "utils/utils";

export default function ShippingSummary() {
    const { shippingInfo } = useContext(ShippingContext);

    return (
        <div className="mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-8">
            {/* Shipping Section */}
            <h3 className="text-lg font-semibold">Ship to</h3>
            <div className="mt-6 border-t pt-4 pb-4">
                <div className="flex justify-between text-sm">
                    <span>{`${shippingInfo?.firstName ?? ""} ${shippingInfo?.lastName ?? ""}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>{`${shippingInfo?.city ?? ""}, ${shippingInfo?.state ?? ""} ${shippingInfo?.zipCode ?? ""}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>{`${shippingInfo?.country ?? ""}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>{`${formatPhoneNumber(shippingInfo?.phoneNumber ?? "") ?? ""}`}</span>
                </div>
            </div>
            {/* Bill Section */}
            {(shippingInfo.sameBillingAddress ?? false) && <div>
                <h3 className="text-lg font-semibold">Bill to</h3>
                <div className="mt-6 border-t pt-4 pb-4">
                    <div className="flex justify-between text-sm">
                        <span>{`${shippingInfo?.firstName ?? ""} ${shippingInfo?.lastName ?? ""}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>{`${shippingInfo?.city ?? ""}, ${shippingInfo?.state ?? ""} ${shippingInfo?.zipCode ?? ""}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>{`${shippingInfo?.country ?? ""}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>{`${formatPhoneNumber(shippingInfo?.phoneNumber ?? "") ?? ""}`}</span>
                    </div>
                </div>
            </div>}
            {!(shippingInfo.sameBillingAddress ?? false) && <div>
                <h3 className="text-lg font-semibold">Bill to</h3>
                <div className="mt-6 border-t pt-4 pb-4">
                    <div className="flex justify-between text-sm">
                        <span>{`${shippingInfo?.billingInfo?.firstName ?? ""} ${shippingInfo?.billingInfo?.lastName ?? ""}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>{`${shippingInfo?.billingInfo?.city ?? ""}, ${shippingInfo?.billingInfo?.state ?? ""} ${shippingInfo?.billingInfo?.zipCode ?? ""}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>{`${shippingInfo?.billingInfo?.country ?? ""}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>{`${formatPhoneNumber(shippingInfo?.billingInfo?.phoneNumber ?? "") ?? ""}`}</span>
                    </div>
                </div>
            </div>}
        </div>
    );
};