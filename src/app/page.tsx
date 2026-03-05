import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import { getGoogleReviews } from "@/lib/google-reviews";
import Brands from "@/components/Brands";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default async function Home() {
    const googlePlaceData = await getGoogleReviews();
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <Services />
            <About />
            <Testimonials apiData={googlePlaceData} />
            <Brands />
            <Contact />
            <Footer />
            <WhatsAppButton />
        </main>
    );
}
