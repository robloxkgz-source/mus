import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { pricedeta } from "@/app/api/data";
import { fetchCryptoPrices } from "@/app/api/fetchCryptoPrices";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getImagePrefix } from "@/utils/utils";

const CardSlider = () => {
  const [prices, setPrices] = useState<{
    [id: string]: { price: string; mark: string; change: number };
  }>({});

  useEffect(() => {
    fetchCryptoPrices().then((data) => {
      if (data) {
        setPrices(data);
      }
    });
  }, []);

  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    autoplaySpeed: 1500,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    responsive: [
      { breakpoint: 479, settings: { slidesToShow: 1 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
    ],
  };

  return (
    <div className="lg:-mt-16 mt-16">
      <Slider {...settings}>
        {pricedeta.map((item, index) => {
          const data = prices[item.id];
          return (
            <div key={index} className="pr-6">
              <div className="px-5 py-6 bg-dark_grey bg-opacity-80 rounded-xl">
                <div className="flex items-center gap-5">
                  <div className={`${item.background} ${item.padding} rounded-full`}>
                    <Image
                      src={`${getImagePrefix()}${item.icon}`}
                      alt={item.title}
                      width={item.width}
                      height={item.height}
                    />
                  </div>
                  <p className="text-white text-xs font-normal ">
                    <span className="text-16 font-bold mr-2">{item.title}</span>
                    {item.short}
                  </p>
                </div>
                <div className="flex justify-between mt-7">
                  <div>
                    <p className="text-16 font-bold text-white mb-0 leading-none">
                      {data?.price ?? "Загрузка..."}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`text-xs ${
                        data?.change >= 0 ? "text-success" : "text-error"
                      }`}
                    >
                      {data?.mark ?? ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CardSlider;
