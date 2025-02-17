export type PlanFeature = {
    text: string;
    included: boolean;
};

export type Plan = {
    name: string;
    description: string;
    price: {
        monthly: number;
        yearly: number;
    };
    features: PlanFeature[];
    popular?: boolean;
};

export const PRICING_PLANS: Plan[] = [
    {
        name: "Basic",
        description: "Perfect for independent agents and small-scale developers to showcase and sell AI agents.",
        price: {
            monthly: 29,
            yearly: 290,
        },
        features: [
            { text: "List up to 5 AI Agents", included: true },
            { text: "Basic Analytics for Sales", included: true },
            { text: "Buyer Feedback Collection", included: true },
            { text: "Email Support", included: true },
            { text: "Advanced Agent Customization", included: false },
            { text: "Priority Listing Visibility", included: false },
        ],
    },
    {
        name: "Professional",
        description: "For active developers and businesses looking to scale their agent offerings and reach a broader audience.",
        price: {
            monthly: 79,
            yearly: 790,
        },
        popular: true,
        features: [
            { text: "List Unlimited AI Agents", included: true },
            { text: "Advanced Analytics & Reports", included: true },
            { text: "Advanced Agent Customization", included: true },
            { text: "Buyer Interaction Features", included: true },
            { text: "Priority Listing Visibility", included: true },
            { text: "Promotions & Discounts for Buyers", included: true },
        ],
    },
    {
        name: "Enterprise",
        description: "Tailored for large-scale businesses and agencies needing advanced features, dedicated support, and custom branding.",
        price: {
            monthly: 199,
            yearly: 1990,
        },
        features: [
            { text: "Unlimited AI Agent Listings", included: true },
            { text: "Custom Analytics & Reporting", included: true },
            { text: "Team Management and Collaboration", included: true },
            { text: "24/7 Dedicated Support", included: true },
            { text: "API Access for Integrations", included: true },
            { text: "Custom Branding and White Labeling", included: true },
            { text: "Exclusive Agent Promotion Tools", included: true },
        ],
    },
];
