import { useNavigate } from "react-router-dom";
import Button from "../../Resuable/Button";
import MaxWidthWrapper from "../../Resuable/MaxWidthWrapper";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section>
      <MaxWidthWrapper className="mb-8 flex flex-col items-center px-8 md:mb-12 lg:mb-0 lg:flex-row lg:gap-12">
        <div className="mb-12 mt-16 w-full flex-1 text-center md:mt-24 md:w-3/5 lg:my-0 lg:text-left">
          <h1 className="mb-4 lg:mb-6">Upgrade with Premium Products and Effortless Shopping</h1>
          <p className="mb-8 md:mb-12 lg:mb-16 lg:text-2xl">Discover a curated selection of tech, fashion, jewelry, and more delivered right to your doorstep.</p>
          <Button onClick={() => navigate("/products")} className="mx-auto lg:mx-0 lg:px-8 lg:py-4 lg:text-lg" type="primary">
            Explore our collection
          </Button>
        </div>
        <div className="flex-1">
          <picture>
            <source media="(min-width:1024px)" srcSet="/hero-image.png" />
            <img width={300} height={550} src="/hero-image-mobile.png" alt="Flowers" className="mx-auto w-full sm:w-4/5 lg:w-full" />
          </picture>
        </div>
      </MaxWidthWrapper>
      <img width={300} height={30} src="/waves.svg" alt="waves" className="-mb-1 w-full" />
    </section>
  );
};

export default Hero;
