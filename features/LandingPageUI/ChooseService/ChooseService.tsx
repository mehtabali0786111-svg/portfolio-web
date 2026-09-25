"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useMemo, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";

type BookingStep = 1 | 2 | 3;

type ServiceOption = {
  id: string;
  title: string;
  duration: string;
  description: string;
  price: string;
};

type BookingDate = {
  day: number;
  monthIndex: number;
  year: number;
};

type DisplayedMonth = {
  monthIndex: number;
  year: number;
};

const services: ServiceOption[] = [
  {
    id: "product-design",
    title: "Product Design & Engineering",
    duration: "20 min",
    description: "End-to-end ownership from design to code",
    price: "$240",
  },
  {
    id: "framer-site",
    title: "Framer Site or Landing Page",
    duration: "30 min",
    description: "Designed and built in Framer, live ready to launch",
    price: "$120",
  },
  {
    id: "design-system",
    title: "Design System Setup",
    duration: "15 min",
    description: "I create design system that can scale",
    price: "$160",
  },
];

const septemberAvailableDates = [24, 25, 26, 28, 29, 30];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const shortMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const morningTimes = [
  "9:00 AM",
  "9:35 AM",
  "10:10 AM",
  "10:45 AM",
  "11:20 AM",
  "11:55 AM",
];
const afternoonTimes = [
  "12:30 PM",
  "1:05 PM",
  "1:40 PM",
  "2:15 PM",
  "2:50 PM",
  "3:25 PM",
  "4:00 PM",
  "4:35 PM",
  "5:10 PM",
];

const getDaysInMonth = (year: number, monthIndex: number) =>
  new Date(year, monthIndex + 1, 0).getDate();

const getAvailableDates = (year: number, monthIndex: number) => {
  if (year === 2026 && monthIndex === 8) {
    return septemberAvailableDates;
  }

  const daysInMonth = getDaysInMonth(year, monthIndex);

  return [4, 7, 11, 15, 18, 22, 25, 28].filter((day) => day <= daysInMonth);
};

const isSameDate = (
  date: BookingDate,
  year: number,
  monthIndex: number,
  day: number,
) => date.year === year && date.monthIndex === monthIndex && date.day === day;

const formatSelectedDate = (date: BookingDate) => {
  const weekday =
    weekdayNames[new Date(date.year, date.monthIndex, date.day).getDay()];

  return `${weekday}, ${shortMonthNames[date.monthIndex]} ${date.day}`;
};

