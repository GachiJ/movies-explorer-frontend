import '../Preloader/Preloader.css';

export default function Preloader({ isLoader }) {
  return (
    (isLoader && <div class="preloader">
      <div class="preloader__container">
        <div class="preloader__round">
          <div class="preloader__border"></div>
        </div>
      </div>
    </div>)
  );
};