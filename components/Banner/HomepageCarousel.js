import Image from 'next/image';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import clsx from 'clsx';

function Arrow({ onClick, className, style, children }) {
  return (
    <button type="button" onClick={onClick} className={className} style={style}>
      {children}
    </button>
  );
}
function CarouselItem({ children }) {
  return <div>{children}</div>;
}
export default function HomepageCarousel(props = {}) {
  return (
    <Slider
      {...{
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        draggable: true,
        prevArrow: (
          <Arrow>
            <FaChevronLeft size={14} />
          </Arrow>
        ),
        nextArrow: (
          <Arrow>
            <FaChevronRight size={14} />
          </Arrow>
        )
      }}
    >
      <CarouselItem>
        <Image
          width={1700}
          height={360}
          priority={true}
          src="/assets/banner/74d32a7f-6a2d-49a3-b325-114de4b055c5.jpg"
        />
      </CarouselItem>
      <CarouselItem>
        <Image
          width={1700}
          height={360}
          priority={true}
          src="/assets/banner/d8a90cd0-bfa4-47e2-b288-3afd54e0cbea.jpg"
        />
      </CarouselItem>
    </Slider>
  );
}
