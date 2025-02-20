import { FEATUREDEVELOPER } from '@/constants/featuredeveloper';
import { Star } from 'lucide-react';
import Image from 'next/image';
import AnimationContainer from './global/animation-container';
import Wrapper from "./global/wrapper";
import Marquee from './ui/marquee';
import SectionBadge from './ui/section-badge';

const FeatureDeveloper = () => {
    return (
        <Wrapper className="py-20 lg:py-32">
            <div className="flex flex-col items-center text-center gap-4 mb-16">
                <AnimationContainer animation="fadeUp" delay={0.2}>
                    <SectionBadge title="Featured Developers" />
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.3}>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400">
                        Featured Developers
                    </h2>
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.4}>
                    <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Showcasing the Minds Behind the Innovation
                    </p>
                </AnimationContainer>
            </div>

            <div className="relative">
                <div className="absolute -left-1 top-0 w-20 h-full bg-gradient-to-r from-[#101010] to-transparent z-10" />
                <div className="absolute -right-1 top-0 w-20 h-full bg-gradient-to-l from-[#101010] to-transparent z-10" />

                <Marquee className="[--gap:1.5rem]" pauseOnHover>
                    {FEATUREDEVELOPER.map((featuredeveloper: { image: string; author: string; role: string; content: string; rating: number }, index: number) => (
                        <AnimationContainer
                            key={index}
                            animation="fadeUp"
                            delay={0.5 + (index * 0.2)}
                        >
                            <div className="flex-shrink-0 w-[400px] rounded-3xl bg-[#191919] backdrop-blur-3xl p-8">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                            <Image
                                                src={featuredeveloper.image}
                                                alt={featuredeveloper.author}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">
                                                {featuredeveloper.author}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                {featuredeveloper.role}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-lg">
                                        {featuredeveloper.content}
                                    </p>

                                    <div className="flex gap-1">
                                        {[...Array(featuredeveloper.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-5 h-5 fill-primary text-primary"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </AnimationContainer>
                    ))}
                </Marquee>
            </div>
        </Wrapper>
    );
};

export default FeatureDeveloper;
