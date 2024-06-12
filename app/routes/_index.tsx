import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { differenceInDays } from "date-fns";
import Heading from "../components/Heading";
import { Form, Link } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";

export const meta: MetaFunction = () => {
  return [
    { title: "Shopify Launch App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Main() {
  return (
    <div className="flex flex-wrap">
      <Heading></Heading>
      <Calculator></Calculator>
    </div>
  );
}

function Calculator() {
  const [revenue, setRevenue] = useState(0);
  const [platform, setPlatform] = useState("");
  const [startDate, setStartDate] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [launchSchedule, setLaunchSchedule] = useState(0);
  const [dailyLift, setDailyLift] = useState(0);
  const [timeboxDiff, settimeboxDiff] = useState(0);
  const [total, setTotal] = useState(0);
  const [calculatorStatus, setCalculatorStatus] = useState(true);

  function calculate() {
    //Calculate daily revenue lift being on Shopify
    interface PlatformMultipliers {
      [key: string]: number;
    }

    const platformMultipliers: PlatformMultipliers = {
      Salesforce: 0.36,
      Adobe: 0.05,
      Other: 0.12,
      WooCommerce: 0.17,
      BigCommerce: 0.12,
    };

    //Calculate total planned launch time
    let launchSchedule = differenceInDays(
      new Date(launchDate),
      new Date(startDate)
    );
    setLaunchSchedule(launchSchedule);

    //Calculate Days in/out of timebox
    let timeboxDiff;
    if (revenue >= 35000000) {
      timeboxDiff = 120 - launchSchedule;
    } else {
      timeboxDiff = 90 - launchSchedule;
    }
    settimeboxDiff(timeboxDiff);

    //Calculate total +/- revenue
    const annualShopifyRev = revenue * (1 + platformMultipliers[platform]);
    const dailyLift = (annualShopifyRev - revenue) / 365;
    setDailyLift(dailyLift);

    const total = timeboxDiff * dailyLift;
    setTotal(total);
  }

  function formatCurrency(amount: number): string {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  }

  return (
    <AnimatePresence>
      {calculatorStatus ? (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-[#FFFFF7] border-solid border p-6 sm:p-16 rounded-2xl m-10 flex flex-1 flex-col min-w-fit shadow-lg"
        >
          <section>
            <div className="sm:mb-8">
              <h2 className="richtext text-3xl mb-4 text-[#171E16]">
                Time To Launch Value
              </h2>
              <p className="richtext text-body-lg text-[#171E16]">
                Enter your business details to calculate the value of launching
                sooner.
              </p>
            </div>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setCalculatorStatus(!calculatorStatus);
              }}
            >
              <div className="mb-4 mx-auto">
                <div className="mt-2">
                  <label
                    className="text-xs text-slate-500 ml-2"
                    htmlFor="revenue"
                  >
                    Annual Revenue
                  </label>
                  <input
                    required
                    type="number"
                    name="revenue"
                    id="revenue"
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full px-6 block duration-300 ease-out peer ring-1 ring-inset rounded-[3em] hover:focus-within:ring-state-focus focus-within:ring-state-focus focus-within:outline-0 appearance-none text-black bg-white default:ring-shade-30 hover:ring-shade-50 pb-4 pt-4 mb-5 [&_select]:py-4"
                    placeholder="Online Revenue ($USD)"
                  />
                </div>
                <label
                  className="text-xs text-slate-500 ml-2"
                  htmlFor="platform"
                >
                  Current Platform
                </label>
                <select
                  required
                  id="platform"
                  name="platform"
                  onChange={(e) => setPlatform(e.target.value)}
                  className="px-6 block w-full duration-300 ease-out peer ring-1 ring-inset rounded-[3em] hover:focus-within:ring-state-focus focus-within:ring-state-focus focus-within:outline-0 appearance-none text-black bg-white default:ring-shade-30 hover:ring-shade-50 pb-4 pt-4 mb-5 [&_select]:py-4"
                >
                  <option value="">Current Platform</option>\
                  <option>Salesforce</option>
                  <option>BigCommerce</option>
                  <option>WooCommerce</option>
                  <option>Adobe</option>
                  <option>Other</option>
                </select>
                <div className="flex flex-row flex-wrap md:gap-7 lg:gap-7 pt-2">
                  <div className="flex flex-1 flex-col">
                    <label
                      className="text-xs text-slate-500 ml-2 pb-1"
                      htmlFor="platform"
                    >
                      Launch Start Date
                    </label>
                    <input
                      required
                      type="date"
                      name="date"
                      id="date"
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-6 block w-full duration-300 ease-out peer ring-1 ring-inset rounded-[3em] hover:focus-within:ring-state-focus focus-within:ring-state-focus focus-within:outline-0 appearance-none text-black bg-white default:ring-shade-30 hover:ring-shade-50 pb-4 pt-4 mb-5 [&_select]:py-4"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label
                      className="text-xs text-slate-500 ml-2 pb-1"
                      htmlFor="platform"
                    >
                      Launch End Date
                    </label>
                    <input
                      required
                      type="date"
                      name="date"
                      id="date"
                      onChange={(e) => setLaunchDate(e.target.value)}
                      className="px-6 block w-full duration-300 ease-out peer ring-1 ring-inset rounded-[3em] hover:focus-within:ring-state-focus focus-within:ring-state-focus focus-within:outline-0 appearance-none text-black bg-white default:ring-shade-30 hover:ring-shade-50 pb-4 pt-4 mb-5 [&_select]:py-4"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                onClick={calculate}
                className="rounded-full bg-[#171E16] px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-[#333e32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Calculate
              </button>
            </Form>
          </section>
        </motion.div>
      ) : (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#FFFFF7] border-solid border p-6 sm:p-16 rounded-2xl m-10 flex flex-1 flex-col shadow-lg min-w-fit"
          >
            <div className="sm:mb-8">
              <h2 className="richtext text-3xl mb-4 text-[#171E16]">
                Your Launch Results
              </h2>
              <div className="max-w-[500px]">
                {total > 0 ? (
                  <>
                    <p className="richtext text-[#171E16]">
                      {" "}
                      You&apos;re launching in{" "}
                      <span className="font-bold">{launchSchedule} days</span>.
                      That&apos;s{" "}
                      <span className="font-bold">
                        {Math.abs(timeboxDiff)} days
                      </span>{" "}
                      faster than standard.
                      <span className="italic">
                        (note: a typical merchant migrates from {platform} in{" "}
                        {revenue >= 35000000 ? "120 days" : "90 days"}
                        ).
                      </span>
                      <br></br>
                      <br></br>
                      On Shopify, your store makes an extra{" "}
                      <span className="font-bold">
                        {formatCurrency(dailyLift)}
                      </span>{" "}
                      per day compared to {platform}{" "}
                      <Link
                        prefetch="intent"
                        to={
                          "https://www.shopify.com/enterprise/blog/shopify-checkout"
                        }
                        className="italic underline"
                      >
                        (see why)
                      </Link>
                      . <br></br>
                      <br></br>In total, your store made an additional{" "}
                      <span className="font-bold">
                        {formatCurrency(Math.abs(total))}
                      </span>{" "}
                      by migrating to Shopify sooner.
                    </p>
                  </>
                ) : (
                  <p className="richtext text-[#171E16]">
                    {" "}
                    You are launching in{" "}
                    <span className="font-bold">{launchSchedule} days</span>.
                    That&apos;s{" "}
                    <span className="font-bold">
                      {Math.abs(timeboxDiff)} more days
                    </span>{" "}
                    than standard.{" "}
                    <span className="italic">
                      (note: a typical merchant migrates from {platform} in{" "}
                      {revenue >= 35000000 ? "120 days" : "90 days"}
                      ).
                    </span>
                    <br></br>
                    <br></br>
                    On Shopify, your store would have made an extra{" "}
                    <span className="font-bold">
                      {formatCurrency(dailyLift)}
                    </span>{" "}
                    per day compared to {platform}{" "}
                    <Link
                      prefetch="intent"
                      to={
                        "https://www.shopify.com/enterprise/blog/shopify-checkout"
                      }
                      className="italic underline"
                    >
                      (see why)
                    </Link>
                    .<br></br>
                    <br></br>In total, your store could have made an additional{" "}
                    <span className="font-bold">
                      {formatCurrency(Math.abs(total))}
                    </span>{" "}
                    by launching sooner.
                  </p>
                )}
              </div>

              <button
                type="submit"
                onClick={() => window.location.reload()}
                className="mt-6 rounded-full bg-[#171E16] px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-[#333e32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Restart
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
