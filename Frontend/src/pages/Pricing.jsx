import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";

const Pricing = () => {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 1000,
      description: "Perfect for beginners starting interview preparation",
      features: [
        "1000 AI Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 5000,
      description: "Great for focused practice and skill improvement",
      features: [
        "5000 AI Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹499",
      credits: 15000,
      description: "Best value for serious job preparation.",
      features: [
        "15000 AI Credits",
        "Advanced AI Feedback",
        "Resume Analysis",
        "Priority Support",
        "Future Premium Features",
      ],
      badge: "Best Value",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id);

      const amount =
  plan.id === "basic"
    ? 100
    : plan.id === "pro"
    ? 499
    : 0;

      const result = await axios.post(
        ServerUrl + "/api/payment/order",
        {
          planId: plan.id,
          amount,
          credits: plan.credits,
        },
        {
          withCredentials: true,
        }
      );

      console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);


      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "HireGenieAI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

         method: {
    card: true,
    upi: true,
    netbanking: true,
  },
      handler: async function (response) {
  try {
    console.log("Payment Success", response);

    const verifyPayment = await axios.post(
      ServerUrl + "/api/payment/verify",
      {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      },
      {
        withCredentials: true,
      }
    );

    console.log("Verification Response:", verifyPayment.data);

    alert("Payment Successful 🎉 Credits Added");

  } catch (error) {
    console.log("Verification Error:", error);
    alert("Payment verification failed");
  }
},
        theme: {
          color: "#10b981",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.log(response.error);
        alert("Payment Failed");
      });

      rzp.open();

      setLoadingPlan(null);
    } catch (error) {
      console.log(error);
      setLoadingPlan(null);
    }
  };
    return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-emerald-100 py-16 px-6">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-14 flex items-start gap-4">
        <button
          onClick={() => navigate("/")}
          className="mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>

        <div className="text-center w-full">
          <h1 className="text-4xl font-bold text-gray-800">
            Choose Your Plan
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Flexible pricing to match your interview preparation goals
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <div
              key={plan.id}
              onClick={() => {
                if (!plan.default) {
                  setSelectedPlan(plan.id);
                }
              }}
              className={`relative bg-white rounded-3xl shadow-lg p-8 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                isSelected
                  ? "border-2 border-emerald-600 scale-105"
                  : plan.badge
                  ? "border-2 border-emerald-500"
                  : "border border-gray-200"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-sm font-semibold px-4 py-1 rounded-full shadow">
                  {plan.badge}
                </span>
              )}

              {/* Current Plan */}
              {plan.default && (
                <span className="absolute top-5 right-5 bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Current
                </span>
              )}

              <h2 className="text-2xl font-bold text-gray-800">
                {plan.name}
              </h2>

              <p className="text-4xl font-bold text-emerald-600 mt-4">
                {plan.price}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {plan.description}
              </p>

              <div className="mt-5 bg-emerald-50 rounded-xl py-3 text-center">
                <p className="text-lg font-bold text-emerald-700">
                  {plan.credits.toLocaleString()} Credits
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="text-emerald-600 text-lg">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                disabled={plan.default || loadingPlan === plan.id}
                onClick={(e) => {
                  e.stopPropagation();

                  if (!isSelected) {
                    setSelectedPlan(plan.id);
                  } else {
                    handlePayment(plan);
                  }
                }}
                className={`w-full mt-8 py-3 rounded-xl font-semibold transition ${
                  plan.default
                    ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                    : isSelected
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "border border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                {plan.default
                  ? "Current Plan"
                  : loadingPlan === plan.id
                  ? "Processing..."
                  : isSelected
                  ? "Proceed to Pay"
                  : "Select Plan"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;