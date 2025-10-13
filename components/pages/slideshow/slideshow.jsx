"use client";
import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Autoplay, EffectFade, Navigation } from "swiper/modules";
import Link from 'next/link';
import slideshowData from "@/components/data/slideshow-data";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

const Slideshow = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleThumbClick = useCallback((index) => {
    if (mainSwiper) {
      mainSwiper.slideToLoop(index);
    }
  }, [mainSwiper]);

  return (
    <div className="slideshow__wrap section-padding" style={{ background: "linear-gradient(135deg, #f7f7f7 0%, #f0f0f0 100%)" }}>
      <div className="container">
        <div className="row mb-40">
          <div className="col-xl-12 text-center">
            <span 
              className="subtitle" 
              style={{ 
                color: "#00cc00", 
                fontWeight: 600, 
                letterSpacing: 1.5,
                fontSize: "0.9rem",
                textTransform: "uppercase",
                display: "inline-block",
                marginBottom: 12
              }}
            >
              Project Gallery
            </span>
            <h2 style={{ 
              fontWeight: 700, 
              fontSize: "clamp(2rem, 4vw, 3rem)", 
              marginTop: 8, 
              marginBottom: 0,
              color: "#1a1a1a",
              lineHeight: 1.2
            }}>
              Recent Site & Fabrication Highlights
            </h2>
            <p style={{
              marginTop: 16,
              color: "#666",
              fontSize: "1.1rem",
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6
            }}>
              Explore our latest engineering projects and fabrication achievements
            </p>
          </div>
        </div>
      </div>
      
      <div className="slideshow__slider-area" style={{ position: "relative", maxWidth: 1400, margin: "0 auto", padding: "0 20px" }}>
        {/* Main Swiper */}
        <div style={{ position: "relative" }}>
          <Swiper
            onSwiper={setMainSwiper}
            onSlideChange={handleSlideChange}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={true}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".slideshow-next",
              prevEl: ".slideshow-prev",
            }}
            modules={[Autoplay, Thumbs, EffectFade, Navigation]}
            className="slideshow-main-swiper"
            aria-label="Project highlights slideshow"
          >
            {slideshowData.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div
                  className="slideshow__slide"
                  style={{
                    position: "relative",
                    minHeight: 520,
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                    background: "#222",
                    cursor: "grab",
                  }}
                >
                  <div
                    className="slideshow__image"
                    style={{
                      backgroundImage: `url(${slide.image?.src || slide.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      minHeight: "520px",
                      width: "100%",
                      transition: "transform 0.3s ease",
                    }}
                    role="img"
                    aria-label={slide.title}
                  />
                  
                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
                    }}
                  />
                  
                  {/* Content */}
                  <div
                    className="slideshow__content"
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      padding: "48px 40px 40px",
                      color: "#fff",
                    }}
                  >
                    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
                      <span 
                        className="slideshow__category"
                        style={{ 
                          fontWeight: 600, 
                          fontSize: "1rem", 
                          color: "#00ff00",
                          display: "block",
                          marginBottom: 12,
                          textTransform: "uppercase",
                          letterSpacing: 1.2
                        }}
                      >
                        {slide.category || "Project"}
                      </span>
                      <h3 style={{ 
                        color: "#fff", 
                        marginBottom: 16, 
                        fontWeight: 700, 
                        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                        lineHeight: 1.2,
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                      }}>
                        {slide.title}
                      </h3>
                      {slide.description && (
                        <p style={{ 
                          color: "rgba(255,255,255,0.9)", 
                          fontSize: "1.1rem",
                          lineHeight: 1.6,
                          marginBottom: 24,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden"
                        }}>
                          {slide.description}
                        </p>
                      )}
                      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                        <Link
                          href={slide.projectLink || "/gallery"}
                          className="build_button build_button--primary"
                          style={{
                            background: "#00cc00",
                            color: "#fff",
                            borderRadius: 8,
                            padding: "12px 32px",
                            fontWeight: 600,
                            fontSize: "1rem",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            boxShadow: "0 4px 16px rgba(0,204,0,0.3)",
                            transition: "all 0.3s ease",
                            border: "2px solid #00cc00"
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = "transparent";
                            e.target.style.color = "#00cc00";
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 8px 24px rgba(0,204,0,0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = "#00cc00";
                            e.target.style.color = "#fff";
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "0 4px 16px rgba(0,204,0,0.3)";
                          }}
                        >
                          View Project
                          <i className="flaticon-right-up" style={{ fontSize: "0.9em" }}></i>
                        </Link>
                        
                        {slide.detailsLink && (
                          <Link
                            href={slide.detailsLink}
                            className="build_button build_button--secondary"
                            style={{
                              background: "transparent",
                              color: "#fff",
                              borderRadius: 8,
                              padding: "12px 24px",
                              fontWeight: 600,
                              fontSize: "1rem",
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              border: "2px solid rgba(255,255,255,0.3)",
                              transition: "all 0.3s ease"
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = "rgba(255,255,255,0.1)";
                              e.target.style.borderColor = "rgba(255,255,255,0.5)";
                              e.target.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = "transparent";
                              e.target.style.borderColor = "rgba(255,255,255,0.3)";
                              e.target.style.transform = "translateY(0)";
                            }}
                          >
                            Learn More
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          {/* <button
            className="slideshow-prev"
            aria-label="Previous slide"
            style={{
              position: "absolute",
              left: 20,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.95)",
              border: "none",
              borderRadius: "50%",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              color: "#00cc00",
              fontSize: 20,
              width: 56,
              height: 56,
              cursor: "pointer",
              zIndex: 10,
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#00cc00";
              e.target.style.color = "#fff";
              e.target.style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.95)";
              e.target.style.color = "#00cc00";
              e.target.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            <i className="fal fa-chevron-left"></i>
          </button>
          
          <button
            className="slideshow-next"
            aria-label="Next slide"
            style={{
              position: "absolute",
              right: 20,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.95)",
              border: "none",
              borderRadius: "50%",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              color: "#00cc00",
              fontSize: 20,
              width: 56,
              height: 56,
              cursor: "pointer",
              zIndex: 10,
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#00cc00";
              e.target.style.color = "#fff";
              e.target.style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.95)";
              e.target.style.color = "#00cc00";
              e.target.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            <i className="fal fa-chevron-right"></i>
          </button> */}

          <button
  className="slideshow-prev"
  aria-label="Previous slide"
  style={{
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    background: "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 100%)",
    border: "none",
    color: "#fff",
    fontSize: 14,
    padding: "20px 16px 20px 12px",
    cursor: "pointer",
    zIndex: 10,
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 600,
    letterSpacing: 0.5
  }}
  onMouseEnter={(e) => {
    e.target.style.background = "linear-gradient(90deg, #00cc00 0%, transparent 100%)";
    e.target.style.paddingLeft = "16px";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 100%)";
    e.target.style.paddingLeft = "12px";
  }}
>
  <i className="fal fa-chevron-left" style={{ fontSize: 12 }}></i>
  PREV
</button>

<button
  className="slideshow-next"
  aria-label="Next slide"
  style={{
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    background: "linear-gradient(270deg, rgba(0,0,0,0.4) 0%, transparent 100%)",
    border: "none",
    color: "#fff",
    fontSize: 14,
    padding: "20px 12px 20px 16px",
    cursor: "pointer",
    zIndex: 10,
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 600,
    letterSpacing: 0.5
  }}
  onMouseEnter={(e) => {
    e.target.style.background = "linear-gradient(270deg, #00cc00 0%, transparent 100%)";
    e.target.style.paddingRight = "16px";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "linear-gradient(270deg, rgba(0,0,0,0.4) 0%, transparent 100%)";
    e.target.style.paddingRight = "12px";
  }}
>
  NEXT
  <i className="fal fa-chevron-right" style={{ fontSize: 12 }}></i>
</button>
        </div>

        {/* Thumbnails */}
        <div className="slideshow__thumbs" style={{ marginTop: 40, padding: "0 10px" }}>
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={Math.min(5, slideshowData.length)}
            freeMode={true}
            watchSlidesProgress={true}
            spaceBetween={16}
            modules={[FreeMode, Thumbs]}
            className="slideshow-thumbs-swiper"
            breakpoints={{
              0: { slidesPerView: 3 },
              576: { slidesPerView: 4 },
              768: { slidesPerView: 5 },
              1024: { slidesPerView: Math.min(6, slideshowData.length) },
            }}
            aria-label="Thumbnail navigation"
          >
            {slideshowData.map((slide, index) => (
              <SwiperSlide
                key={`thumb-${slide.id}`}
                style={{ cursor: "pointer" }}
                onClick={() => handleThumbClick(index)}
              >
                <div
                  className={`slideshow__thumb ${activeIndex === index ? 'slideshow__thumb--active' : ''}`}
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: activeIndex === index 
                      ? "0 8px 24px rgba(0,204,0,0.3)" 
                      : "0 4px 16px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    border: activeIndex === index ? "3px solid #00cc00" : "3px solid transparent",
                    transform: activeIndex === index ? "translateY(-4px)" : "translateY(0)",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    if (activeIndex !== index) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeIndex !== index) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)";
                    }
                  }}
                >
                  <img
                    src={slide.image?.src || slide.image}
                    alt={slide.title}
                    style={{
                      height: 80,
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                    loading="lazy"
                  />
                  {/* Active indicator */}
                  {activeIndex === index && (
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "#00cc00",
                        boxShadow: "0 2px 8px rgba(0,204,0,0.4)"
                      }}
                    />
                  )}
                  <div style={{ 
                    padding: "12px 8px 8px",
                    textAlign: "center"
                  }}>
                    <h6 style={{ 
                      fontSize: 13, 
                      margin: 0, 
                      color: activeIndex === index ? "#00cc00" : "#666", 
                      fontWeight: 600,
                      transition: "color 0.3s ease",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>
                      {slide.title}
                    </h6>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Progress Bar */}
        <div style={{ 
          marginTop: 32,
          padding: "0 20px"
        }}>
          <div style={{
            height: 4,
            background: "rgba(0,0,0,0.1)",
            borderRadius: 2,
            overflow: "hidden"
          }}>
            <div style={{
              height: "100%",
              background: "#00cc00",
              borderRadius: 2,
              width: `${((activeIndex + 1) / slideshowData.length) * 100}%`,
              transition: "width 0.8s ease"
            }} />
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 12,
            fontSize: 14,
            color: "#666",
            fontWeight: 500
          }}>
            <span>Slide {activeIndex + 1} of {slideshowData.length}</span>
            <span>{slideshowData[activeIndex]?.category || "Project"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;