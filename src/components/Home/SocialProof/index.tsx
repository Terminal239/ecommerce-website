import MaxWidthWrapper from "../../Resuable/MaxWidthWrapper";

interface Review {
  name: string;
  rating: number;
  comment: string;
}

const reviews: Review[] = [
  {
    name: "John D.",
    rating: 5,
    comment: "This backpack is perfect for my daily commute. It's stylish, comfortable, and fits all my essentials.",
  },
  {
    name: "Sarah J.",
    rating: 4,
    comment: "Love the design and durability of this backpack. The laptop sleeve is a lifesaver.",
  },
  {
    name: "Emily C.",
    rating: 5,
    comment: "This bracelet is absolutely stunning! The craftsmanship is exceptional and the design is both elegant and meaningful.",
  },

  {
    name: "Michael W.",
    rating: 5,
    comment: "This jacket has become my go-to for cold weather. It's stylish, warm, and surprisingly versatile.",
  },
  {
    name: "Alex K.",
    rating: 4,
    comment: "This hard drive is lightning fast and has tons of space. Backing up my files is no longer a chore.",
  },
  {
    name: "Olivia R.",
    rating: 5,
    comment: "I wasn't sure about the rose gold finish at first, but these earrings are gorgeous in person! So unique and eye-catching.",
  },
];

const SocialProof = () => {
  return (
    <section>
      <MaxWidthWrapper className="px-4 pb-32 md:px-8 md:pb-48">
        <div className="mb-12 text-center md:mb-16 lg:mb-20">
          <h2 className="mb-4 md:mb-6">What Our Customers Say</h2>
          <p>Hear from real people who love our products and services.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 md:gap-y-12">
          {reviews.map(({ comment, name, rating }) => (
            <article key={name} className="relative border p-6 lg:pb-8">
              <div className="mb-4 flex items-center gap-4 lg:mb-6">
                <div className="flex size-10 items-center justify-center rounded-full border bg-white lg:size-14">
                  <i className={`fa-solid fa-user lg:text-lg`}></i>
                </div>
                <h3>{name}</h3>
                <div className="ml-auto flex w-fit items-center gap-2 rounded bg-gray-300 px-2 py-1 text-[12px] lg:text-[14px]">
                  <i className="fa-solid fa-star"></i>
                  <span className="font-bold">{rating}</span>
                </div>
              </div>
              <p className="text-gray-700 lg:text-lg">"{comment}"</p>
            </article>
          ))}
        </div>
      </MaxWidthWrapper>
      <img src="/waves-3.svg" alt="waves" className="-mb-1 hidden w-full md:inline" />
      <img width={300} height={30} src="/waves-4.svg" alt="waves" className="-mb-1 w-full md:hidden" />
    </section>
  );
};

export default SocialProof;
