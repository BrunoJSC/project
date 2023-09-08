import { onSnapshot, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { db } from "../firebase";
import { Layout } from "../layout/Layout";
import { Footer } from "../sections/Footer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importe os estilos do carrossel

interface CarsProps {
  id: string;
  model: string;
  brand: string;
  price: number;
  km: number;
  doors: number;
  color: string;
  exchange: string;
  direction: string;
  fuel: string;
  location: string;
  yearFactory: number;
  yearModification: number;
  images: string[];
}

export function DetailsCar() {
  const [data, setData] = useState<CarsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  const state = location.state as { data: CarsProps };
  const car = state?.data;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cars"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CarsProps[];
      setData(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Header />
      <Layout className="min-h-screen">
        <div className="w-full h-[900px]">
          {car?.images && (
            <Carousel
              showArrows={true}
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
              infiniteLoop={true}
              autoPlay={true}
              interval={3000}
              transitionTime={1000}
              stopOnHover={true}
              swipeable={true}
              emulateTouch={true}
              dynamicHeight={true}
              width="100%"
            >
              {car.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`car-${index}`}
                    className="w-full h-full object-contain bg-red-500"
                  />
                </div>
              ))}
            </Carousel>
          )}
        </div>

        <h1 className="text-[#1E1E1E] text-xl md:text-2xl font-bold">
          {car?.brand}
        </h1>

        <h1 className="text-[#1E1E1E] text-xl md:text-2xl font-bold">
          {car?.model}
        </h1>
      </Layout>
      <Footer show={true} />
    </div>
  );
}
