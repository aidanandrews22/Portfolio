import React from 'react';

const BookItem = ({ title, author, link, image, description }) => (
  <div className="mb-8">
    <div className="flex items-start mb-4">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={image} alt={title} className="w-32 h-auto mr-4" />
      </a>
      <div>
        <h3 className="text-xl font-semibold">
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{title}</a>
        </h3>
        <p className="text-lg">By {author}</p>
      </div>
    </div>
    {description && <p className="text-gray-700">{description}</p>}
  </div>
);

const BookList = ({ title, books }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    {books.map((book, index) => (
      <BookItem key={index} {...book} />
    ))}
  </section>
);

const Bookshelf = () => {
  const topBooks = [
    {
      title: "Outliers: The Story Success",
      author: "Malcolm Gladwell",
      link: "https://www.amazon.com/Outliers-Story-Success-Malcolm-Gladwell/dp/0316017930",
      image: "/assets/book1.jpg",
      description: "Exploring what it means to be successful in a world that rewards hard work and luck. Gladwell discusses the factors that contribute to a high-level of success. Gladwell proposes that personal achievements are not solely caused by an individual traits such as hard-work and intelligence. Rather, success is often molded by external factors such as family, culture, and idiosyncratic opportunities that individuals encounter by chance. One thing that stuck with me from this book was the 10,000 hour rule, Gladwell claims that to achieve word-class expertise in any field an individual must spend around 10,000 hours on their skills. However, he also mentions that external factors such as timing, culture, upbringing, and even birthdates significantly affect an individuals success potential."
    },
    {
      title: "Mathematics for Machine Learning",
      author: "Marc Peter Deisenroth",
      link: "https://www.amazon.com/Mathematics-Machine-Learning-Peter-Deisenroth/dp/1108470041",
      image: "/assets/book2.jpg",
      description: "This textbook teaches complex mathematics with a hyperfocus on machine-learning. Usually the math taught in this book is dispersed between an array of classes, but this book teaches them in a succinct and concise manner so the reader is only introduced to topics specifically needed to understand machine-learning. Deisenroth introduces you to the fundamental mathematical tools needed to understand machine-learning; this includes linear algebra, analytic geometry, matrix decomposition, vector calc, optimization, probability and statistics. Overall, it is a pretty complex and heavy book but is great for anyone with a mathematical background and an interest in its application in machine-learning. This book is also published by The Cambridge University Press, take that as you will."
    },
    {
      title: "The Power of Habit",
      author: "Charles Duhigg",
      link: "https://www.amazon.com/Power-Habit-What-Life-Business/dp/081298160X",
      image: "/assets/book3.jpg",
      description: "This book is one of those that you read and end up citing it hundreds of times a week in conversation. A lot of the practices of my life have been directly altered because I read this book. I would say other factors contributed to me altering the patterns of my life however, this book provided me with anecdotes and case studies that support my actions. Duhigg provides evidence and stories that support his theory that habitual tendencies significantly impact your life and inadvertently your success. After reading this book I realized habits are much more nuanced than I thought, like eating. Definitely recommend this book to anyone trying to shake a bad habit, build new habits, or learn about what habits are and how deeply they influence your decisions."
    }
  ];

  const honorableMentions = [
    { title: "Bobby Fischer Teaches Chess", author: "Bobby Fischer", link: "https://www.amazon.com/Bobby-Fischer-Teaches-Chess/dp/0553263153/ref=zg_bs_g_4406_d_sccl_2/139-9165052-2731300?psc=1" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", link: "https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555" },
    { title: "How to Win Friends & Influence People", author: "Dale Carnegie", link: "https://www.amazon.com/How-Win-Friends-Influence-People/dp/0671027034" }
  ];

  const allBooks = [
    { title: "Designing Machine Learning Systems: An Iterative Process for Production-Ready Applications", author: "Chip Huyen", link: "https://www.amazon.com/dp/1098107969?psc=1&ref=ppx_yo2ov_dt_b_product_details" },
    { title: "Deep Learning (Adaptive Computation and Machine Learning series)", author: "Ian Goodfellow", link: "https://www.amazon.com/gp/product/0262035618/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1" },
    // ... Add all other books here
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <BookList title="Top 3 Books" books={topBooks} />
      <BookList title="Honorable Mentions" books={honorableMentions} />
      <BookList title="All Books (by subject)" books={allBooks} />
    </div>
  );
};

export default Bookshelf;