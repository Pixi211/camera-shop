import MemoizedFooter from '../../components/footer/footer';
import './loading-page.css';

function LoadingPage(): JSX.Element {
  return (
    <div className="wrapper">
      <main>
        <div className="page__not-found-page-container container">
          <section>
            <h1 className="visually-hidden">Empty page</h1>
            <p className="loading-msg">Loading...</p>
          </section>
        </div>
      </main>
      <MemoizedFooter />
    </div>
  );
}

export default LoadingPage;