function StepDots({ step }: { step: BookingStep }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Step ${step} of 3`}>
      {[1, 2, 3].map((dot) => (
        <span
          key={dot}
          className={`h-2 rounded-full transition-all ${
            dot === step ? "w-6 bg-[#ff6a19]" : "w-2 bg-white/40"
          }`}
        />
      ))}
    </div>
  );
}

function PhoneHeader({ title, step }: { title: string; step: BookingStep }) {
  return (
    <div className="relative overflow-hidden rounded-t-[26px] bg-[linear-gradient(115deg,#ff5c00_0%,#d83e00_54%,#aa3700_100%)] px-6 pb-10 pt-5 text-white sm:px-7">
      <div className="flex items-start justify-between gap-5">
        <div>
          <h3 className="font-satoshi text-[24px] font-bold leading-tight sm:text-[25px]">
            {title}
          </h3>
          <p className="mt-2 font-satoshi text-[13px] font-bold">
            Step {step} of 3
          </p>
        </div>
        <StepDots step={step} />
      </div>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-5 inline-flex items-center gap-1.5 font-satoshi text-[13px] text-secondary transition-colors hover:text-dark-text"
    >
      <FiArrowLeft className="size-3.5" />
      Back
    </button>
  );
}

function CalendarGrid({
  selectedDate,
  displayedMonth,
  onSelectDate,
  onChangeMonth,
}: {
  selectedDate: BookingDate;
  displayedMonth: DisplayedMonth;
  onSelectDate: (date: BookingDate) => void;
  onChangeMonth: (direction: -1 | 1) => void;
}) {
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(
      displayedMonth.year,
      displayedMonth.monthIndex,
    );

    return Array.from({ length: daysInMonth }, (_, index) => index + 1);
  }, [displayedMonth.monthIndex, displayedMonth.year]);
  const leadingBlankDays = useMemo(
    () => new Date(displayedMonth.year, displayedMonth.monthIndex, 1).getDay(),
    [displayedMonth.monthIndex, displayedMonth.year],
  );
  const availableDates = useMemo(
    () => getAvailableDates(displayedMonth.year, displayedMonth.monthIndex),
    [displayedMonth.monthIndex, displayedMonth.year],
  );

  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onChangeMonth(-1)}
          className="grid size-9 place-items-center rounded-xl border border-light-border bg-white text-secondary transition-colors hover:text-primary"
          aria-label="Previous month"
        >
          <FiChevronLeft />
        </button>
        <h4 className="font-satoshi text-[16px] font-bold text-dark-text">
          {monthNames[displayedMonth.monthIndex]} {displayedMonth.year}
        </h4>
        <button
          type="button"
          onClick={() => onChangeMonth(1)}
          className="grid size-9 place-items-center rounded-xl border border-light-border bg-white text-dark-text transition-colors hover:text-primary"
          aria-label="Next month"
        >
          <FiChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-3 text-center font-satoshi text-[11px]">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <span key={day} className="text-secondary">
            {day}
          </span>
        ))}
        {Array.from({ length: leadingBlankDays }, (_, index) => (
          <span key={`blank-${index}`} aria-hidden="true" />
        ))}
        {calendarDays.map((day) => {
          const isAvailable = availableDates.includes(day);
          const isSelected = isSameDate(
            selectedDate,
            displayedMonth.year,
            displayedMonth.monthIndex,
            day,
          );

          return (
            <button
              type="button"
              key={day}
              onClick={() =>
                isAvailable &&
                onSelectDate({
                  day,
                  monthIndex: displayedMonth.monthIndex,
                  year: displayedMonth.year,
                })
              }
              disabled={!isAvailable}
              className={`relative mx-auto grid size-9 place-items-center rounded-xl transition-colors ${
                isSelected
                  ? "bg-primary font-bold text-white"
                  : day === 23
                    ? "bg-light-box text-[#b6b3ad]"
                    : isAvailable
                      ? "text-dark-text hover:bg-light-box"
                      : "text-[#c9c6c0]"
              }`}
            >
              {day}
              {isAvailable ? (
                <span
                  className={`absolute bottom-1 h-1 w-1 rounded-full ${
                    isSelected ? "bg-white" : "bg-primary"
                  }`}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ChooseService() {
  const [step, setStep] = useState<BookingStep>(1);
  const [selectedServiceId, setSelectedServiceId] = useState(services[0].id);
  const [displayedMonth, setDisplayedMonth] = useState<DisplayedMonth>({
    monthIndex: 8,
    year: 2026,
  });
  const [selectedDate, setSelectedDate] = useState<BookingDate>({
    day: 29,
    monthIndex: 8,
    year: 2026,
  });
  const [selectedTime, setSelectedTime] = useState("10:10 AM");
  const [imageMotion, setImageMotion] = useState({ x: 0, y: 0, scale: 1 });

  const selectedService =
    services.find((service) => service.id === selectedServiceId) ?? services[0];
  const headerTitle =
    step === 1 ? "Select Service" : step === 2 ? "Choose Time" : "Your Details";

  const goBack = () =>
    setStep((current) =>
      current > 1 ? ((current - 1) as BookingStep) : current,
    );
  const goNext = () =>
    setStep((current) =>
      current < 3 ? ((current + 1) as BookingStep) : current,
    );
  const changeDisplayedMonth = (direction: -1 | 1) => {
    setDisplayedMonth((current) => {
      const nextMonthIndex = current.monthIndex + direction;

      if (nextMonthIndex < 0) {
        return { monthIndex: 11, year: current.year - 1 };
      }

      if (nextMonthIndex > 11) {
        return { monthIndex: 0, year: current.year + 1 };
      }

      return { ...current, monthIndex: nextMonthIndex };
    });
  };
  const moveImageAwayFromPointer = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left - bounds.width / 2;
    const pointerY = event.clientY - bounds.top - bounds.height / 2;
    const maxShift = 120;

    setImageMotion({
      x: -(pointerX / bounds.width) * maxShift,
      y: -(pointerY / bounds.height) * maxShift,
      scale: 1.1,
    });
  };

  return (
    <section
      id="pricing"
      className="scroll-mt-8 border-x border-b border-light-border px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(280px,432px)_minmax(340px,432px)] lg:justify-between">
        <aside className="font-satoshi">
          <div
            className="relative aspect-[432/507] overflow-hidden rounded-[24px]"
            onMouseMove={moveImageAwayFromPointer}
            onMouseLeave={() =>
              setImageMotion({
                x: 0,
                y: 0,
                scale: 1,
              })
            }
          >
            {/* =========================================
                BACKGROUND IMAGE
            ========================================= */}
            <Image
              src="/images/bg-img.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 432px"
              className="object-cover object-center"
            />

            {/* =========================================
                PERSON IMAGE
            ========================================= */}
            <div className="absolute inset-0 z-[1] overflow-hidden">
              <Image
                src="/images/personal.png"
                alt="Zolt Mercer"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 432px"
                className="object-contain object-bottom brightness-80 contrast-130 saturate-200 will-change-transform"
                style={{
                  transform: `
            translate3d(
              ${imageMotion.x}px,
              ${imageMotion.y}px,
              0
            )
            scale(${imageMotion.scale})
          `,
                  transformOrigin: "center bottom",
                  transition: "transform 0.25s ease-out",
                }}
              />
            </div>

            {/* =========================================
                AVAILABLE BADGE
            ========================================= */}
            <span className="absolute bottom-0 left-1/2 z-[2] inline-flex -translate-x-1/2 items-center gap-1.5 rounded-t-md bg-white px-3 py-1.5 text-[12px] font-bold uppercase text-green-700 shadow-sm">
              <span className="size-1.5 rounded-full bg-green-600" />
              Available
            </span>
          </div>

          {/* =========================================
              PROFILE INFORMATION
          ========================================= */}
          <div className="mt-3 text-center">
            <p className="font-satoshi text-[16px] font-medium text-light-theme-text">
              Zolt Mercer
              <span className="mx-2 inline-block size-1.5 rounded-full bg-secondary align-middle" />
              <span className="font-normal text-secondary">
                Design engineer
              </span>
            </p>

            <div className="mt-3 flex items-center justify-center gap-3 text-secondary">
              <FaGithub className="size-4" aria-label="GitHub" />
              <FaLinkedinIn className="size-4" aria-label="LinkedIn" />
              <FaInstagram className="size-4" aria-label="Instagram" />
            </div>
          </div>
        </aside>

        <div className="overflow-hidden rounded-[26px] bg-white shadow-[0_28px_80px_rgba(10,10,10,0.06)]">
          <PhoneHeader title={headerTitle} step={step} />

          <div className="-mt-8 min-h-[488px] rounded-t-[30px] bg-white px-6 pb-7 pt-7 font-satoshi sm:px-7 relative">
            {step === 1 ? (
              <div className="flex min-h-[414px] flex-col justify-between">
                <div className="space-y-3">
                  {services.map((service) => {
                    const selected = service.id === selectedServiceId;

                    return (
                      <button
                        type="button"
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`flex w-full items-start justify-between  rounded-[22px] border px-5 py-5 text-left transition-colors ${
                          selected
                            ? "border-primary "
                            : "border-light-border  hover:border-primary/60"
                        }`}
                      >
                        <span className="flex min-w-0 gap-3">
                          <span
                            className={`mt-1.5 size-2.5 shrink-0 rounded-full ${
                              selected ? "bg-primary" : "bg-secondary"
                            }`}
                          />
                          <span>
                            <span className="block font-satoshi text-[15px] font-bold leading-tight text-dark-text">
                              {service.title}
                            </span>
                            <span className="mt-2 block text-[13px] text-secondary">
                              {service.duration}
                            </span>
                            <span className="mt-2 block text-[13px] leading-relaxed text-secondary">
                              {service.description}
                            </span>
                          </span>
                        </span>
                        <span
                          className={`shrink-0 font-satoshi text-[14px] font-bold ${
                            selected ? "text-primary" : "text-dark-text"
                          }`}
                        >
                          {service.price}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  className="mx-auto mt-7 grid size-14 place-items-center rounded-full bg-primary text-white transition-transform hover:scale-105"
                  aria-label="Choose time"
                >
                  <FiChevronRight className="size-7" />
                </button>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="flex min-h-[414px] flex-col">
                <BackButton onClick={goBack} />
                <div className="max-h-[326px] overflow-y-auto pr-2 [scrollbar-color:#9a9a9a_transparent] [scrollbar-width:thin]">
                  <CalendarGrid
                    selectedDate={selectedDate}
                    displayedMonth={displayedMonth}
                    onSelectDate={setSelectedDate}
                    onChangeMonth={changeDisplayedMonth}
                  />

                  <div className="mt-6">
                    <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.08em] text-secondary">
                      Morning
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {morningTimes.map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${
                            selectedTime === time
                              ? "border-primary bg-primary text-white"
                              : "border-light-border text-secondary hover:border-primary hover:text-primary"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.08em] text-secondary">
                      Afternoon & Evening
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {afternoonTimes.map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${
                            selectedTime === time
                              ? "border-primary bg-primary text-white"
                              : "border-light-border text-secondary hover:border-primary hover:text-primary"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  className="mx-auto mt-6 grid size-14 place-items-center rounded-full bg-primary text-white shadow-[0_14px_26px_rgba(255,92,0,0.22)] transition-transform hover:scale-105"
                  aria-label="Enter details"
                >
                  <FiChevronRight className="size-7" />
                </button>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="flex min-h-[414px] flex-col">
                <BackButton onClick={goBack} />
                <div className="max-h-[326px] overflow-y-auto pr-2 [scrollbar-color:#9a9a9a_transparent] [scrollbar-width:thin]">
                  <div className="mb-5 rounded-xl bg-light-box p-5">
                    <div className="mb-4 flex gap-3">
                      <span className="mt-1.5 size-2.5 rounded-full bg-primary" />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.08em] text-secondary">
                          Service
                        </p>
                        <p className="font-bold leading-snug text-dark-text">
                          {selectedService.title} &bull;{" "}
                          {selectedService.duration}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 flex gap-3">
                      <span className="mt-1.5 size-2.5 rounded-full bg-sky-500" />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.08em] text-secondary">
                          Date & Time
                        </p>
                        <p className="text-[14px] text-dark-text">
                          {formatSelectedDate(selectedDate)} &bull;{" "}
                          {selectedTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="mt-1.5 size-2.5 rounded-full bg-primary" />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.08em] text-secondary">
                          Price
                        </p>
                        <p className="font-bold text-primary">
                          {selectedService.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  <label className="mb-4 block">
                    <span className="mb-2 block text-[14px] font-medium text-light-theme-text">
                      Full Name *
                    </span>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="h-14 w-full rounded-2xl border border-light-border bg-white px-4 text-[15px] outline-none transition-colors placeholder:text-secondary focus:border-primary"
                    />
                  </label>

                  <label className="mb-4 block">
                    <span className="mb-2 block text-[14px] font-medium text-light-theme-text">
                      Email Address *
                    </span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="h-14 w-full rounded-2xl border border-light-border bg-white px-4 text-[15px] outline-none transition-colors placeholder:text-secondary focus:border-primary"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  className="mt-6 h-14 rounded-[22px] bg-primary px-6 font-satoshi text-[15px] font-bold text-white shadow-[0_16px_28px_rgba(255,92,0,0.24)] transition-transform hover:scale-[1.01]"
                >
                  Book Appointment
                </button>
                <p className="mt-3 text-center text-[11px] text-secondary">
                  Your information is secure and private.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
