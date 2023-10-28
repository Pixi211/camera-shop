import { Link } from 'react-router-dom';
import MemoizedHeader from '../../components/header/header';
import MemoizedFooter from '../../components/footer/footer';

function NotFoundPage(): JSX.Element {
  return (
    <div className="wrapper" data-testid="not-found-test">
      <MemoizedHeader />
      <main>
        <div className="page__not-found-page-container container">
          <section>
            <h1 className="visually-hidden">Empty page</h1>
            <Link to="/">
              <div className="favorites__status-wrapper">
                <h2 className="title title--h2">404 NOT FOUND</h2>
                <h3 className="title title--h3"> <u>Return to Catalog</u></h3>
              </div>
            </Link>
          </section>
        </div>
      </main>
      <MemoizedFooter />
    </div>
  );
}

export default NotFoundPage;

