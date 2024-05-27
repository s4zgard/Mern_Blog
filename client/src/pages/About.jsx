export default function About() {
  document.title = "About";
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="max-w-2xl mx-auto p-6 text-center text-gray-800 dark:text-gray-200">
        <div>
          <h1 className="text-3xl font-semibold text-center mb-5 text-teal-600 dark:text-teal-400">
            About Reactive Blog
          </h1>
          <p className="text-lg mb-8">
            Welcome to Reactive Blog, a platform built to explore the
            intersection of technology and creativity.
          </p>
          <p className="text-lg mb-8">
            My name is{" "}
            <a
              href="https://github.com/s4zgard"
              target="_blank"
              rel="noopener noreferrer "
              className="text-teal-500 dark:text-teal-400 font-semibold hover:underline"
            >
              Sajjad Ahmed
            </a>
            , and I'm passionate about leveraging the power of the MERN stack to
            create meaningful and innovative web applications. Reactive Blog is
            a testament to my dedication to continuous learning and my ability
            to turn ideas into reality.
          </p>
          <p className="text-lg mb-8">
            With expertise in MongoDB, Express.js, React.js, and Node.js, I have
            crafted this blog to showcase my skills and provide a glimpse into
            what I can bring to your team.
          </p>
          <p className="text-lg mb-8">
            Whether you're looking for a MERN stack developer to join your team
            or seeking inspiration for your next project, Reactive Blog is the
            perfect place to start.
          </p>
          <p className="text-lg mb-8">
            Feel free to explore the code on GitHub and reach out if you'd like
            to collaborate or discuss potential opportunities.
          </p>
          <a
            href="https://github.com/s4zgard/Mern_blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-teal-600 dark:text-teal-400 font-semibold hover:underline"
          >
            Explore the code on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
