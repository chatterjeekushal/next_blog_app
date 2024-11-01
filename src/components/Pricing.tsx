
import React from 'react';

const PricingPlans = () => {
  const plans = [
    {
      name: "Intro",
      price: "$9/month",
      description: "Perfect for individuals just getting started.",
      features: [
        "10 GB Storage",
        "Email Support",
        "Single Integration",
        "Basic Reporting",
       
      ],
    },
    {
      name: "Base",
      price: "$29/month",
      description: "Ideal for small teams looking to grow.",
      features: [
        "50 GB Storage",
        "Priority Email Support",
        "Up to 5 Integrations",
        "Advanced Reporting",
        
      ],
    },
    {
      name: "Popular",
      price: "$49/month",
      description: "Best for established businesses with larger needs.",
      features: [
        "200 GB Storage",
        "24/7 Support",
        "Unlimited Integrations",
        "Detailed Analytics",
        
      ],
    },
    {
      name: "Premium",
      price: "$99/month",
      description: "For enterprises that require top-tier features.",
      features: [
        "500 GB Storage",
        "Dedicated Account Manager",
        "Unlimited Integrations",
        "Custom Analytics",
       
      ],
    },
  ];

  return (
    <div className=" lg:ml-10 lg:h-auto mx-auto px-4 py-8  dark:border-gray-700">
    <h2 className="text-3xl font-bold text-center mb-4">Get an attractive price here</h2>
    <p className="text-center text-lg mb-8">
      Choose the plan that fits your needs best and unlock amazing features.
    </p>
  
    <div className="grid lg:h-auto  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-6">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`bg-white border border-gray-200 dark:bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col ${plan.name === 'Popular' ? 'border-purple-500' : ''}`}
        >
          <h3 className="text-xl md:text-2xl font-semibold text-center mb-2 text-gray-900 dark:text-gray-200">{plan.name}</h3>
          <p className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900 dark:text-gray-200">{plan.price}</p>
          <p className="text-center mb-4 text-gray-700 dark:text-gray-400">{plan.description}</p>
          <ul className="flex-grow">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                <svg
                  className="w-5 h-5 text-gray-950 dark:text-gray-200 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm5-16l-6 6-3-3-1.414 1.414L11 14l7-7-1.414-1.414z" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <button className="mt-4 py-2 px-4 bg-gray-950 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300">
            Choose Plan
          </button>
        </div>
      ))}
    </div>
</div>
  
  
  
  
  );
};

export default PricingPlans;




