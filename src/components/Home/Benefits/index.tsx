import MaxWidthWrapper from "../../Resuable/MaxWidthWrapper";

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

const features: Benefit[] = [
  {
    title: "Handpicked Quality Selection",
    description: "We carefully curate our inventory to ensure you have access to the best products across various categories.",
    icon: "fa-medal",
  },
  {
    title: "Fast and Reliable Shipping",
    description: "Receive your orders quickly and without hassle, thanks to our efficient shipping partners.",
    icon: "fa-truck-fast",
  },
  {
    title: "Secure Online Payments",
    description: "Your transactions are protected with top-of-the-line security measures, giving you peace of mind.",
    icon: "fa-lock",
  },
  {
    title: "Exceptional Customer Support",
    description: "We're always here to help! Contact our friendly support team for any questions or assistance with your order.",
    icon: "fa-handshake-simple",
  },
];

const Benefits = () => {
  return (
    <section className="mb-32 md:mb-48">
      <img src="/waves-2.svg" alt="waves" className="mb-32 w-full" />
      <MaxWidthWrapper className="px-4 md:px-8">
        <div className="mb-16 text-center lg:mb-20">
          <h2 className="mb-4 md:mb-6">Why Shop With Us?</h2>
          <p className="px-0 md:px-16 lg:px-0">Discover exceptional quality, unbeatable prices, and a shopping experience designed to put you first.</p>
        </div>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {features.map(({ description, title, icon }) => (
            <article key={title} className="relative border p-6 pb-8 pt-12 text-center md:text-left">
              <div className="absolute left-1/2 top-0 mb-6 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white md:left-auto md:translate-x-0 ">
                <i className={`fa-solid ${icon} text-3xl`}></i>
              </div>
              <h3 className="mb-2">{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Benefits;
