import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section>
      <h1>404: Page Not Found</h1>
      <h2> ¯\_(ツ)_/¯</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        Go back to the <Link to="/">home page</Link>.
      </p>
    </section>
  );
};

export default ErrorPage;
