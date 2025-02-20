import CTA from "@/components/cta";
import FAQ from "@/components/faq";
import FeaturesAgents from "@/components/featuresagents";
import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import KeyBenefits from "@/components/keybenefits";
import Pricing from "@/components/pricing";
import FeatureDeveloper from "@/components/featuredeveloper";

const HomePage = () => {
    return (
        <div className="w-full relative flex flex-col">
            <section className="w-full">
                <Hero />
            </section>

            <section className="w-full">
                <KeyBenefits />
            </section>

            <section className="w-full">
                <HowItWorks />
            </section>

            <section className="w-full">
                <FeaturesAgents />
            </section>

            <section className="w-full">
                <FeatureDeveloper />
            </section>

            <section className="w-full">
                <Pricing />
            </section>

            <section className="w-full">
                <FAQ />
            </section>

            <section className="w-full">
                <CTA />
            </section>
        </div>
    );
};

export default HomePage;
