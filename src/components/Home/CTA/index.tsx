import { useNavigate } from "react-router-dom";
import Button from "../../Resuable/Button";
import MaxWidthWrapper from "../../Resuable/MaxWidthWrapper";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-[#66d9e8]  to-[#4798a2] py-20 text-[#142b2e] md:bg-gradient-to-r">
      <MaxWidthWrapper className="px-8 text-center">
        <h1 className="mb-4">Elevate Your Style</h1>
        <p className="mx-auto mb-8 md:w-1/2">Discover the latest fashion trends and upgrade your wardrobe with our curated collection.</p>
        <Button onClick={() => navigate("/products")} type="secondary" className="mx-auto border-none bg-[#f0fbfd] px-8 py-3">
          Shop the collection
        </Button>
      </MaxWidthWrapper>
    </section>
  );
};

export default CallToAction;
